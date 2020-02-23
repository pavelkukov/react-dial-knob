import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

import Donut from './Donut'

describe('<Donut /> skin component', () => {
    const theme = {
        donutThickness: 20,
        donutColor: 'rgb(255, 255, 255)',
        bgrColor: 'rgb(0, 0, 0)',
        maxedBgrColor: 'rgb(255, 0, 0)',
        centerColor: 'rgb(0, 0, 255)',
        centerFocusedColor: 'rgb(0, 255, 0)',
    }

    afterEach(cleanup)

    it('Should render with child content', () => {
        const labelText = 'Label Content'
        const { container } = render(
            <Donut
                diameter={180}
                value={10}
                min={0}
                max={100}
                step={1}
                theme={theme}
            >
                <label>{labelText}</label>
            </Donut>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        const donutParts = container.querySelectorAll(
            'div[aria-valuenow="10"] > div > div > div',
        )
        const donutWrap = container.querySelector(
            'div[aria-valuenow="10"] > div > div',
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        expect(donutParts.length).toEqual(3)
        expect(window.getComputedStyle(donutWrap).backgroundColor).toEqual(
            theme.donutColor,
        )
        expect(window.getComputedStyle(donutParts[0]).backgroundColor).toEqual(
            theme.bgrColor,
        )
        expect(window.getComputedStyle(donutParts[1]).backgroundColor).toEqual(
            theme.bgrColor,
        )
        expect(window.getComputedStyle(donutParts[2]).backgroundColor).toEqual(
            theme.centerColor,
        )
    })

    it('Should change color and class on focus/blur', () => {
        const labelText = 'Label Content'
        const { container } = render(
            <Donut
                diameter={180}
                value={10}
                min={0}
                max={100}
                step={1}
                theme={theme}
            >
                <div>{labelText}</div>
            </Donut>,
        )
        const knob = container.querySelector('div[aria-valuenow="10"]')
        const donutTags = container.querySelectorAll(
            'div[aria-valuenow="10"] > div > div > div',
        )
        expect(window.getComputedStyle(donutTags[2]).backgroundColor).toEqual(
            theme.centerColor,
        )
        fireEvent.focus(knob)
        expect(window.getComputedStyle(donutTags[2]).backgroundColor).toEqual(
            theme.centerFocusedColor,
        )
        expect(donutTags[2].className).toMatch(/.*?-center-active$/)
        fireEvent.blur(knob)
        expect(window.getComputedStyle(donutTags[2]).backgroundColor).toEqual(
            theme.centerColor,
        )
        expect(donutTags[2].className).toMatch(/.*?-center$/)
    })

    it('Should maxedBgrColor when max value is reached', () => {
        const labelText = 'Label Content'
        const { container } = render(
            <Donut
                diameter={180}
                value={100}
                min={0}
                max={100}
                step={1}
                theme={theme}
            >
                <div>{labelText}</div>
            </Donut>,
        )

        const donutWrap = container.querySelector(
            'div[aria-valuenow="100"] > div > div',
        )
        expect(window.getComputedStyle(donutWrap).backgroundColor).toEqual(
            theme.maxedBgrColor,
        )
    })
})
