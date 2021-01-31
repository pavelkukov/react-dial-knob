import React, { useState } from 'react'
import Knob from '../Knob'
import SkinWrap from './layout/SkinWrap'
import SkinProps from './SkinProps'
import composeTwo from '../util/composeTwo'
import useAngleUpdater from '../util/useAngleUpdater'

export interface BasicTheme {
    defaultColor?: string
    activeColor?: string
    gradientStart?: string
    gradientEnd?: string
    notchAndText?: string
}

export default function Basic(props: SkinProps<BasicTheme>): JSX.Element {
    const [angle, setAngle] = useAngleUpdater(props.value)
    const [isActive, setIsActive] = useState(false)
    const theme = props.theme || {}
    const activeColor = theme.activeColor || '#a1dca8'
    const defaultColor = theme.defaultColor || '#3f3f3f'
    const gradientStart = theme.gradientStart || '#f9f9f9'
    const gradientEnd = theme.gradientEnd || '#eaeced'
    const notchAndText = theme.notchAndText || '#3f3f3f'
    const borderColor = isActive ? activeColor : defaultColor
    const angleChangeHandler = composeTwo<number>(setAngle, props.onAngleChange)
    const interactionChangeHandler = composeTwo<boolean>(
        setIsActive,
        props.onInteractionChange,
    )
    return (
        <SkinWrap style={props.style}>
            <Knob
                diameter={props.diameter}
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                jumpLimit={props.jumpLimit}
                spaceMaxFromZero={props.spaceMaxFromZero}
                ariaLabelledBy={props.ariaLabelledBy}
                ariaValueText={props.ariaValueText}
                knobStyle={{ cursor: 'pointer', ...props.knobStyle }}
                onAngleChange={angleChangeHandler}
                onInteractionChange={interactionChangeHandler}
                onValueChange={props.onValueChange}
            >
                <>
                    <svg
                        viewBox="0 0 166.56 166.56"
                        transform={`rotate(${angle})`}
                        style={{ transform: `rotate(${angle}deg)` }}
                    >
                        <defs>
                            <linearGradient id="a">
                                <stop
                                    offset="0"
                                    stopColor={gradientStart}
                                    stopOpacity="1"
                                ></stop>
                                <stop
                                    offset="1"
                                    stopColor={gradientEnd}
                                    stopOpacity="1"
                                ></stop>
                            </linearGradient>
                            <filter
                                id="b"
                                width="1.11"
                                height="1.11"
                                x="-0.055"
                                y="-0.055"
                                colorInterpolationFilters="sRGB"
                            >
                                <feGaussianBlur stdDeviation="3.45"></feGaussianBlur>
                            </filter>
                            <linearGradient
                                id="c"
                                x1="140.985"
                                x2="63.122"
                                y1="98.751"
                                y2="202.317"
                                gradientTransform="translate(-75.643 -328.104)"
                                gradientUnits="userSpaceOnUse"
                                xlinkHref="#a"
                            ></linearGradient>
                        </defs>
                        <g fillOpacity="1" transform="translate(-21.72 -65.22)">
                            <circle
                                cx="105"
                                cy="148.5"
                                r="75"
                                fill="#ccc"
                                stroke="none"
                                strokeDasharray="none"
                                strokeMiterlimit="4"
                                strokeOpacity="1"
                                strokeWidth="17.106"
                                filter="url(#b)"
                                opacity="1"
                            ></circle>
                            <circle
                                cx="29.357"
                                cy="-179.604"
                                r="70"
                                fill="url(#c)"
                                stroke={borderColor}
                                strokeDasharray="none"
                                strokeMiterlimit="4"
                                strokeOpacity="1"
                                strokeWidth="1"
                                opacity="1"
                                transform="rotate(135.448)"
                            ></circle>
                            <circle
                                cx="105.083"
                                cy="88.628"
                                r="4.443"
                                fill={notchAndText}
                                stroke="#b1b1b1"
                                strokeDasharray="none"
                                strokeMiterlimit="4"
                                strokeOpacity="1"
                                strokeWidth="0.551"
                                opacity="1"
                            ></circle>
                        </g>
                    </svg>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: `${Math.ceil(props.diameter / 4)}px`,
                            position: 'absolute',
                            top: 'calc(50% - 0.6em)',
                            userSelect: 'none',
                            color: notchAndText,
                        }}
                    >
                        {props.value}
                    </div>
                </>
            </Knob>
            {props.children}
        </SkinWrap>
    )
}
