# `<Donut />`

## Theme Props
```typescript
export interface DonutTheme {
    donutColor?: string
    bgrColor?: string
    maxedBgrColor?: string
    centerColor?: string
    centerFocusedColor?: string
    donutThickness?: number
}
```

## Usage
```typescript
import React, { useState } from 'react'
import { Donut } from 'react-dial-knob'

export default function MyPage() {
    const [value, setValue] = useState(0)
    return <Donut
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            donutColor: 'blue'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </Donut>
}
```