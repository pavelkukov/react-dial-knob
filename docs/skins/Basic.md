# `<Basic />`

## Theme Props
```typescript
export interface BasicTheme {
    defaultColor?: string
    activeColor?: string
    gradientStart?: string
    gradientEnd?: string
    notchAndText?: string
}
```

## Usage
```typescript
import React, { useState } from 'react'
import { Basic } from 'react-dial-knob'

export default function MyPage() {
    const [value, setValue] = useState(0)
    return <Basic
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            defaultColor: '#333',
            activeColor: '#f33'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </Basic>
}
```