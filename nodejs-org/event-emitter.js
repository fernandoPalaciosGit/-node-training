// la architectura de la mayoria de componentes en el core de Node esta resuelta a traves de un manejador de eventos de ejecuciuones asincronas.
// (Emitters) tenemos los emiters, donde suscriben los callbacks de eventos que resuelven las ejecuciones blñoqueantes/asincronas

// el objeto Server del package net, emite un evento cada vez que lanza una peticion http
// el objetp ReadStream del package fs, emite un evento cuando el archivo se abre
// el objeto stream emite un evento cada vez que un dato esta listo para la lectura

// Todos estos objectos, que permiten emitir eventos (para resolver sus procesos), son instancias del EventEmitter

// cuando una instancia de una clase de tipo EventEmitter emite un evento, todas las funciones que se han suscrito a ese evento
//se ejecutan de manera "sincrona" en orden en que se suscribieron

// la referencia del contexto en el callback que se asigna a la suscripcion del evento, es el objeto de emite el evento

// una vez que se emiten los eventos, los callbacks registrados se ejecutan de manara "sincrona" en el orden en elk que han sido asignados al evento
// setImmediate() ->>> esto se puede modificar para que el callback suscrito se ejecute asincronamente (por ejemplo si el proceso es bloqueante o lento)

// once --> se puede limitar la suscripcino a la publicacion de un evento

'use strict';

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

let myEmitter = new MyEmitter();

myEmitter.on('custom-event', function (data) {
    console.info(data);
});

myEmitter.on('custom-event-context', function (a, b) {
    console.info(a, b, this);
});

myEmitter.on('custom-event-blocking-async', function () {
    setImmediate(() => {
        console.info('se ejecutara asincronamente');
    });
});

let count = 0;
myEmitter.once('custom-event-once', function () {
    console.info('count: ', ++count);
});

myEmitter.emit('custom-event-blocking-async'); // la suscripcion de callbacks para la publicacion de este evento, NO sera sincrona
myEmitter.emit('custom-event', {data: 'test'});
myEmitter.emit('custom-event-context', 'data-a', 'data-b');
myEmitter.emit('custom-event-once');
myEmitter.emit('custom-event-once');
myEmitter.emit('custom-event-once');