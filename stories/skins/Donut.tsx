import { number, color } from '@storybook/addon-knobs'
import wrapSkinComponent from '../utils/wrapSkinComponent'

import Donut, { DonutTheme } from '../../src/skins/Donut'
import DonutDocs from '../../docs/skins/Donut.md'

function themeProvider(): DonutTheme {
    const donutThickness = number('Thickness', 30, {
        range: true,
        min: 1,
        max: 50,
        step: 1,
    })
    const donutColor = color('Color', '#1BA098')
    const bgrColor = color('Background', '#e1e1e1')
    const maxedBgrColor = color('Background (Max reached)', '#051622')
    const centerColor = color('Center Color', '#fff')
    const centerFocusedColor = color('Focused Center Color', '#F7F4E9')

    return {
        donutThickness,
        donutColor,
        bgrColor,
        maxedBgrColor,
        centerColor,
        centerFocusedColor,
    }
}

export const skinDonut = wrapSkinComponent(
    Donut,
    {
        max: 10,
        value: 3,
        spaceMaxFromZero: false,
    },
    themeProvider,
)

skinDonut.story = {
    parameters: {
        notes: { docs: DonutDocs },
        options: { showPanel: true },
    },
}
