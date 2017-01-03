'use strict';

var http = require('http'),
    _ = require('lodash'),
    webPages = ['shapeshed.com', 'www.bbc.co.uk', 'www.github.com'],
    fetchPages;

fetchPages = function (page) {
    var start = _.now();

    /**
     * la respuesta de salida de esta peticion es impredecible y cambia dependiendo de los factores del servicio de nuestro recurso.
     * (en este caso de las tecnologias web del servidor y la red por la que atraviesa, al ser peticiones GET)
     * nos demuestra dos cosas: el sistema no bloqueante de I/O de node (funcionamiento de procesos a traves de una cola de eventos),
     * los tiempos de respuesta no son constante.
     *
     */
    http.get({host: page}, function (res) {
        console.log(_.join([
            'Request to', res.headers.location, 'took:',
            (_.now() - start) / 1000, 'seconds'
        ], ' '));
    });
};

_.each(webPages, fetchPages);