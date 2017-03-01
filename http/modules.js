'use strict';

let Http = require('http');
let _ = require('lodash');
let url = require('url');
let fs = require('fs');
const SERVER = {
    host: '127.0.0.1',
    port: 3000
};
const FILE_PATH = './package.json';
const ROUTES = {
    json: '/json',
    root: '/',
    gist: '/gist',
    github: '/github'
};

// UTILS
function hasPathName(request, path) {
    return _.includes(path, url.parse(request.url).pathname);
}

// HTTP SERVER (engine to serve an application resources)
let httpServer = Http.createServer(handlerServer);

function handlerServer(request, response) {
    request
        .on('data', _.noop)
        .on('error', console.error)
        .on('end', _.partial(root, request, response))
        .on('end', _.partial(gist, request, response))
        .on('end', _.partial(json, request, response))
        .on('end', _.partial(github, request, response))
        .on('end', _.partial(unknown, request, response));
    response.on('error', console.error)
}

httpServer.listen(SERVER.port, SERVER.host);

// HTTP ROUTES (define uri's to locate the resources)
function json(request, response) {
    if (hasPathName(request, ROUTES.json)) {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        fs.readFile(FILE_PATH, 'utf8', function (err, data) {
            if (err) {
                unknown(request, response);

            } else {
                response.end(JSON.parse(JSON.stringify(data)));
            }
        });
    }
}

function root(request, response) {
    if (hasPathName(request, ROUTES.root)) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(`
            <h1>Hello from ${process.title} server ${process.version}</h1>
        `);
    }
}

function gist(request, response) {
    if (hasPathName(request, ROUTES.gist)) {
        response.writeHead(301, {
            'Location': 'https://gist.github.com/fernandoPalaciosGit/04e5726e6233d3742aa4'
        });
        response.end();
    }
}

function github (request, response) {
    if (hasPathName(request, ROUTES.github)) {
        getDataFromGithub();
    }
}

function unknown(request, response) {
    if (!hasPathName(request, _.values(ROUTES))) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.end('Page not found!');
    }
}

// HTTP CLIENT (definition of something to request or something to specs a response)
function getDataFromGithub () {
    let client = {
        host: 'github.com',
        port: '80',
        path: '/'
    };
    Http.get(client, function (response) {
        if (response.statusCode < 400) {
            console.log(`GET status ${response.statusCode}: ${JSON.stringify(response.headers)}`);

        } else {
            throw new Error(`${response.statusCode}: Unable to GET ${client.host}:${client.port}${client.path}`);
        }

    }).on('error', console.error);
}
