/**
 * You can't emit an event from the constructor immediately because the script will not have processed to the point
 * where the user assigns a callback to that event.
 * So, within the constructor itself,
 * you can use process.nextTick() to set a callback to emit the event after the constructor has finished
 */
'use strict';

let EventEmitter = require('events');

class MyEvent extends EventEmitter {
    constructor(val) {
        super();
        this.val = val;
        this.emitOnFinishInstance();
    }

    emitOnFinishInstance() {
        process.nextTick(() => this.emit('event', {data: this.val}));
    }
}

let myEvent = new MyEvent('event');

myEvent.on('event', console.info);