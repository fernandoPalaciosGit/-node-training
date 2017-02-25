'use strict';

let EventEmitter = require('events');
let _ = require('lodash');

class MyEmitter extends EventEmitter {
}

let myEmitter = new MyEmitter();

// cuando se publica un error -> process
process.on('uncaughtException', function (err) {
    console.error('Error: ', err);
});

//todo: myEmitter.emit('error', new Error('Whoooops'));

// cuando una instancia de EventEmitter subscribe un evento (newListener)
// cuando una instancia de EventEmitter elimina la subscripcion de un evento (removeListener)
// se suele cubscribir una unica vez

myEmitter.once('newListener', function (event, listener) {
    this.on(event, _.partial(console.log, 'newListener subscription: ', event));
});

myEmitter.on('test-event', function () {
    console.info('test-event subscription');
});

myEmitter.emit('test-event', {});
myEmitter.emit('test-event', {message: 'hello'});

myEmitter.once('removeListener', function (event, listener) {
    console.log('Listener removed: ', event);
});

myEmitter.removeAllListeners('test-event');
// this will never be catched
myEmitter.emit('test-event', {message: 'could not subscribe'});


// limit of 10 listeners could be subscribe on a single event
console.log('Max Event listeners allowed: ', myEmitter.getMaxListeners());
myEmitter.setMaxListeners(2);

_.each(_.range(15), function (index) {
    let eventName = `event-${++index}`;

    console.info('subscription: ', eventName);
    myEmitter.on(eventName, _.partial(console.info, 'published'));
});

myEmitter.emit('event-14', {event: 'event-14'});
myEmitter.emit('event-15', {event: 'event-15'});

// registered event names
myEmitter.on(Symbol('event-symbol'), _.noop);
//console.info('events subscribed to myEmitter: ', myEmitter.eventNames());

// return number of listeners of one subscription event
console.info('number of listeners: ', myEmitter.listenerCount('test-event')); // we had removing upper

myEmitter.on('event-13', _.partial(console.info, 'published'));
console.info('number of listeners: ', myEmitter.listenerCount('event-13'));