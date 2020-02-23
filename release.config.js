module.exports = {
    branches: ['master', 'next'],
    plugins: [
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'angular',
                parserOpts: {
                    noteKeywords: [
                        'BREAKING CHANGE',
                        'BREAKING CHANGES',
                        'BREAKING',
                    ],
                },
                writerOpts: {
                    commitsSort: ['subject', 'scope'],
                },
            },
        ],
        [
            '@semantic-release/github',
            {
                assets: [
                    ['dist'],
                    {
                        path: 'build/react-dial-knob.zip',
                        label: 'react-dial-knob',
                    },
                ],
            },
        ],
        '@semantic-release/npm',
    ],
}
