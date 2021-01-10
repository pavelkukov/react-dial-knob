import React, { useState } from 'react'
import Knob from '../Knob'
import SkinWrap from './layout/SkinWrap'
import SkinProps from './SkinProps'
import composeTwo from '../util/composeTwo'
import useAngleUpdater from '../util/useAngleUpdater'

export interface WhiteTheme {
    activeNotchColor?: string
    defaultNotchColor?: string
    activeTextColor?: string
    defaultTextColor?: string
}

export default function White(props: SkinProps<WhiteTheme>): JSX.Element {
    const [angle, setAngle] = useAngleUpdater(props.value)
    const [isActive, setIsActive] = useState(false)
    const theme = props.theme || {}
    const activeNotchColor = theme.activeNotchColor || '#b56a7a'
    const defaultNotchColor = theme.defaultNotchColor || '#f7f7f7'
    const activeTextColor = theme.activeTextColor || '#b56a7a'
    const defaultTextColor = theme.defaultTextColor || '#100'
    const bgrColor = isActive ? activeTextColor : defaultTextColor
    const numSteps = Math.ceil((props.max - props.min) / props.step)
    const numNotches = Math.min(numSteps, 36)
    const activeNotch = Math.ceil(angle / Math.ceil(360 / numNotches))
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
                spaceMaxFromZero={props.spaceMaxFromZero}
                ariaLabelledBy={props.ariaLabelledBy}
                ariaValueText={props.ariaValueText}
                knobStyle={{ cursor: 'pointer', ...props.knobStyle }}
                onAngleChange={angleChangeHandler}
                onInteractionChange={interactionChangeHandler}
                onValueChange={props.onValueChange}
            >
                <>
                    <svg viewBox="0 0 62.463 62.463">
                        <defs>
                            <linearGradient id="prefix__c">
                                <stop offset={0} stopColor="#fff" />
                                <stop offset={1} stopColor="#b0b0b0" />
                            </linearGradient>
                            <linearGradient id="prefix__a">
                                <stop offset={0} stopColor="#939393" />
                                <stop
                                    offset={1}
                                    stopColor="#f0f0f0"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient id="prefix__b">
                                <stop offset={0} stopColor="#b0b0b0" />
                                <stop offset={1} stopColor="#fdfdfd" />
                            </linearGradient>
                            <linearGradient
                                gradientTransform="matrix(.84848 0 0 .84848 -25.569 29.664)"
                                gradientUnits="userSpaceOnUse"
                                y2={136.304}
                                x2={200.519}
                                y1={175.459}
                                x1={244.552}
                                id="prefix__e"
                                xlinkHref="#prefix__b"
                            />
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2={196.319}
                                x2={143.659}
                                y1={184.184}
                                x1={133.863}
                                id="prefix__d"
                                xlinkHref="#prefix__c"
                            />
                        </defs>
                        <g transform="translate(-131.196 -134.336)">
                            <g transform="translate(-442.372 -663.575) scale(4.37185)">
                                <circle
                                    cx={138.339}
                                    cy={189.655}
                                    r={7.144}
                                    fill={bgrColor}
                                />
                                <path
                                    d="M138.34 182.511a7.144 7.144 0 00-7.144 7.144 7.144 7.144 0 007.143 7.144 7.144 7.144 0 007.144-7.144 7.144 7.144 0 00-7.144-7.144zm0 .53a6.615 6.615 0 016.614 6.614 6.615 6.615 0 01-6.615 6.614 6.615 6.615 0 01-6.614-6.614 6.615 6.615 0 016.614-6.615z"
                                    fill="url(#prefix__d)"
                                />
                                <circle
                                    cx={138.339}
                                    cy={189.655}
                                    r={6.35}
                                    fill="#fff"
                                />
                            </g>
                            <circle
                                r={14.583}
                                cy={192.949}
                                cx={149.253}
                                fill="none"
                            />
                            <circle
                                cy={165.567}
                                cx={162.427}
                                fill="#f0f0f0"
                                r={27.151}
                            />
                        </g>
                        <g
                            transform={`translate(${62.463 / 2} ${
                                62.463 / 2
                            }) scale(0.45) rotate(-90)`}
                        >
                            {Array.from(new Array(numNotches)).map(
                                (_, index) => {
                                    const step = (2 * Math.PI) / numNotches
                                    const angle = index * step
                                    const width = 2
                                    const height = 8
                                    const x =
                                        width / 2 + 62.463 * Math.cos(angle)
                                    const y =
                                        height / 2 + 62.463 * Math.sin(angle)
                                    const origX = x - width / 2
                                    const origY = y - height / 2
                                    const fill =
                                        activeNotch > index
                                            ? activeNotchColor
                                            : defaultNotchColor
                                    const key = 'notch_' + index
                                    return (
                                        <rect
                                            key={key}
                                            id={`r${index}`}
                                            fill={fill}
                                            width={width}
                                            height={height}
                                            x={x}
                                            y={y}
                                            transform={`rotate(${
                                                index *
                                                    Math.ceil(
                                                        360 / numNotches,
                                                    ) +
                                                90
                                            } ${origX} ${origY})`}
                                        />
                                    )
                                },
                            )}
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
                            color: bgrColor,
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
