/**
 * Initialization the instance of EasyDraw
 */
import C from './common'

console.log(C)

class EasyDraw {

    constructor(){
        if(arguments.length!==2)return console.error('Parameter not valid');
        if(typeof arguments[0] !== 'string')return console.error('CanvasID must be string');

        const canvasID = arguments[0],
              opts = typeof arguments[1] === 'object' ? arguments[1] : null;

        this.opts = opts;

        // Zoom configuration
        this.config = {
            zoomMin: opts.zoomMin || 0.2,
            zoomMax: opts.zoomMax || 4.0,
            zoomStep: opts.zoomStep || 0.2
        };

        // Default color
        this.colors = {
            primary: opts.primaryColor || '#000',
            secondary: opts.secondaryColor || '#fff',
            background: opts.backgroundColor || 'transparent'
        };

        // Watermark
        this.watermarkImage = opts.watermarkImage;
        this.watermarkScale = opts.watermarkScale || 1;

        // Wechat canvas context
        this.context = wx.createCanvasContext(canvasID);

        // Another configuration
        this.backingScale = 1; // Dependence util.getBackingScale has not been supported in wechat runtime
        this.backgroundShapes = opts.backgroundShapes || [];
        this._shapesInProgress = [];
        this.shapes = [];

        // Undo and redo stack
        this.undoStack = [];
        this.redoStack = [];

        this.isDragging = false;
        this.position = {
            x: 0,
            y: 0
        };
        this.scale = 1.0;

        // this.setTool(new this.opts.tools[0](this));
    }

    init(){
        
    }

}

export default EasyDraw