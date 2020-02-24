# React Dial Knob
Similar to a slider, but circular.


## 🦚 Skins Demo
* [Basic](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--basic)
* [Donut](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--donut)
* [HighContrast](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--high-contrast)
* [Silver](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--silver)
* [White](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-skins--white)


## 🎯 Features

* **Fast** ~4% scripting time while interacting
* **Small size** ~5kb(gzipped) with a all 5 skins | ~2kb core functionality
* Support **arrow keys, touch and mouse**
* **Themes** + **Custom skins** with ease
* **Zero dependencies**

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
1. You have to store `value` and update the component (controlled component).
2. Four of the skins are having `theme` prop. (Docs and playground in storybook)
3. [Custom skin creation tutorial](https://pavelkukov.github.io/react-dial-knob/?path=/story/knob-knob-component--create-skin) in storybook. (131 lines - text and code)

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


## 👋 Author
Pavel Kukov <pavelkukov@gmail.com>


## © LICENSE (MIT)
See LICENSE.txt in the root directory


## 🙌 Acknowledgments
* Repo structure and tooling are inspired by: https://github.com/danilowoz/react-content-loader
* Silver theme is based on https://codepen.io/simurai/pen/DwJdq
* Donut theme is based on https://codepen.io/Hyungsub08/pen/yLBPJKW
