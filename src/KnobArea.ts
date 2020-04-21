import { KnobProps } from './Knob'

class KnobArea {
    onAngleChange: Function
    onValueChange: Function
    onInteractionChange: Function
    min: number
    max: number
    step: number
    diameter: number
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
        this.diameter = props.diameter

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

    private getComputedTransformXY(
        el: HTMLElement,
    ): { x: number; y: number; scaleX: number; scaleY: number } {
        if (!window.getComputedStyle || !el) {
            return { x: 0, y: 0, scaleX: 1, scaleY: 1 }
        }

        const style = window.getComputedStyle(el)
        const transform = style.transform || style.webkitTransform
        if (!transform) {
            return { x: 0, y: 0, scaleX: 1, scaleY: 1 }
        }
        let mat = transform.match(/^matrix3d\((.+)\)$/)
        if (mat) {
            const scaleX = parseFloat(mat[1].split(', ')[0])
            const scaleY = parseFloat(mat[1].split(', ')[5])
            return {
                x: parseFloat(mat[1].split(', ')[12]),
                y: parseFloat(mat[1].split(', ')[13]),
                scaleX,
                scaleY,
            }
        }

        mat = transform.match(/^matrix\((.+)\)$/)
        const scaleX = mat ? parseFloat(mat[1].split(', ')[0]) : 1
        const scaleY = mat ? parseFloat(mat[1].split(', ')[3]) : 1
        return {
            x: mat ? parseFloat(mat[1].split(', ')[4]) : 0,
            y: mat ? parseFloat(mat[1].split(', ')[5]) : 0,
            scaleX,
            scaleY,
        }
    }

    updateAreaLocation(eventCoords: {
        pageX: number
        pageY: number
        clientX: number
        clientY: number
    }): void {
        const areaRadius = this.diameter / 2
        // See article with explanation at: https://www.kirupa.com/html5/get_element_position_using_javascript.htm
        let x = 0
        let y = 0
        let el = this.refElement.current as HTMLElement
        let transformXY = this.getComputedTransformXY(el)
        while (el) {
            if (el.tagName.toUpperCase() === 'BODY') {
                // deal with browser quirks with body/window/document and page scroll
                const xScroll =
                    el.scrollLeft || document.documentElement.scrollLeft
                const yScroll =
                    el.scrollTop || document.documentElement.scrollTop

                x += el.offsetLeft - xScroll + el.clientLeft
                y += el.offsetTop - yScroll + el.clientTop
            } else {
                // for all other non-BODY elements
                x += el.offsetLeft - el.scrollLeft + el.clientLeft
                y += el.offsetTop - el.scrollTop + el.clientTop
            }
            x += transformXY.x
            y += transformXY.y
            el = el.offsetParent as HTMLElement
            transformXY = this.getComputedTransformXY(el)
        }

        this._locationX = x + areaRadius
        this._locationY = y + areaRadius

        this._locationX += eventCoords.pageX - eventCoords.clientX
        this._locationY += eventCoords.pageY - eventCoords.clientY
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
        const { pageX, pageY, clientX, clientY } = event
        this.updateAreaLocation({ pageX, pageY, clientX, clientY })
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
        this.addWindowEventListeners('touch')
        if ('changedTouches' in event && event.changedTouches.length === 1) {
            const { pageX, pageY, clientX, clientY } = event.changedTouches[0]
            this.updateAreaLocation({ pageX, pageY, clientX, clientY })
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
