module.exports = {
    preset: 'ts-jest',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: './coverage/',
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    testRegex: '/src/.*?\\.(test|spec)\\.[jt]sx?$',
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            babelConfig: false,
            tsConfig: 'tsconfig.test.json',
        },
    },
}
