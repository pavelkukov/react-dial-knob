import React, { useState } from 'react'
import Knob from '../Knob'
import SkinProps from './SkinProps'
import SkinWrap from './layout/SkinWrap'
import composeTwo from '../util/composeTwo'

export interface DonutTheme {
    donutColor?: string
    bgrColor?: string
    maxedBgrColor?: string
    centerColor?: string
    centerFocusedColor?: string
    donutThickness?: number
}

/*
 * CSS for this component is written by @Hyungsub
 * All credits goes to him
 * https://codepen.io/Hyungsub08/pen/yLBPJKW
 */

const uniqClassName = `donut-${new Date().getTime()}`

export default function Donut(props: SkinProps<DonutTheme>): JSX.Element {
    const [angle, setAngle] = useState(0)
    const [centerClass, setCenterClass] = useState(`${uniqClassName}-center`)

    const angleChangeHandler = composeTwo<number>(setAngle, props.onAngleChange)
    const interactionChangeHandler = composeTwo<boolean>(isInteracting => {
        isInteracting
            ? setCenterClass(`${uniqClassName}-center-active`)
            : setCenterClass(`${uniqClassName}-center`)
    }, props.onInteractionChange)

    const theme = props.theme || {}

    const donutColor = theme.donutColor || '#1BA098'
    const defaultBgrColor = theme.bgrColor || '#e1e1e1'
    const maxedBgrColor = theme.maxedBgrColor || '#051622'
    const centerColor = theme.centerColor || '#fff'
    const centerFocusedColor = theme.centerFocusedColor || '#F7F4E9'
    const donutThickness = theme.donutThickness || 30

    let bgrColor = defaultBgrColor
    if (props.value === props.max) {
        bgrColor = maxedBgrColor
    }
    let colorBgr = bgrColor
    let colorOne = donutColor
    let colorTwo = donutColor
    let angleOne = 90
    let angleTwo = angle

    if (angle < 180) {
        colorBgr = donutColor
        colorOne = bgrColor
        colorTwo = bgrColor
        angleOne = angle + 90
        angleTwo = 0
    }
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
                    <style type="text/css">
                        {`.${uniqClassName} {
                      position: relative;
                      border-radius: 50%;
                      overflow: hidden;
                    }
                    .${uniqClassName}-slice-one, .${uniqClassName}-slice-two {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                    }
                    .${uniqClassName}-center, .${uniqClassName}-center-active {
                      position: absolute;
                      border-radius: 50%;
                    }
                    .${uniqClassName}-center {
                      background: ${centerColor};
                    }
                    .${uniqClassName}-center-active {
                      background: ${centerFocusedColor};
                    }
                    .${uniqClassName}-center span {
                      display: block;
                      text-align: center;
                    }
                    .${uniqClassName}-text {
                        width: 100%;
                        text-align: center;
                        font-weight: bold;
                        position: absolute;
                        top: calc(50% - 0.6em);
                        user-select: none;
                        z-index: 3;
                    }`}
                    </style>
                    <div
                        style={{
                            position: 'relative',
                            width: props.diameter,
                            height: props.diameter,
                            userSelect: 'none',
                        }}
                    >
                        <div
                            className={uniqClassName}
                            style={{
                                width: `${props.diameter}px`,
                                height: `${props.diameter}px`,
                                background: colorBgr,
                            }}
                        >
                            <div
                                className={`${uniqClassName}-slice-one`}
                                style={{
                                    clip: `rect(0 ${
                                        props.diameter
                                    }px ${props.diameter / 2}px 0)`,
                                    transform: `rotate(${angleOne}deg)`,
                                    background: colorOne,
                                }}
                            ></div>
                            <div
                                className={`${uniqClassName}-slice-two`}
                                style={{
                                    clip: `rect(0 ${props.diameter / 2}px ${
                                        props.diameter
                                    }px 0)`,
                                    transform: `rotate(${angleTwo}deg)`,
                                    background: colorTwo,
                                }}
                            ></div>
                            <div
                                className={centerClass}
                                style={{
                                    top: `${donutThickness}px`,
                                    left: `${donutThickness}px`,
                                    width: `${props.diameter -
                                        donutThickness * 2}px`,
                                    height: `${props.diameter -
                                        donutThickness * 2}px`,
                                }}
                            ></div>
                        </div>
                        <div
                            className={`${uniqClassName}-text`}
                            style={{
                                color: donutColor,
                                fontSize: `${Math.ceil(props.diameter / 4)}px`,
                            }}
                        >
                            {props.value}
                        </div>
                    </div>
                </>
            </Knob>
            {props.children}
        </SkinWrap>
    )
}
