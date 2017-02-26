'use strict';

let EventEmitter = require('events');
let _ = require('lodash');


class myEmitter extends EventEmitter {
}

// para evitar que la aplicacion crashee y manejar el evento de error desde donde se publico, se utiliza 'uncaughtExeption'
let catchEmitter = new myEmitter();

catchEmitter.on('test-event', function (data) {
    if (_.isEmpty(data)) {
        this.emit('error', new Error('whoops data is empty'));
    }
});

// Bad practice
process.on('uncaughtException', function (err) {
    console.error('Process caught: ', err);
});

// Best practice, and process.on('uncaughtException') was blocked
catchEmitter.on('error', function (err) {
    console.error('instance EventEmitter caught: ', err);
});

// you could catch multiple subscriptions error
catchEmitter.on('error', function (err) {
    console.error('instance EventEmitter caught another: ', err);
});

catchEmitter.emit('test-event', {});
