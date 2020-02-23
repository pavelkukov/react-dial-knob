import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import Knob, { useKnobAreaClass } from './Knob'
import KnobArea from './KnobArea'

interface Global {
    document: Document
    window: Window
    requestAnimationFrame: (callback: () => void) => number
}

declare const global: Global

describe('Knob component', () => {
    afterEach(cleanup)

    // [React.RefObject<HTMLDivElement>, (KnobArea|null), (Error|null)]
    it('useKnobAreaClass should return instance of KnobArea in case no error is thrown', () => {
        const { result } = renderHook(() =>
            useKnobAreaClass({
                diameter: 100,
                min: 0,
                max: 100,
                step: 1,
                value: 10,
            }),
        )
        expect(result.current.length).toEqual(3)
        expect(result.current[1]).toBeInstanceOf(KnobArea)
        expect(result.current[2]).toBe(null)
    })

    // [React.RefObject<HTMLDivElement>, (KnobArea|null), (Error|null)]
    it('useKnobAreaClass should return null for KnobArea in case of error', () => {
        const { result } = renderHook(() =>
            useKnobAreaClass({
                diameter: 100,
                min: 200,
                max: 100,
                step: 1,
                value: 10,
            }),
        )
        expect(result.current.length).toEqual(3)
        expect(result.current[1]).toBe(null)
        expect(result.current[2]).toBeInstanceOf(Error)
    })

    it('Should render with child content and pass style props + aria attributes', () => {
        const contentText = 'Knob Visual Content'
        render(
            <Knob
                diameter={180}
                value={10}
                min={0}
                max={100}
                step={1}
                ariaLabelledBy={'SomeID'}
                ariaValueText={'Text Value'}
                knobStyle={{ cursor: 'pointer' }}
            >
                <div>{contentText}</div>
            </Knob>,
        )
        expect(screen.queryByText(contentText)).toBeInTheDocument()
        expect(
            screen.queryByText(contentText).parentElement.style.cursor,
        ).toEqual('pointer')

        const attr = (name: string): string =>
            screen.queryByText(contentText).parentElement.getAttribute(name)
        expect(attr('aria-valuenow')).toEqual('10')
        expect(attr('aria-valuemin')).toEqual('0')
        expect(attr('aria-valuemax')).toEqual('100')
        expect(attr('aria-valuetext')).toEqual('Text Value')
        expect(attr('aria-labelledby')).toEqual('SomeID')
    })

    it('Should trigger angleChangeHandler and valueChangeHandler methods on render', () => {
        const angleChangeHandler = jest.fn()
        const valueChangeHandler = jest.fn()
        const contentText = 'Knob Visual Content'
        render(
            <Knob
                diameter={180}
                value={10}
                min={0}
                max={100}
                step={1}
                onAngleChange={angleChangeHandler}
                onValueChange={valueChangeHandler}
            >
                <div>{contentText}</div>
            </Knob>,
        )
        expect(angleChangeHandler).toHaveBeenCalledTimes(1)
        expect(valueChangeHandler).toHaveBeenCalledTimes(1)
    })

    it('Should trigger callbacks on focus -> keyDown -> blur event', () => {
        const angleChangeHandler = jest.fn()
        const valueChangeHandler = jest.fn()
        const contentText = 'Knob Visual Content'
        render(
            <Knob
                diameter={180}
                value={10}
                min={0}
                max={100}
                step={1}
                onAngleChange={angleChangeHandler}
                onValueChange={valueChangeHandler}
            >
                <div>{contentText}</div>
            </Knob>,
        )
        expect(angleChangeHandler).toHaveBeenCalledTimes(1)
        expect(valueChangeHandler).toHaveBeenCalledTimes(1)

        fireEvent.focus(screen.queryByText(contentText).parentNode)

        fireEvent.keyDown(screen.queryByText(contentText).parentNode, {
            keyCode: 38,
        })
        expect(angleChangeHandler).toHaveBeenCalledTimes(2)
        expect(valueChangeHandler).toHaveBeenCalledTimes(2)

        fireEvent.blur(screen.queryByText(contentText).parentNode)
    })

    it('Should trigger callbacks on mouseDown -> mouseMove -> mouseUp events', () => {
        const angleChangeHandler = jest.fn()
        const interactionChangeHandler = jest.fn()
        const valueChangeHandler = jest.fn()
        const contentText = 'Knob Visual Content'
        render(
            <Knob
                diameter={180}
                value={10}
                min={0}
                max={100}
                step={1}
                onAngleChange={angleChangeHandler}
                onInteractionChange={interactionChangeHandler}
                onValueChange={valueChangeHandler}
            >
                <div>{contentText}</div>
            </Knob>,
        )
        fireEvent.mouseDown(screen.queryByText(contentText).parentNode, {
            pageX: 0,
            pageY: 0,
        })
        expect(interactionChangeHandler).toHaveBeenCalledWith(true)
        expect(interactionChangeHandler).toHaveBeenCalledTimes(1)
        expect(angleChangeHandler).toHaveBeenCalledTimes(1)
        expect(valueChangeHandler).toHaveBeenCalledTimes(1)

        let callbackFunc = null
        global.requestAnimationFrame = (callback): number => {
            callbackFunc = callback
            return 0
        }
        fireEvent.mouseMove(window, { pageX: 10, pageY: 10 })
        expect(callbackFunc).not.toEqual(null)
        expect(angleChangeHandler).toHaveBeenCalledTimes(1)
        expect(valueChangeHandler).toHaveBeenCalledTimes(1)

        // Handlers are invoked on requestAnimationFrame
        callbackFunc()
        expect(angleChangeHandler).toHaveBeenCalledTimes(2)
        expect(valueChangeHandler).toHaveBeenCalledTimes(2)

        fireEvent.mouseUp(screen.queryByText(contentText).parentNode)
        expect(interactionChangeHandler).toHaveBeenCalledWith(false)
        expect(interactionChangeHandler).toHaveBeenCalledTimes(2)
    })

    it('Knob must be wrapped in KnobErrorWrap in case of error', () => {
        // Suppress error log
        const origError = console.error
        console.error = (): number => 0
        const contentText = 'Knob Visual Content'
        render(
            <Knob diameter={180} value={10} min={200} max={100} step={1}>
                <div>{contentText}</div>
            </Knob>,
        )
        const knobContent = screen.queryByText(contentText)
        const errorContent = screen.queryByText('💣')
        expect(knobContent).toBeInTheDocument()
        expect(errorContent).toBeInTheDocument()
        expect(errorContent.parentElement).toEqual(
            knobContent.parentElement.parentElement,
        )
        console.error = origError
    })

    it('Knob on props update', () => {
        const contentText = 'Knob Visual Content'
        const { rerender } = render(
            <Knob diameter={180} value={10} min={0} max={100} step={1}>
                <div>{contentText}</div>
            </Knob>,
        )
        const textElement = screen.queryByText(contentText)
        const attr = (name: string): string =>
            textElement.parentElement.getAttribute(name)
        expect(attr('aria-valuenow')).toEqual('10')
        rerender(
            <Knob diameter={180} value={20} min={0} max={100} step={1}>
                <div>{contentText}</div>
            </Knob>,
        )
        expect(attr('aria-valuenow')).toEqual('20')
    })
})
