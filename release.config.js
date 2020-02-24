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
                assets: [{ path: '*.tgz', label: 'react-dial-knob' }],
            },
        ],
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                assets: ['stats.html', 'package.json'],
                message:
                    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
}
