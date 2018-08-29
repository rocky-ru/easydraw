
class EventManager {
    constructor(){
        this.listeners = {}
    }

    on(eventType, fn){
        if(eventType == null || typeof eventType !== 'string') return;
        if (this.listeners[eventType] === undefined) {
            this.listeners[eventType] = [];
        }

        this.listeners[eventType].push(fn);
    }

    off(eventType){
        if(eventType == null || typeof eventType !== 'string') return;
        if(Object.prototype.hasOwnProperty.call(this.listeners, eventType)){
            delete this.listeners[eventType];
        }
    }

    emit(event){
        if(event.type == null || typeof event.type !== 'string') return;
        for(let fn in this.listeners[event.type]){
            if (this.listeners[event.type].hasOwnProperty(fn)) {
                this.listeners[event.type][fn](event);
            }
        }
    }
}

export default EventManager;