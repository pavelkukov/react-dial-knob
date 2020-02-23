import { withKnobs } from '@storybook/addon-knobs'
import { skinBasic as Basic } from './skins/Basic'
import { skinHighContrast as HighContrast } from './skins/HighContrast'
import { skinWhite as White } from './skins/White'
import { skinSilver as Silver } from './skins/Silver'
import { skinDonut as Donut } from './skins/Donut'

export default {
    title: 'Knob/Skins',
    decorators: [withKnobs],
}

export { Basic, White, Silver, Donut, HighContrast }
