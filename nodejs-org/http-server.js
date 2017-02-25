'use strict';

let Server = require('http');
let _ = require('lodash');
let client = Server.createServer(serverClient);

function serverClient(request, response) {
    let body = [];

    request
        .on('data', (chunk) => data.push(chunk))
        .on('error', _.partialRight(handleError, response))
        .on('end', _.partial(getJson, body, request, response))
        .on('end', _.partial(responseGreeting, request, response));

    response.on('error', _.partialRight(handleError, response))
}

function handleError(err, response) {
    console.error(err.stack);
    response.statusCode = 404;
    response.end();
}

function responseJson(body, request, response) {
    body = Buffer.concat(body).toString();
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'nodeJs'
    });
    response.end(JSON.stringify({
        headers: request.headers,
        method: request.method,
        url: request.url,
        body: body
    }));
}

function responseGreeting(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(`
        <html>
        <head></head>
        <body>
            <h1>Hello from Node</h1>
        </body>
        </html>
    `);
}

function getJson(body, request, response) {
    if (request.method === 'GET' && request.url === '/json') {
        responseJson.apply(this, arguments);
    }
}

client.listen(8080);