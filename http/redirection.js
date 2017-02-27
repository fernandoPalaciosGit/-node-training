'use strict';

let HttpClient = require('http');
let _ = require('lodash');
let httpClient = HttpClient.createServer(handlerServer);

function handlerServer(request, response) {
    request
        .on('data', _.noop)
        .on('error', console.error)
        .on('end', _.partial(redirect, request, response));
    response.on('error', console.error)
}

function redirect (request, response) {
    response.writeHead(301, {
        'Location': 'https://gist.github.com/fernandoPalaciosGit/04e5726e6233d3742aa4'
    });
    response.end();
}

httpClient.listen(3000, '127.0.0.1');