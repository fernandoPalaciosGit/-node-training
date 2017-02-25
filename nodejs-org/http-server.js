'use strict';

let Server = require('http');

let client = Server.createServer(function (request, response) {
    let body = [];

    request
        .on('data', (chunk) => data.push(chunk))
        .on('error', (err) => console.log(err.stack))
        .on('end', function () {
            body = Buffer.concat(body).toString();
            response.on('error', (err) => console.log(err.stack));
            response.writeHead(303, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'bacon'
            });
            response.end(JSON.stringify({
                headers: request.headers,
                method: request.method,
                url: request.url,
                body: body
            }));
        });
});

client.listen(8080);