import { KnobProps } from './Knob'

class KnobArea {
    onAngleChange: Function
    onValueChange: Function
    onInteractionChange: Function
    min: number
    max: number
    step: number
    spaceMaxFromZero: boolean
    refElement: React.RefObject<HTMLDivElement>
    windowEventListeners: {
        mouse: Array<['mousemove' | 'mouseup', EventListener]>
        touch: Array<['touchmove' | 'touchend', EventListener]>
    }

    private _isInteracting: boolean
    private _value: number
    private _angle: number
    private _locationX: number
    private _locationY: number

    constructor(refElement: React.RefObject<HTMLDivElement>, props: KnobProps) {
        this.onAngleChange = props.onAngleChange
        this.onValueChange = props.onValueChange
        this.onInteractionChange = props.onInteractionChange
        this._locationX = 0
        this._locationY = 0
        this.refElement = refElement

        this._isInteracting = false

        this.windowEventListeners = {
            mouse: [
                ['mousemove', this.handleOnMouseMove],
                ['mouseup', this.handleOnMouseUp],
            ],
            touch: [
                ['touchmove', this.handleOnTouchMove],
                ['touchend', this.handleOnTouchEnd],
            ],
        }

        this.updateFromProps(props)
    }

    updateFromProps(props: KnobProps): void {
        if (props.max <= props.min || props.max < props.min + props.step) {
            throw new Error(
                'Max value should be bigger or equal to min+step value.',
            )
        }

        this.min = props.min
        this.max = props.max
        this.step = props.step

        this.onAngleChange = props.onAngleChange || this.onAngleChange
        this.onValueChange = props.onValueChange || this.onValueChange
        this.onInteractionChange =
            props.onInteractionChange || this.onInteractionChange
        this.spaceMaxFromZero =
            props.spaceMaxFromZero !== undefined ? props.spaceMaxFromZero : true

        if (props.value !== this.value) {
            if (props.min > this.value || props.value < props.min) {
                this.value = props.min
            } else if (props.max < this.value || props.value > props.max) {
                this.value = props.max
            } else {
                this.value = props.value
            }
            this.angle = this.angleFromValue(this.value)
        }

        if (this.value % this.step || (this.max - this.min) % this.step) {
            throw new Error(
                'Value and (max - min) should be divisible by step.',
            )
        }
    }

    get angle(): number {
        return this._angle
    }

    set angle(val: number) {
        if (this._angle === val) {
            return
        }
        this._angle = val
        if (this.onAngleChange) {
            this.onAngleChange(this._angle)
        }
    }

    get value(): number {
        return this._value
    }

    set value(val: number) {
        if (this._value === val) {
            return
        }
        this._value = val
        if (this.onValueChange) {
            this.onValueChange(this._value)
        }
    }

    get isInteracting(): boolean {
        return this._isInteracting
    }

    set isInteracting(val: boolean) {
        if (this._isInteracting === val) {
            return
        }
        this._isInteracting = val
        if (val === true) {
            this.updateAreaLocation()
        }
        if (this.onInteractionChange) {
            this.onInteractionChange(this._isInteracting)
        }
    }

    get numSteps(): number {
        return (this.max - this.min) / this.step
    }

    get valsDistribution(): number {
        if (this.spaceMaxFromZero) {
            return 360 / (this.numSteps + 1)
        }
        return 360 / this.numSteps
    }

    updateAreaLocation(): void {
        const areaRect = this.refElement.current.getBoundingClientRect()
        const bodyRect = document.body.getBoundingClientRect()
        const areaRadius = areaRect.width / 2
        const offsetTop = areaRect.top - bodyRect.top
        const offsetLeft = areaRect.left - bodyRect.left

        this._locationX = offsetLeft + areaRadius
        this._locationY = offsetTop + areaRadius
    }

    calcDegreeOfRotation(pageX: number, pageY: number): number {
        const rad = Math.atan2(pageX - this._locationX, pageY - this._locationY)
        const deg = Math.abs(rad * (180 / Math.PI) - 180)
        return deg
    }

    valueFromAngle(angle: number): number {
        const angleAsPercent = angle / (this.numSteps * this.valsDistribution)
        const totalValue = this.numSteps * this.step
        const val = this.min + angleAsPercent * totalValue
        if (val > this.max + this.step / 2) {
            return this.min
        }
        const valuesList = Array.from(new Array(this.numSteps + 1)).map(
            (_, i) => {
                return this.min + i * this.step
            },
        )
        const closest = valuesList.reduce(function(prev, curr) {
            return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
        })
        return closest
    }

    angleFromValue(value: number): number {
        return Math.ceil(
            ((value - this.min) / this.step) * this.valsDistribution,
        )
    }

    updateAngleValue(pageX: number, pageY: number): void {
        requestAnimationFrame(() => {
            const updatedAngle = this.calcDegreeOfRotation(pageX, pageY)
            this.value = this.valueFromAngle(updatedAngle)
            this.angle = this.angleFromValue(this.value)
        })
    }

    handleOnMouseDown = (event: React.MouseEvent): void => {
        this.addWindowEventListeners('mouse')
        const { pageX, pageY } = event
        this.updateAngleValue(pageX, pageY)
    }

    handleOnMouseMove = (event: MouseEvent): void => {
        if (!this.isInteracting) {
            return
        }
        const { pageX, pageY } = event
        this.updateAngleValue(pageX, pageY)
    }

    handleOnMouseUp = (): void => {
        this.removeWindowEventListeners('mouse')
    }

    handleOnTouchStart = (event: React.TouchEvent): void => {
        this.isInteracting = true
        this.addWindowEventListeners('touch')
        if ('changedTouches' in event && event.changedTouches.length === 1) {
            const { pageX, pageY } = event.changedTouches[0]
            this.updateAngleValue(pageX, pageY)
        }
    }

    handleOnTouchMove = (event: TouchEvent): void => {
        if (!this.isInteracting) {
            return
        }
        if ('changedTouches' in event && event.changedTouches.length === 1) {
            const { pageX, pageY } = event.changedTouches[0]
            this.updateAngleValue(pageX, pageY)
        }
    }

    handleOnTouchEnd = (): void => {
        this.removeWindowEventListeners('touch')
    }

    handleOnFocus = (): void => {
        this.isInteracting = true
    }

    handleOnBlur = (): void => {
        this.isInteracting = false
    }

    handleOnKeyDown = (event: React.KeyboardEvent): void => {
        if (event.keyCode === 38 && this.value + this.step <= this.max) {
            this.value += this.step
            this.angle = this.angleFromValue(this.value)
        } else if (event.keyCode === 40 && this.value - this.step >= this.min) {
            this.value -= this.step
            this.angle = this.angleFromValue(this.value)
        }
    }

    addWindowEventListeners(group: 'mouse' | 'touch'): void {
        this.isInteracting = true
        this.windowEventListeners[group].forEach(
            (handlerData: [string, EventListener]) => {
                const [eventName, handler] = handlerData
                window.addEventListener(eventName, handler)
            },
        )
    }

    removeWindowEventListeners(group: 'mouse' | 'touch'): void {
        this.isInteracting = false
        this.windowEventListeners[group].forEach(
            (handlerData: [string, EventListener]) => {
                const [eventName, handler] = handlerData
                window.removeEventListener(eventName, handler)
            },
        )
    }
}

export default KnobArea
