let tools = {};

const hasProp = {}.hasOwnProperty;

class Tool {
    constructor(){
        this.name = null;
        this.iconName = null;
        this.usesSimpleAPI = true;
        this.optionsStyle = null;
    }

    begin(x, y, lc) {}
    continue(x, y, lc) {}
    end(x, y, lc) {}
    didBecomeActive(lc) {}
    willBecomeInactive(lc) {}
}

class ToolWithStroke extends Tool {
    constructor(lc) {
        super();
        this.strokeWidth = lc.opts.defaultStrokeWidth;
    }

    didBecomeActive(lc) {
        let unsubscribeFuncs = [];

        this.unsubscribe = ((_this => () => {
        let results = [];
        for (let i = 0, len = unsubscribeFuncs.length; i < len; i++) {
            let func = unsubscribeFuncs[i];
            results.push(func());
        }
        return results;
        }))(this);

        return unsubscribeFuncs.push(lc.on('setStrokeWidth', ((_this => strokeWidth => {
        _this.strokeWidth = strokeWidth;
        return lc.trigger('toolDidUpdateOptions');
        }))(this)));
    }

    willBecomeInactive(lc) {
        return this.unsubscribe();
    }
}

export default tools={Tool, ToolWithStroke};