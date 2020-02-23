import { color } from '@storybook/addon-knobs'
import wrapSkinComponent from '../utils/wrapSkinComponent'
import HighContrast, { HighContrastTheme } from '../../src/skins/HighContrast'
import HighContrastDocs from '../../docs/skins/HighContrast.md'

function themeProvider(): HighContrastTheme {
    const activeColor = color('Active color', '#b56a7a')
    const defaultColor = color('Default color', '#100')

    return {
        activeColor,
        defaultColor,
    }
}

export const skinHighContrast = wrapSkinComponent(
    HighContrast,
    {},
    themeProvider,
)

skinHighContrast.story = {
    parameters: {
        notes: { docs: HighContrastDocs },
        options: { showPanel: true },
    },
}
