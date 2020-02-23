import { color } from '@storybook/addon-knobs'
import wrapSkinComponent from '../utils/wrapSkinComponent'
import Basic, { BasicTheme } from '../../src/skins/Basic'
import BasicSkinDocs from '../../docs/skins/Basic.md'

function themeProvider(): BasicTheme {
    const activeColor = color('Active border', '#a1dca8')
    const defaultColor = color('Default border', '#3f3f3f')
    const gradientStart = color('Gradient Start', '#f9f9f9')
    const gradientEnd = color('Gradient End', '#eaeced')
    const notchAndText = color('Notch and text', '#3f3f3f')

    return {
        activeColor,
        defaultColor,
        gradientStart,
        gradientEnd,
        notchAndText,
    }
}

export const skinBasic = wrapSkinComponent(Basic, { value: 23 }, themeProvider)

skinBasic.story = {
    parameters: {
        notes: { docs: BasicSkinDocs },
        options: { showPanel: true },
    },
}
