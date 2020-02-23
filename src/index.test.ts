import * as KnobExports from './index'
import Knob from './Knob'

describe('index exports', () => {
    it('Should have exported all skins and `Knob` as default', () => {
        expect(Object.keys(KnobExports).sort()).toEqual(
            [
                'Basic',
                'HighContrast',
                'White',
                'Silver',
                'Donut',
                'SkinWrap',
                'composeTwo',
                'default',
            ].sort(),
        )
        expect(KnobExports.default).toStrictEqual(Knob)
    })
})
