/* - el core de nodejs, utiliza para sus tareas de I/O, el frameworkm de Libuv
 * Libuv: tareas de I/O con el disco del sistema (herramientas de persistencia), y soporte para redes (conexiones http, sockets...)
 * - el motor de eventloop no puede continuar ejecutando el programa hasta que una operacion bloqueante noi halla finalizado,
 * - bloqueante NO significa que la operacion del programa tenga un mal performance, que provoque resolver la ejecucion un periodo considerable
 * porque un operacion asyncrona (no bloqueante) tambien puede requerir de tiempo
 * la libreria de Libuv provee metodos sincronos para las operaciones de I/O (bloqueantes)
 * Y nodeJS las extiuende en su version asyncrona para la mismma operacion (no bloqueantes)
 * - operaciones I/O asincronas --> no bloqueantes --> aceptan callbacks como retrollamadas --> no paralizan el motor de Event Loop
 */

'use strict';

const fs = require('fs');
const FILE = './package.json';
let timer = new Date().getTime();

// BLOCKING
let readDataSync = fs.readFileSync(FILE);
console.log(`IO readFileSync Time left: ${new Date().getTime() - timer} ms`);

// NON BLOCKING
timer = new Date().getTime();
let readDataAsync = fs.readFile(FILE, function (err, data) {
    if (err) throw err;
});
console.log(`IO readFile Time left: ${new Date().getTime() - timer} ms`);


/**
 * CONCIRRENCIA Y PERFORMANCE
 * en nodejs las cada programa se ejecuta en un unico hilo de procesos (virtualizado)
 * cuando hablamos de Concurrencia en Nodejs, se refiere a la capacidad del motor de Event loop a ejecutar los callbacks una vez se resuelve la llamada.
 * Event Loop soluciona la concurrencia de las operaciones I/O bloqueanrtes, a traves de la suscripcion de eventos y cola de callbacks en un modelo asyncrono de llamadas.
 */