'use strict';

let Http = require('http');

// request inherits ReadableStream
let httpClient = Http.createServer(function (request, response) {
    console.info(`
        [method] ${request.method}
        [url] ${request.url}
        [node parse all headers name in lowercase] ${request.headers['user-agent']}
        [raw format (as the client send it)] ${request.rawHeaders}
        [headers] ${request.headers}
    `);


    // most important manage on http transactions are PUT nad POST requests
    // request inherits ReadableStream (could be listened or piped)
    // listening streams Buffer: 'data', 'end'
    let dataRequest = [];

    request.on('data', function (chunk) {
        dataRequest.push(chunk);

    }).on('end', function () {
        dataRequest = Buffer.concat(dataRequest).toString();
        console.info('[Entire request] ', dataRequest);

    // IMP : handle error from reading stream request chunks, otherwise the application will be broken
    // You should therefore add an 'error' listener on your request streams, even if you just log it and continue on your way.
    }).on('error', function (err) {
        console.error(err.stack);
    });
});

// activate the server
httpClient.listen(8080);