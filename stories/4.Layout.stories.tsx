import React, { useState } from 'react'
import Donut from '../src/skins/Donut'
import Basic from '../src/skins/Basic'
import HighContrast from '../src/skins/HighContrast'
import { Silver } from '../src'
import White from '../src/skins/White'

import SkinProps from '../src/skins/SkinProps'

export default {
    title: 'Knob/Layout',
}

const skinsList = [Donut, Basic, HighContrast, Silver, White]

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

interface RowWithKnobProps {
    component: (props: SkinProps<any>) => React.ReactElement<SkinProps<any>>
}

function RowWithKnob(
    props: RowWithKnobProps,
): React.ReactElement<RowWithKnobProps> {
    const [value, setValue] = useState(getRandomInt(0, 20))
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '10px 0',
            }}
        >
            <div
                style={{
                    width: `200px`,
                    alignSelf: 'flex-start',
                }}
            >
                <props.component
                    diameter={200}
                    min={0}
                    max={20}
                    step={1}
                    value={value}
                    onValueChange={setValue}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    padding: '0 20px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&lsquo;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
            </div>
        </div>
    )
}

interface PositionedKnob {
    style: React.CSSProperties
}

function PositionedKnob(
    props: PositionedKnob,
): React.ReactElement<PositionedKnob> {
    const [value, setValue] = React.useState(5)
    return (
        <Donut
            diameter={200}
            min={0}
            max={20}
            step={1}
            value={value}
            theme={{
                donutColor: 'lightcoral',
            }}
            style={props.style}
            onValueChange={setValue}
            ariaLabelledBy={'my-label'}
            spaceMaxFromZero={false}
        >
            <label
                id={'my-label'}
                style={{
                    textAlign: 'center',
                    width: '200px',
                    display: 'block',
                    padding: '10px 0',
                }}
            >
                With position: &lsquo;{props.style.position}&rsquo;
            </label>
        </Donut>
    )
}

const rows = Array.from(Array(20)).map(() => {
    return skinsList[getRandomInt(0, skinsList.length - 1)]
})

export function MultipleKnobsAndPositionsDemo(): JSX.Element {
    return (
        <div>
            <PositionedKnob
                style={{
                    position: 'sticky',
                    left: '0',
                    top: '0',
                    backgroundColor: 'rgba(255, 127, 0, 0.5)',
                    zIndex: 10,
                }}
            />
            <div
                style={{
                    position: 'relative',
                    height: '300px',
                    width: '100%',
                    backgroundColor: 'pink',
                }}
            >
                <PositionedKnob
                    style={{
                        position: 'absolute',
                        right: 'calc(50% - 100px)',
                        bottom: '0',
                    }}
                />
            </div>
            <div>
                <h1>CSS transform: translate, translate3d, scale</h1>
                <div
                    style={{
                        position: 'relative',
                        height: '520px',
                        backgroundColor: '#d99',
                    }}
                >
                    <PositionedKnob
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            transform: 'translate3d(0, 0, 0)',
                        }}
                    />
                    <PositionedKnob
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            transform:
                                'translate3d(5em, 260px, 50px) scale(0.5)',
                        }}
                    />
                    <PositionedKnob
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            transform: 'translate3d(260px, 130px, 0)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            transform: 'translate3d(480px, 0, 0)',
                        }}
                    >
                        <PositionedKnob
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                transform: 'translate3d(0, 0, 0)',
                            }}
                        />
                        <PositionedKnob
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                transform:
                                    'translate3d(5em, 260px, 50px) scale(0.7)',
                            }}
                        />
                        <PositionedKnob
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                transform: 'translate3d(260px, 130px, 0)',
                            }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        color: 'red',
                        fontSize: '22px',
                        padding: '10px',
                        margin: '10px',
                        border: '1px solid red',
                    }}
                >
                    If parent container uses CSS transform scale, Knob diameter
                    is not calculated properly. Known issue!
                </div>
            </div>
            <PositionedKnob
                style={{
                    position: 'relative',
                    margin: '100px auto',
                    width: '200px',
                }}
            />
            {rows.map((component, i) => (
                <RowWithKnob component={component} key={`row_${i}`} />
            ))}
            <PositionedKnob
                style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    backgroundColor: 'rgba(0, 127, 255, 0.5)',
                    zIndex: 11,
                }}
            />
        </div>
    )
}

MultipleKnobsAndPositionsDemo.story = {
    parameters: {
        notes: { disabled: true },
        knobs: { disabled: true },
        options: { showPanel: false },
    },
}
