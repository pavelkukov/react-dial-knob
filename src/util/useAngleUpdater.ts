import { useState, useRef, useEffect } from 'react'

export default function useAngleUpdater(
    currentValue: number,
): [number, (number) => void] {
    const angleRef = useRef(0)
    const setAngleRef = (angleVal: number): void => {
        angleRef.current = angleVal
    }
    const [angle, setAngle] = useState(0)
    useEffect(() => {
        setAngle(angleRef.current)
    }, [angleRef.current, currentValue])
    return [angle, setAngleRef]
}
