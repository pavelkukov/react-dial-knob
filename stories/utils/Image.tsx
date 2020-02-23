import React from 'react'
import DonutGif from '../../docs/images/donut-konb-180.gif'
import Scripting from '../../docs/images/scripting-only.png'

const imagesMap = {
    '/docs/images/donut-konb-180.gif': DonutGif,
    '/docs/images/scripting-only.png': Scripting,
}

interface ImageProps {
    src: string
    alt?: string
}

export default function Image(props: ImageProps): JSX.Element {
    const src = imagesMap[props.src] ? imagesMap[props.src] : props.src
    return <img src={src} alt={props.alt} />
}
