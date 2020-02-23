# `<White />`

## Theme Props
```typescript
export interface WhiteTheme {
    activeNotchColor?: string
    defaultNotchColor?: string
    activeTextColor?: string
    defaultTextColor?: string
}
```

## Usage
```typescript
import React, { useState } from 'react'
import { White } from 'react-dial-knob'

export default function MyPage() {
    const [value, setValue] = useState(0)
    return <White
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            activeNotchColor: 'red',
            defaultNotchColor: 'floralwhite'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </White>
}
```