import React from 'react'
import { KnobProps } from '../Knob'
import { DonutTheme } from './Donut'
import { BasicTheme } from './Basic'
import { HighContrastTheme } from './HighContrast'
import { WhiteTheme } from './White'

export default interface SkinProps<
    T extends DonutTheme | BasicTheme | HighContrastTheme | WhiteTheme | unknown
> extends KnobProps {
    style?: React.CSSProperties
    theme?: T
}
