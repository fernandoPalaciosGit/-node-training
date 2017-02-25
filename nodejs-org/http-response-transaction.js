'use strict';

let Http = require('http');

// response inherits WritableStream
let httpClient = Http.createServer(function (request, response) {
    request.on('end', function () {
        console.info(`http respose default status code: ${response.statusCode}`);

        //implicit writings header of body response, before you start sending body data.
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('X-Powered-By', 'bacon');

        // explicit writings header, write the headers to the response stream
        response.writeHead(404, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'bacon'
        });

        // take care possibility of crash apoplication
        response.on('error', function (err) {
            console.error(err.stack);
        });

        // SENDING
        response.write(`
            <html>
            <head></head>
            <body>
                <h1>Hello World!</h1>
            </body>
            </html>
        `);
        response.end(`<meta content='last bit of data'/>`);
    });
});

// activate the server
httpClient.listen(8080);