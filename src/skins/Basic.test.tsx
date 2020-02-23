import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

import Basic from './Basic'

describe('<Basic /> skin component', () => {
    afterEach(cleanup)

    it('Should render with child content', () => {
        const labelText = 'Label Content'
        const defaultColor = '#3f3f3f'
        const { container } = render(
            <Basic diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </Basic>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        expect(container.querySelectorAll('circle').length).toEqual(3)
        expect(
            container.querySelectorAll('circle')[1].getAttribute('stroke'),
        ).toEqual(defaultColor)
    })

    it('Should change color on focus/blur', () => {
        const labelText = 'Label Content'
        const activeColor = '#a1dca8'
        const defaultColor = '#3f3f3f'
        const { container } = render(
            <Basic diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </Basic>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        const knob = container.querySelector('div[aria-valuenow="10"]')
        const circleSecond = container.querySelectorAll('circle')[1]
        expect(circleSecond.getAttribute('stroke')).toEqual(defaultColor)
        fireEvent.focus(knob)
        expect(circleSecond.getAttribute('stroke')).toEqual(activeColor)
        fireEvent.blur(knob)
        expect(circleSecond.getAttribute('stroke')).toEqual(defaultColor)
    })
})
