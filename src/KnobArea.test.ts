import React from 'react'
import { mock, when, instance } from 'ts-mockito'
import KnobArea from './KnobArea'

interface Global {
    document: Document
    window: Window
    requestAnimationFrame: (callback: () => void) => number
}

declare const global: Global

// Mock getComputedStyle used in KnobArea.getComputedTransformXY
global.window.getComputedStyle = (): CSSStyleDeclaration => {
    const DivElement = mock<HTMLDivElement>()
    return instance(DivElement).style
}

describe('class KnobArea', () => {
    const BodyClass = mock<HTMLBodyElement>()
    when(BodyClass.tagName).thenReturn('BODY')
    when(BodyClass.offsetParent).thenReturn(null)
    when(BodyClass.scrollLeft).thenReturn(0)
    when(BodyClass.scrollTop).thenReturn(0)
    when(BodyClass.offsetLeft).thenReturn(0)
    when(BodyClass.offsetTop).thenReturn(0)
    when(BodyClass.clientLeft).thenReturn(0)
    when(BodyClass.clientTop).thenReturn(0)
    const DivClass = mock<HTMLDivElement>()
    when(DivClass.tagName).thenReturn('DIV')
    when(DivClass.offsetParent).thenReturn(instance(BodyClass))
    when(DivClass.scrollLeft).thenReturn(0)
    when(DivClass.scrollTop).thenReturn(0)
    when(DivClass.offsetLeft).thenReturn(180)
    when(DivClass.offsetTop).thenReturn(100)
    when(DivClass.clientLeft).thenReturn(0)
    when(DivClass.clientTop).thenReturn(0)
    const RefClass = mock<React.RefObject<HTMLDivElement>>()
    when(RefClass.current).thenReturn(instance(DivClass))

    const ref = instance(RefClass)

    it('constructor should throw if min, max or value are not divisible by step', () => {
        expect(
            () =>
                new KnobArea(ref, {
                    diameter: 180,
                    min: 7,
                    max: 100,
                    step: 5,
                    value: 10,
                }),
        ).toThrow()
    })

    it('constructor should throw if max is smaller than min', () => {
        expect(
            () =>
                new KnobArea(ref, {
                    diameter: 180,
                    min: 200,
                    max: 100,
                    step: 1,
                    value: 10,
                }),
        ).toThrow()
    })

    it('constructor should throw if max is smaller than min + step', () => {
        expect(
            () =>
                new KnobArea(ref, {
                    diameter: 180,
                    min: 90,
                    max: 100,
                    step: 20,
                    value: 10,
                }),
        ).toThrow()
    })

    it('constructor should call `updateFromProps`', () => {
        const props = {
            diameter: 180,
            min: 10,
            max: 100,
            step: 1,
            value: 50,
        }
        jest.spyOn(KnobArea.prototype, 'updateFromProps')
        const area = new KnobArea(ref, props)
        expect(area.updateFromProps).toHaveBeenCalledWith(props)
    })

    it('value should equal to min if is higher from it', () => {
        const area = new KnobArea(ref, {
            diameter: 180,
            min: 10,
            max: 100,
            step: 1,
            value: 9,
        })
        expect(area.value).toEqual(10)
    })

    it('value should equal to max if is lower from it', () => {
        const area = new KnobArea(ref, {
            diameter: 180,
            min: 10,
            max: 100,
            step: 1,
            value: 101,
        })
        expect(area.value).toEqual(100)
    })

    it('value should be set if is in the min / max range', () => {
        const area = new KnobArea(ref, {
            diameter: 180,
            min: 10,
            max: 100,
            step: 1,
            value: 50,
        })
        expect(area.value).toEqual(50)
    })

    it('angle should be calculated within constructor', () => {
        const area = new KnobArea(ref, {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        })
        expect(area.angle).toEqual(179)
    })

    it('onAngleChange callback should be invoked on construct/change', () => {
        const onAngleChange = jest.fn()
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            onAngleChange,
        }
        // Update from constructor
        const area = new KnobArea(ref, props)
        expect(area.onAngleChange).toHaveBeenCalledTimes(1)
        expect(area.onAngleChange).toHaveBeenCalledWith(179)
        // Update with new value
        area.angle = 10
        expect(area.onAngleChange).toHaveBeenCalledTimes(2)
        expect(area.onAngleChange).toHaveBeenCalledWith(10)
        // Will not trigger onAngleChange because the value is 10
        // the same as before
        area.angle = 10
        expect(area.onAngleChange).toHaveBeenCalledTimes(2)
    })

    it('onValueChange callback should be invoked on construct/change', () => {
        const onValueChange = jest.fn()
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            onValueChange,
        }
        // Update from constructor
        const area = new KnobArea(ref, props)
        expect(area.onValueChange).toHaveBeenCalledTimes(1)
        expect(area.onValueChange).toHaveBeenCalledWith(50)
        // Update with new value
        area.value = 10
        expect(area.onValueChange).toHaveBeenCalledTimes(2)
        expect(area.onValueChange).toHaveBeenCalledWith(10)
        // Will not trigger onValueChange because the value is 10
        // the same as before
        area.value = 10
        expect(area.onValueChange).toHaveBeenCalledTimes(2)
    })

    it('onInteractionChange callback should be invoked when isInteracting changes', () => {
        const onInteractionChange = jest.fn()
        const area = new KnobArea(ref, {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            onInteractionChange,
        })

        expect(onInteractionChange).not.toHaveBeenCalled()
        area.isInteracting = true
        expect(onInteractionChange).toHaveBeenCalledTimes(1)
        area.isInteracting = true
        expect(onInteractionChange).toHaveBeenCalledTimes(1)
        area.isInteracting = false
        expect(onInteractionChange).toHaveBeenCalledTimes(2)
    })

    it('numSteps equals to (max - min) / step', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        expect(area.numSteps).toEqual((props.max - props.min) / props.step)
    })

    it('valsDistribution equals to 360 / (numSteps + 1)', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        expect(area.valsDistribution).toEqual(360 / (area.numSteps + 1))
    })

    it('valsDistribution equals to 360 / numSteps if spaceMaxFromZero = false', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            spaceMaxFromZero: false,
        }
        const area = new KnobArea(ref, props)

        expect(area.valsDistribution).toEqual(360 / area.numSteps)
    })

    it('calcDegreeOfRotation() will return angle based on event coord', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)
        area.updateAreaLocation({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 })
        const angle = area.calcDegreeOfRotation(240, 360)
        expect(Math.ceil(angle)).toEqual(191)
    })

    it('valueFromAngle() will return value per given angle', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 0,
        }
        const area = new KnobArea(ref, props)
        expect(area.valueFromAngle(36)).toEqual(10)
        expect(area.valueFromAngle(72)).toEqual(20)
        expect(area.valueFromAngle(180)).toEqual(50)
    })

    it('valueFromAngle() to return min if val > max + step / 2', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 0,
        }
        const area = new KnobArea(ref, props)
        expect(area.valueFromAngle(359)).toEqual(0)
    })

    it('angleFromValue() to return rotation angle for given value', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 0,
        }
        // Angle for 1 is 360 / (((max - min) / step) + 1) = Math.ceil(3.564..)
        const area = new KnobArea(ref, props)
        expect(area.angleFromValue(0)).toEqual(0)
        expect(area.angleFromValue(1)).toEqual(4)
        expect(area.angleFromValue(50)).toEqual(179) // Math.ceil(3.564 * 50)
        expect(area.angleFromValue(100)).toEqual(357)
    })

    it('updateAngleValue() should update value and angle on requestAnimationFrame', () => {
        global.requestAnimationFrame = jest.fn((callback) => {
            callback()
            return 1
        })
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const initValue = area.value
        const initAngle = area.angle
        const calcDegreeOfRotationSpy = jest.spyOn(area, 'calcDegreeOfRotation')
        const valueFromAngleSpy = jest.spyOn(area, 'valueFromAngle')
        const angleFromValueSpy = jest.spyOn(area, 'angleFromValue')

        area.updateAngleValue(240, 360)
        expect(global.requestAnimationFrame).toHaveBeenCalled()
        expect(calcDegreeOfRotationSpy).toHaveBeenCalledWith(240, 360)
        expect(valueFromAngleSpy).toHaveBeenCalled()
        expect(angleFromValueSpy).toHaveBeenCalled()
        expect(area.value).not.toEqual(initValue)
        expect(area.angle).not.toEqual(initAngle)
    })

    it('handleOnMouseMove() should trigger updateAngleValue if isInteracting', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const updateAngleValueSpy = jest.spyOn(area, 'updateAngleValue')
        const MouseEventClass = mock<MouseEvent>()
        when(MouseEventClass.pageX).thenReturn(240)
        when(MouseEventClass.pageY).thenReturn(360)
        const mouseEvent = instance(MouseEventClass)

        area.isInteracting = true
        area.handleOnMouseMove(mouseEvent)
        expect(updateAngleValueSpy).toHaveBeenCalledTimes(1)
        expect(updateAngleValueSpy).toHaveBeenCalledWith(240, 360)
        area.isInteracting = false
        area.handleOnMouseMove(mouseEvent)
        expect(updateAngleValueSpy).toHaveBeenCalledTimes(1)
    })

    it('handleOnMouseUp() should set isInteracting to false', () => {
        const onInteractionChange = jest.fn()
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            onInteractionChange,
        }
        const area = new KnobArea(ref, props)

        area.isInteracting = true // first call of onInteractionChange
        area.handleOnMouseUp()
        expect(onInteractionChange).toHaveBeenCalledTimes(2)
        expect(onInteractionChange).toHaveBeenCalledWith(false)
        expect(area.isInteracting).toBe(false)
    })

    it('handleOnTouchStart() should set isInteracting to true and trigger updateAngleValue', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const TouchEventClass = mock<React.TouchEvent>()
        const TouchListClass = mock<React.TouchList>()
        const TouchClass = mock<Touch>()
        when(TouchClass.pageX).thenReturn(240)
        when(TouchClass.pageY).thenReturn(360)
        when(TouchListClass.length).thenReturn(1)
        when(TouchListClass[0]).thenReturn(instance(TouchClass))
        when(TouchEventClass.changedTouches).thenReturn(
            instance(TouchListClass),
        )
        const touchEvent = instance(TouchEventClass)

        const updateAngleValueSpy = jest.spyOn(area, 'updateAngleValue')

        expect(area.isInteracting).toBe(false)
        area.handleOnTouchStart(touchEvent)
        expect(area.isInteracting).toBe(true)
        expect(updateAngleValueSpy).toHaveBeenCalledTimes(1)
        expect(updateAngleValueSpy).toHaveBeenCalledWith(240, 360)
    })

    it('handleOnTouchStart() should set isInteracting to true and NOT trigger updateAngleValue if changedTouches.length = 0', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const TouchEventClass = mock<React.TouchEvent>()
        const TouchListClass = mock<React.TouchList>()
        when(TouchListClass.length).thenReturn(0)
        when(TouchEventClass.changedTouches).thenReturn(
            instance(TouchListClass),
        )
        const touchEvent = instance(TouchEventClass)

        const updateAngleValueSpy = jest.spyOn(area, 'updateAngleValue')

        expect(area.isInteracting).toBe(false)
        area.handleOnTouchStart(touchEvent)
        expect(area.isInteracting).toBe(true)
        expect(updateAngleValueSpy).not.toHaveBeenCalled()
    })

    it('handleOnTouchMove() should trigger updateAngleValue if isInteracting', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const TouchEventClass = mock<TouchEvent>()
        const TouchListClass = mock<TouchList>()
        const TouchClass = mock<Touch>()
        when(TouchClass.pageX).thenReturn(240)
        when(TouchClass.pageY).thenReturn(360)
        when(TouchListClass.length).thenReturn(1)
        when(TouchListClass[0]).thenReturn(instance(TouchClass))
        when(TouchEventClass.changedTouches).thenReturn(
            instance(TouchListClass),
        )
        const touchEvent = instance(TouchEventClass)

        const updateAngleValueSpy = jest.spyOn(area, 'updateAngleValue')

        expect(area.isInteracting).toBe(false)
        area.handleOnTouchMove(touchEvent)
        expect(updateAngleValueSpy).not.toHaveBeenCalled()
        area.isInteracting = true
        area.handleOnTouchMove(touchEvent)
        expect(updateAngleValueSpy).toHaveBeenCalledTimes(1)
        expect(updateAngleValueSpy).toHaveBeenCalledWith(240, 360)
    })

    it('handleOnTouchMove() should  NOT trigger updateAngleValue if changedTouches.length = 0', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const TouchEventClass = mock<TouchEvent>()
        const TouchListClass = mock<TouchList>()
        when(TouchListClass.length).thenReturn(0)
        when(TouchEventClass.changedTouches).thenReturn(
            instance(TouchListClass),
        )
        const touchEvent = instance(TouchEventClass)

        const updateAngleValueSpy = jest.spyOn(area, 'updateAngleValue')

        area.isInteracting = true
        area.handleOnTouchMove(touchEvent)
        expect(updateAngleValueSpy).not.toHaveBeenCalled()
    })

    it('handleOnTouchEnd() should set isInteracting to false', () => {
        const onInteractionChange = jest.fn()
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            onInteractionChange,
        }
        const area = new KnobArea(ref, props)

        area.isInteracting = true // first call of onInteractionChange
        area.handleOnTouchEnd()
        expect(onInteractionChange).toHaveBeenCalledTimes(2)
        expect(onInteractionChange).toHaveBeenCalledWith(false)
        expect(area.isInteracting).toBe(false)
    })

    it('handleOnMouseDown() should trigger updateAngleValue and set isInteracting to true', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        const updateAngleValueSpy = jest.spyOn(area, 'updateAngleValue')
        const MouseEventClass = mock<React.MouseEvent>()
        when(MouseEventClass.pageX).thenReturn(240)
        when(MouseEventClass.pageY).thenReturn(360)
        const mouseEvent = instance(MouseEventClass)

        area.isInteracting = false
        area.handleOnMouseDown(mouseEvent)
        expect(updateAngleValueSpy).toHaveBeenCalledTimes(1)
        expect(updateAngleValueSpy).toHaveBeenCalledWith(240, 360)
        expect(area.isInteracting).toBe(true)
    })

    it('handleOnKeyDown(UP) should update value and angle', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        area.value = 98
        area.angle = area.angleFromValue(98)

        const KeyboardEventClass = mock<React.KeyboardEvent>()
        when(KeyboardEventClass.key).thenReturn('ArrowUp')
        const keyboardEvent = instance(KeyboardEventClass)

        expect(area.value).toBe(98)
        expect(area.angle).toBe(350)

        area.handleOnKeyDown(keyboardEvent)
        expect(area.value).toBe(99)
        expect(area.angle).toBe(353)

        area.handleOnKeyDown(keyboardEvent)
        expect(area.value).toBe(100)
        expect(area.angle).toBe(357)

        area.handleOnKeyDown(keyboardEvent)
        expect(area.value).toBe(100)
        expect(area.angle).toBe(357)
    })

    it('handleOnKeyDown(DOWN) should update value and angle', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)

        area.value = 2
        area.angle = area.angleFromValue(2)

        const KeyboardEventClass = mock<React.KeyboardEvent>()
        when(KeyboardEventClass.key).thenReturn('ArrowDown')
        const keyboardEvent = instance(KeyboardEventClass)

        expect(area.value).toBe(2)
        expect(area.angle).toBe(8)

        area.handleOnKeyDown(keyboardEvent)
        expect(area.value).toBe(1)
        expect(area.angle).toBe(4)

        area.handleOnKeyDown(keyboardEvent)
        expect(area.value).toBe(0)
        expect(area.angle).toBe(0)

        area.handleOnKeyDown(keyboardEvent)
        expect(area.value).toBe(0)
        expect(area.angle).toBe(0)
    })

    it('addWindowEventListeners() should add four event listeners', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)
        const mockAddListener = jest.fn()
        window.addEventListener = mockAddListener
        area.addWindowEventListeners('mouse')
        expect(mockAddListener).toHaveBeenCalledTimes(2)
        expect(mockAddListener.mock.calls[0]).toEqual([
            'mousemove',
            area.handleOnMouseMove,
        ])
        expect(mockAddListener.mock.calls[1]).toEqual([
            'mouseup',
            area.handleOnMouseUp,
        ])
        area.addWindowEventListeners('touch')
        expect(mockAddListener).toHaveBeenCalledTimes(4)
        expect(mockAddListener.mock.calls[2]).toEqual([
            'touchmove',
            area.handleOnTouchMove,
        ])
        expect(mockAddListener.mock.calls[3]).toEqual([
            'touchend',
            area.handleOnTouchEnd,
        ])
    })

    it('removeWindowEventListeners() should remove four event listeners', () => {
        const props = {
            diameter: 180,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
        }
        const area = new KnobArea(ref, props)
        const mockRemoveListener = jest.fn()
        window.removeEventListener = mockRemoveListener
        area.removeWindowEventListeners('mouse')
        expect(removeEventListener).toHaveBeenCalledTimes(2)
        expect(mockRemoveListener.mock.calls[0]).toEqual([
            'mousemove',
            area.handleOnMouseMove,
        ])
        expect(mockRemoveListener.mock.calls[1]).toEqual([
            'mouseup',
            area.handleOnMouseUp,
        ])
        area.removeWindowEventListeners('touch')
        expect(mockRemoveListener).toHaveBeenCalledTimes(4)
        expect(mockRemoveListener.mock.calls[2]).toEqual([
            'touchmove',
            area.handleOnTouchMove,
        ])
        expect(mockRemoveListener.mock.calls[3]).toEqual([
            'touchend',
            area.handleOnTouchEnd,
        ])
    })
})
