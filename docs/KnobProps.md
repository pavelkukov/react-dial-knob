# <Knob /> Component

The "Knob" component is intended to provide general functionality without responsibility for visual elements. In other words, it is meant to be used by a Skin component. The skin is responsible for passing down props to knob.

#### Props definition
```typescript
export interface KnobProps {
    diameter: number
    value: number
    min: number
    max: number
    step: number
    spaceMaxFromZero?: boolean
    ariaLabelledBy?: string
    ariaValueText?: string
    knobStyle?: React.CSSProperties
    children?: React.ReactNode
    onAngleChange?: (angle: number) => void
    onInteractionChange?: (isInteracting: boolean) => void
    onValueChange?: (value: number) => void
}
```

### Props details
* `diameter` - the size of the component
* `value` - current value. The component works only in controlled mode.
* `min` - minimal value
* `max` - maximal value
* `step` - increment step
* `spaceMaxFromZero` - add additional space between min, and max values. True by default. Make sense to turn it off for small number of steps - e.g 1 to 10. See Donut skin for example.
* `ariaLabelledBy` - render aria-labelledby attribute
* `ariaValueText` - render aria-valuetext attribute
* `style` - CSS styles
* `children` - React.ReactNode
* `onAngleChange` - callback invoked every time when angle have to be updated
* `onInteractionChange` - callback invoked on mousedown/mouseup, focus/blur and touchstart/touchend
* `onValueChange` callback for value update. Most common use case is `const [value, setValue] = useState(0) .... <MySkinName value={value} onValueChange={setValue} ...`
