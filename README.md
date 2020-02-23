# React Dial Knob
UI control that should be rotated to change the value. Similar to a slider, but circular.

## 🦚 Skins Demo
* Basic
* Donut
* HighContrast
* Silver
* White

## 🎯 Features

* **Fast** ~4% scripting time while interacting
* **Small size** ~5kb(gzipped) if a all 5 skins are imported/used (see: stats.html)
* Support **arrow keys, touch and mouse**
* **Themes** + **Custom skins** with ease
* **Zero dependencies**

![Donut Knob](/docs/images/donut-konb-180.gif)
![Scripting time is only 4%](/docs/images/scripting-only.png)

## 🧩 Installing
```shell
npm install --save-dev react-dial-knob
```

## ✔ Usage
1. You have to store `value` and update the component (controlled component).
2. Four of the skins are having `theme` prop. (Docs and playground in storybook)
3. Custom skin creation tutorial in storybook. (131 lines - text and code)

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
## 🧾 Notes

###### sideEffects is set to false - tree shaking will remove all unused parts and will further reduce the size of your final bundle.

## 👋 Author
Pavel Kukov <pavelkukov@gmail.com>

## © LICENSE (MIT)
See LICENSE.txt in the root directory
