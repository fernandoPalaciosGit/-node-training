'use strict';

/**
 * node use callbacks to solve IO model (all the interfaces that allow solve concurrent IO model)
 */

let fs = require('fs');

fs.readFile('./data/callback-test.txt', 'utf-8', function (err, data) {
    if (err) throw err;
    console.info(data);
});

/**
 * Callback that resolves the http module
 * in this situation we are not able to predicit the order of the response on each script execution
 */
let http = require('http');

http.get({host: 'shapeshed.com'}, function (res) {
    console.info(`Get code response fom shapeshed: ${res.statusCode}`);

}).on('error', console.error);

http.get({host: 'unknouwn.not'}, console.info)
    .on('error', function (err) {
        console.error(`Got error: ${err.message}`);
    });