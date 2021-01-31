import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import useNumberState from './useNumberState'
import SkinProps from '../../src/skins/SkinProps'
import { DonutTheme } from '../../src/skins/Donut'
import { BasicTheme } from '../../src/skins/Basic'
import { HighContrastTheme } from '../../src/skins/HighContrast'
import { WhiteTheme } from '../../src/skins/White'

export interface Story {
    (): JSX.Element
    story?: {
        parameters?: {
            notes?: { docs: string }
            options?: {
                showPanel?: boolean
            }
        }
    }
}

interface DefaultValues {
    min?: number
    max?: number
    diameter?: number
    step?: number
    value?: number
    spaceMaxFromZero?: boolean
}

const wrapSkinComponent = (
    SkinComponent: React.FunctionComponent<
        SkinProps<
            DonutTheme | BasicTheme | HighContrastTheme | WhiteTheme | unknown
        >
    >,
    defaults: DefaultValues = {},
    themeProvider?: () =>
        | DonutTheme
        | BasicTheme
        | HighContrastTheme
        | WhiteTheme,
): Story => (): JSX.Element => {
    const defaultVals = {
        min: 0,
        max: 120,
        step: 1,
        diameter: 180,
        jumpLimit: 1,
        spaceMaxFromZero: true,
        ...defaults,
    }
    const diameter = number('Diameter', defaultVals.diameter, {
        range: true,
        min: 120,
        max: 400,
        step: 1,
    })
    const min = number('Min', defaultVals.min, {})
    const max = number('Max', defaultVals.max, {})
    const step = number('Step', defaultVals.step, {
        range: true,
        min: Math.max(min, 1),
        max: max,
        step: 1,
    })
    const jumpLimit = number('Jump Limit', defaultVals.jumpLimit, {
        range: true,
        min: 0,
        max: 1,
        step: 0.1,
    })
    const valueOptions = {
        range: true,
        min: min,
        max: max,
        step: step,
    }
    const [value, setValue] = useNumberState(
        'Value',
        defaultVals.value || min,
        valueOptions,
    )
    const spaceMaxFromZero = boolean(
        'SpaceMaxFromZero',
        defaultVals.spaceMaxFromZero,
    )

    const theme = themeProvider && themeProvider()

    return (
        <SkinComponent
            diameter={diameter}
            min={min}
            max={max}
            step={step}
            value={value}
            jumpLimit={jumpLimit}
            spaceMaxFromZero={spaceMaxFromZero}
            onValueChange={setValue}
            style={{
                position: 'absolute',
                top: `calc(50% - ${diameter / 2}px)`,
                left: `calc(50% - ${diameter / 2}px)`,
            }}
            theme={theme}
            ariaLabelledBy="knobLabel"
        >
            <label
                id="knobLabel"
                style={{
                    textAlign: 'center',
                    display: 'block',
                    userSelect: 'none',
                }}
            >
                Rotate me!
            </label>
        </SkinComponent>
    )
}

export default wrapSkinComponent
