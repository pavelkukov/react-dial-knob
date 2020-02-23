import { useState, useRef } from 'react'
import { number } from '@storybook/addon-knobs'
import { manager } from '@storybook/addon-knobs/dist/registerKnobs'

const { knobStore } = manager

interface StatefulNumberKnobOptions {
    range?: boolean
    min?: number
    max?: number
    step?: number
}

export default function useNumberState(
    label: string,
    defaultVal: number,
    options: StatefulNumberKnobOptions = {},
    groupID: string = undefined,
): [number, (value: number) => void] {
    const _value = number(label, defaultVal, options, groupID)

    const [value, setValue] = useState(_value)

    const valueMon = useRef(null)
    const valueSetter = (val: number): void => {
        valueMon.current = val
        knobStore.store['Value'].value = val
        setValue(val)
    }

    if (valueMon.current === null) {
        valueMon.current = _value
    } else if (valueMon.current !== _value) {
        valueSetter(_value)
    }

    if (options.min > valueMon.current) {
        valueSetter(options.min)
    } else if (options.max < valueMon.current) {
        valueSetter(options.max)
    }

    if (valueMon.current % options.step) {
        valueSetter(options.min)
    }

    return [value, valueSetter]
}
