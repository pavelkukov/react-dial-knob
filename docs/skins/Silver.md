# `<Silver />`

## Theme Props
This skin is not having theme

## Usage
```typescript
import React, { useState } from 'react'
import { Silver } from 'react-dial-knob'

export default function MyPage() {
    const [value, setValue] = useState(0)
    return <Silver
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </Silver>
}
```