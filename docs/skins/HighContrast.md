# `<HighContrast />`

## Theme Props
```typescript
export interface HighContrastTheme {
    defaultColor?: string
    activeColor?: string
}
```

## Usage
```typescript
import React, { useState } from 'react'
import { HighContrast } from 'react-dial-knob'

export default function MyPage() {
    const [value, setValue] = useState(0)
    return <HighContrast
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            defaultColor: 'black',
            activeColor: 'blue'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </HighContrast>
}
```