'use strict';

let Http = require('http');

// response inherits WritableStream
let httpClient = Http.createServer(function (request, response) {

});

// activate the server
httpClient.listen(8080);