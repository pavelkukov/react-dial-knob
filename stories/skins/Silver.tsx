import wrapSkinComponent from '../utils/wrapSkinComponent'

import { Silver } from '../../src'
import SilverDocs from '../../docs/skins/Silver.md'

export const skinSilver = wrapSkinComponent(Silver)

skinSilver.story = {
    parameters: {
        notes: { docs: SilverDocs },
        options: { showPanel: true },
    },
}
