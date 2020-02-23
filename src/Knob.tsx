import React, { useRef } from 'react'
import KnobArea from './KnobArea'
import KnobErrorWrap from './KnobErrorWrap'

export interface KnobProps {
    diameter: number
    value: number
    min: number
    max: number
    step: number
    spaceMaxFromZero?: boolean
    ariaLabelledBy?: string
    ariaValueText?: string
    knobStyle?: React.CSSProperties
    children?: React.ReactNode
    onAngleChange?: (angle: number) => void
    onInteractionChange?: (isInteracting: boolean) => void
    onValueChange?: (value: number) => void
}

export function useKnobAreaClass(
    props: KnobProps,
): [React.RefObject<HTMLDivElement>, KnobArea | null, Error | null] {
    const refElement = useRef(null)
    const refKnobArea = useRef<KnobArea>(null)
    let errorContent: null | Error = null
    try {
        if (!refKnobArea.current) {
            refKnobArea.current = new KnobArea(refElement, props)
        } else {
            refKnobArea.current.updateFromProps(props)
        }
    } catch (e) {
        errorContent = e
    }
    return [refElement, refKnobArea.current, errorContent]
}

export default function Knob(props: KnobProps): JSX.Element {
    const [refElement, knobArea, errorContent] = useKnobAreaClass(props)
    const defaultStyle = {
        width: `${props.diameter}px`,
        height: `${props.diameter}px`,
        borderRadius: `${props.diameter / 2}px`,
        position: 'relative' as 'relative',
        outline: 'none',
        boxSizing: 'border-box' as 'border-box',
        overflow: 'hidden',
    }
    const userStyle = props.knobStyle || {}
    const activeStyle = { ...defaultStyle, ...userStyle }
    const knobElement = (
        <div
            ref={refElement}
            onMouseDown={knobArea && knobArea.handleOnMouseDown}
            onTouchStart={knobArea && knobArea.handleOnTouchStart}
            onKeyDown={knobArea && knobArea.handleOnKeyDown}
            onFocus={knobArea && knobArea.handleOnFocus}
            onBlur={knobArea && knobArea.handleOnBlur}
            style={activeStyle}
            tabIndex={0}
            aria-valuenow={props.value}
            aria-valuemin={props.min}
            aria-valuemax={props.max}
            aria-valuetext={props.ariaValueText}
            aria-labelledby={props.ariaLabelledBy}
        >
            {props.children}
        </div>
    )
    if (errorContent) {
        return (
            <KnobErrorWrap error={errorContent} diameter={props.diameter}>
                {knobElement}
            </KnobErrorWrap>
        )
    }
    return knobElement
}
