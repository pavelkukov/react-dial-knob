import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

import Silver from './Silver'

describe('<Silver /> skin component', () => {
    afterEach(cleanup)

    it('Should render with child content', () => {
        const labelText = 'Label Content'
        render(
            <Silver diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </Silver>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
    })

    it('Should change class on focus/blur', () => {
        const labelText = 'Label Content'
        const { container } = render(
            <Silver diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </Silver>,
        )
        const knob = container.querySelector('div[aria-valuenow="10"]')
        const bgr = container.querySelector(
            'div[aria-valuenow="10"] > div > div',
        )
        expect(bgr.className).toMatch(/.*?-bgr$/)
        fireEvent.focus(knob)
        expect(bgr.className).toMatch(/.*?-bgr-active$/)
        fireEvent.blur(knob)
        expect(bgr.className).toMatch(/.*?-bgr$/)
    })
})
