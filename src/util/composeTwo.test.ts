import composeTwo from './composeTwo'

describe('composeTwo', () => {
    it('Should combine two callbacks', () => {
        const callback1 = jest.fn()
        const callback2 = jest.fn()
        const composed = composeTwo(callback1, callback2)
        composed(21)
        expect(callback1).toHaveBeenCalledWith(21)
        expect(callback2).toHaveBeenCalledWith(21)
    })

    it('Second argument is optional', () => {
        const callback1 = jest.fn()
        const composed = composeTwo(callback1, undefined)
        composed(21)
        expect(callback1).toHaveBeenCalledWith(21)
    })
})
