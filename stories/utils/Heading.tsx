import { createElement } from 'react'

interface HeadingProps {
    level: string
    children: JSX.Element
}

export default function Heading(props: HeadingProps): JSX.Element {
    return createElement(
        `h${props.level}`,
        {
            id:props.children[0].props.value &&
                props.children[0].props.value
                    .replace(/\s/gi, '-')
                    .toLowerCase(),
        },
        props.children,
    )
}
