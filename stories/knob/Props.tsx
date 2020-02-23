import React from 'react'
import ReactMakdown from 'react-markdown'

import KnobProps from '../../docs/KnobProps.md'
import CodeBlock from '../utils/CodeBlock'
import Heading from '../utils/Heading'

export default function Props(): JSX.Element {
    return (
        <ReactMakdown
            source={KnobProps}
            renderers={{
                code: CodeBlock,
                heading: Heading,
            }}
        />
    )
}

Props.story = {
    parameters: {
        notes: { disabled: true },
        knobs: { disabled: true },
        options: { showPanel: false },
    },
}
