import React from 'react'

interface ErrorAreaProps {
    error: Error
    diameter: number
    children?: React.ReactNode
}

export default function KnobErrorWrap(props: ErrorAreaProps): JSX.Element {
    console && console.error(props.error)

    return (
        <div
            style={{
                width: `${props.diameter}px`,
                height: `${props.diameter}px`,
                borderRadius: `${props.diameter / 2}px`,
                position: 'relative' as const,
                outline: 'none',
                boxSizing: 'border-box' as const,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: 'red',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: 999,
                    paddingTop: 'calc(50% - 0.5em)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    pointerEvents: 'none',
                }}
            >
                💣
            </div>
            {props.children}
        </div>
    )
}
