import React from 'react'
import ReactMakdown from 'react-markdown'

import CodeBlock from './utils/CodeBlock'
import Heading from './utils/Heading'
import Image from './utils/Image'

import ReadMeText from '../README.md'

export default {
    title: 'Knob/Read Me',
}

export function README(): JSX.Element {
    return (
        <ReactMakdown
            source={ReadMeText}
            renderers={{
                code: CodeBlock,
                heading: Heading,
                image: Image,
            }}
        />
    )
}

README.story = {
    parameters: {
        notes: { disabled: true },
        knobs: { disabled: true },
        options: { showPanel: false },
    },
}
