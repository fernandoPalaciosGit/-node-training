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

