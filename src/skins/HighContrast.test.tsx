import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

import HighContrast from './HighContrast'

describe('<HighContrast /> skin component', () => {
    afterEach(cleanup)

    it('Should render with child content', () => {
        const labelText = 'Label Content'
        const defaultColor = '#100'
        const { container } = render(
            <HighContrast diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </HighContrast>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        expect(container.querySelectorAll('svg > path').length).toEqual(2)
        expect(
            container.querySelector('svg > path').getAttribute('fill'),
        ).toEqual(defaultColor)
    })

    it('Should change color on focus/blur', () => {
        const labelText = 'Label Content'
        const activeColor = '#b56a7a'
        const defaultColor = '#100'
        const { container } = render(
            <HighContrast diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </HighContrast>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        const knob = container.querySelector('div[aria-valuenow="10"]')
        const path = container.querySelector('svg > path')
        expect(path.getAttribute('fill')).toEqual(defaultColor)
        fireEvent.focus(knob)
        expect(path.getAttribute('fill')).toEqual(activeColor)
        fireEvent.blur(knob)
        expect(path.getAttribute('fill')).toEqual(defaultColor)
    })
})
