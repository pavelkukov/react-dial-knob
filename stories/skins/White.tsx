import { color } from '@storybook/addon-knobs'
import wrapSkinComponent from '../utils/wrapSkinComponent'

import White, { WhiteTheme } from '../../src/skins/White'
import WhiteDocs from '../../docs/skins/White.md'

function themeProvider(): WhiteTheme {
    const activeNotchColor = color('Active notch color', '#b56a7a')
    const defaultNotchColor = color('Default notch color', '#f7f7f7')
    const activeTextColor = color('Active text color', '#b56a7a')
    const defaultTextColor = color('Default text color', '#100')

    return {
        activeNotchColor,
        defaultNotchColor,
        activeTextColor,
        defaultTextColor,
    }
}

export const skinWhite = wrapSkinComponent(White, {}, themeProvider)

skinWhite.story = {
    parameters: {
        notes: { docs: WhiteDocs },
        options: { showPanel: true },
    },
}
