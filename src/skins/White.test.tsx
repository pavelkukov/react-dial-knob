import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

import White from './White'

describe('<White /> skin component', () => {
    afterEach(cleanup)

    it('Should render with child content', () => {
        const labelText = 'Label Content'
        render(
            <White diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </White>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
    })

    it('Should change class on focus/blur', () => {
        const labelText = 'Label Content'
        const defaultBgr = '#100'
        const activeBgr = '#b56a7a'
        const { container } = render(
            <White diameter={180} value={10} min={0} max={100} step={1}>
                <label>{labelText}</label>
            </White>,
        )
        expect(screen.queryByText(labelText)).toBeInTheDocument()
        const knob = container.querySelector('div[aria-valuenow="10"]')
        const path = container.querySelector('svg > g > g > circle')
        expect(path.getAttribute('fill')).toEqual(defaultBgr)
        fireEvent.focus(knob)
        expect(path.getAttribute('fill')).toEqual(activeBgr)
        fireEvent.blur(knob)
        expect(path.getAttribute('fill')).toEqual(defaultBgr)
    })
})
