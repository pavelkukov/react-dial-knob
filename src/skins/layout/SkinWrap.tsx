import React from 'react'

interface SkinWrapProps {
    children: React.ReactNode
    style?: React.CSSProperties
}

export default function SkinWrap(props: SkinWrapProps): JSX.Element {
    const defaultStyle = {
        position: 'relative' as 'relative',
        outline: 'none',
        boxSizing: 'border-box' as 'border-box',
    }
    const userStyle = props.style || {}
    const activeStyle = { ...defaultStyle, ...userStyle }
    return <div style={activeStyle}>{props.children}</div>
}
