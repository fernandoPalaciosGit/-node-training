'use strict';

var http = require('http'), greetCallback,
    greetMessage = 'I\'m programming in NodeJs',
    HOST = global.process.env.HOST || '127.0.0.1',
    PORT = global.process.env.PORT || '2828';

greetCallback = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(greetMessage);
};

http.createServer(greetCallback).listen(PORT, HOST);

console.log([HOST, PORT].join(':'));
