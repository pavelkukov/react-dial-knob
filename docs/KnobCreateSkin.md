# Create skin component
Skin components are responsible for visual representation.
They are also responsible to pass-down props to `<Knob />`.

Knob works only in a controlled mode. Skins are following the same.

*Sample usage of the component `<MyKnobSkin />`*

```typescript
import React, { useState } from "react"

import MyKnobSkin from './MyKnobSkin'

const IndexPage = () => {
  const [value, setValue] = useState(1)
  return <section>
    <MyKnobSkin
        diameter={180}
        min={0}
        max={10}
        step={1}
        value={value}
        onValueChange={setValue}
        theme={{
            activeColor: 'red',
            defaultColor: 'black'
        }}
    >
        <label>Some label</label>
    </MyKnobSkin>
    <h1>Hi people</h1>
  <section>
}
```

##### Source of the `MyKnobSkin.tsx` component used above

1. Import React and useState Hook
```typescript
import React, { useState } from 'react'
```
2. Import Knob, SkinWrap, KnobProps, composeTwo, useAngleUpdater
```typescript
import Knob, { SkinWrap, KnobProps, composeTwo, useAngleUpdater } from 'react-dial-knob'
```
* Knob - main component
* SkinWrap - just a `<div />` wrapper with position relative. It could be replaced with something else.
* KnobProps - Props definition, eventually to be extended by the skin
* composeTwo - simple function that combines two callbacks in one. Used to pass callbacks from skin to knob in cases where the skin needs the same callback.
```typescript
composeTwo: <T>(
    handler: (...args: T[]) => void,
    callback?: (...args: T[]) => void,
) => (...args: T[]) => void
```
* useAngleUpdater - Render angle update on a second pass via useEffect

3. Eventually a Skin props definition
```typescript
interface MyKnobSkinTheme {
    activeColor?: string
    defaultColor?: string
}

interface MyKnobSkinProps extends KnobProps {
    theme?: MyKnobSkinTheme
    style?: React.CSSProperties
}
```

4. The entire thing
```typescript
import React, { useState } from 'react'
import Knob, { SkinWrap, KnobProps, composeTwo, useAngleUpdater } from 'react-dial-knob'

interface MyKnobSkinTheme {
    activeColor?: string
    defaultColor?: string
}

interface MyKnobSkinProps extends KnobProps {
    theme?: MyKnobSkinTheme
    style?: React.CSSProperties
}

export default function MyKnobSkin(props: MyKnobSkinProps): JSX.Element {
    const [angle, setAngle] = useAngleUpdater(props.value)
    const [isActive, setIsActive] = useState(false)
    const theme = props.theme || {}
    const activeColor = theme.activeColor || '#b56a7a'
    const defaultColor = theme.defaultColor || '#100'
    const bgrColor = isActive ? activeColor : defaultColor
    const angleChangeHandler = composeTwo<number>(setAngle, props.onAngleChange)
    const interactionChangeHandler = composeTwo<boolean>(
        setIsActive,
        props.onInteractionChange
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
                <svg
                    viewBox="0 0 100 100"
                    transform={`rotate(${angle})`}
                    style={{ transform: `rotate(${angle}deg)` }}
                >
                    <path
                        fill={bgrColor}
                        d="M50 0A50 50 0 000 50a50 50 0 0050 50 50 50 0 0050-50A50 50 0 0050 0zm0 2a48 48 0 0148 48 48 48 0 01-48 48A48 48 0 012 50 48 48 0 0150 2z"
                    />
                    <path
                        fill={bgrColor}
                        d="M50 4A46 46 0 004 50a46 46 0 0046 46 46 46 0 0046-46A46 46 0 0050 4zm0 2.141a4.276 4.276 0 014.276 4.277A4.276 4.276 0 0150 14.694a4.276 4.276 0 01-4.276-4.276A4.276 4.276 0 0150 6.141z"
                    />
                </svg>
            </Knob>
            {props.children}
        </SkinWrap>
    )
}
```
