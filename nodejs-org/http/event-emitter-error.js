'use strict';

let EventEmitter = require('events');
let _ = require('lodash');


class myEmitter extends EventEmitter {
}

const emitterError = new myEmitter();

// cuando un error ocurre en el callback de subscripcion de un evento, lo comun es que se propague un error
// si no hay suscripcion de evento 'error', la aplicacion de Nodejs se rompera e imprimira la traza por consola
emitterError.on('test-event', function (data) {
    if (_.isEmpty(data)) {
        this.emit('error', new Error('whoops, data is Empty'));
    }
});

emitterError.emit('test-event', {});
