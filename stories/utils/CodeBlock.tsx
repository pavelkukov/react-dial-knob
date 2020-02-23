import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Collapsible from 'react-collapsible'

interface CodeBlockProps {
    value: string
    language?: string
}

export default function CodeBlock(props: CodeBlockProps): JSX.Element {
    const language = props.language || 'typescript'
    return (
        <Collapsible
            open={true}
            trigger={`> (${language}) expand/collapse`}
            triggerStyle={{
                backgroundColor: '#1ea7fd',
                color: 'floralwhite',
                display: 'block',
                padding: '5px',
                cursor: 'pointer',
                fontSize: '0.8em',
            }}
        >
            <style type={'text/css'}>{`
            .Collapsible__contentOuter {
                background-color: aliceblue;
                padding: 0 10px;
            }
        `}</style>
            <SyntaxHighlighter language={language} style={docco}>
                {props.value}
            </SyntaxHighlighter>
        </Collapsible>
    )
}
