import canvasRenderer from './core/canvasRenderer'
import defaultOption from './core/defaultOption'
import LiterallyCanvas from './core/LiterallyCanvas'
import svgRenderer from './core/svgRenderer'
import shapes from './core/shapes'
import util from './core/util'
import renderSnapshotToImage from './core/renderSnapshotToImage'
import C from './core/common'

export default {
    canvasRenderer,
    defaultOption,
    LiterallyCanvas,
    eventManager: C.em
}