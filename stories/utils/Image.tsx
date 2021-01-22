import React from 'react'
import DonutGif from '../../docs/images/donut-konb-180.gif'
import DonutGif48 from '../../docs/images/donut-konb-48.gif'
import Scripting from '../../docs/images/scripting-only.png'
import Scripting2021 from '../../docs/images/scripting-only-2021.png'

const imagesMap = {
    '/docs/images/donut-konb-180.gif': DonutGif,
    '/docs/images/scripting-only.png': Scripting,
    '/docs/images/scripting-only-2021.png': Scripting2021,
    '/docs/images/donut-konb-48.gif': DonutGif48,
}

interface ImageProps {
    src: string
    alt?: string
}

export default function Image(props: ImageProps): JSX.Element {
    const src = imagesMap[props.src] ? imagesMap[props.src] : props.src
    return <img src={src} alt={props.alt} />
}
