import React from 'react'
import ReactMakdown from 'react-markdown'

import KnobReadMe from '../../docs/KnobCreateSkin.md'
import CodeBlock from '../utils/CodeBlock'
import Heading from '../utils/Heading'

export default function CreateSkin(): JSX.Element {
    return (
        <ReactMakdown
            source={KnobReadMe}
            renderers={{
                code: CodeBlock,
                heading: Heading,
            }}
        />
    )
}

CreateSkin.story = {
    parameters: {
        notes: { disabled: true },
        knobs: { disabled: true },
        options: { showPanel: false },
    },
}
