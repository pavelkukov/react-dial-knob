# React Dial Knob
Accessible, keyboard/mouse/touch-friendly, dial knob component for the web. 
Based on pure HTML/SVG elements without dependencies. 

Implemented in TypeScript. Treeshakable with minimal footprint (core around 2kb). 

#### Props
* value: number
* min: number
* max: number
* step: number
* ariaLabelledBy?: string
* onValueChange?: (value: number) => void
* and few [more](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-knob-component--props)...


## 🦚 Skins & Demo
The package comes with five themable skins. 

* [Basic](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--basic)
* [Donut](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--donut)
* [HighContrast](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--high-contrast)
* [Silver](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--silver)
* [White](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--white)

_________________________________________________________________________
A short tutorial on how to ["Create skin component"](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-knob-component--create-skin) can be found in the storybook and [CodePen](https://codepen.io/pavelkukov/pen/LYVOLoO?editors=0010). Essentially drop an SVG with few lines of code.
_________________________________________________________________________


## 📈 Performance
~4% scripting time while interacting, 96% Idle

![Donut Knob](/docs/images/donut-konb-180.gif)
![Scripting time is only 4%](/docs/images/scripting-only.png)


## 🧩 Installing
```shell
npm install --save-dev react-dial-knob
```
**UMD module**
```html
https://unpkg.com/react-dial-knob/dist/react-dial-knob.umd.js
```

## ✔ Usage
You have to store `value` and update the component (controlled component).
_________________________________________________________________________
[See at CodePen](https://codepen.io/pavelkukov/pen/xxGgZvL?editors=0010)

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

Skins are independent of each other. The final bundle size is a sum of common dependencies plus skin size (typically around ~2.5kb with a single skin). Indicative stats on sizes can be found in ["stats.html"](https://github.com/pavelkukov/react-dial-knob/blob/master/stats.html)

** Core-only UMD build is available **
```
https://unpkg.com/react-dial-knob/dist/react-dial-knob.umd.core-only.min.js
```

* NPM - https://www.npmjs.com/package/react-dial-knob
* GitHub - https://github.com/pavelkukov/react-dial-knob
* Storybook - https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-read-me--readme



## 👋 Author
Pavel Kukov <pavelkukov@gmail.com>


## © LICENSE (MIT)
See LICENSE.txt in the root directory


## 🙌 Acknowledgments
* Repo structure and tooling are inspired by: https://github.com/danilowoz/react-content-loader
* Silver theme is based on https://codepen.io/simurai/pen/DwJdq
* Donut theme is based on https://codepen.io/Hyungsub08/pen/yLBPJKW
