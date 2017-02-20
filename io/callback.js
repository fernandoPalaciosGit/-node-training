'use strict';

/*
node utiliza los callbacks para resolver el modelo de IO (las interfaces que permiten resolver el modelo de concurrencia)
*/

let fs = require('fs');

fs.readFile('./data/callback-test.txt', 'utf-8', function (err, data) {
    if (err) throw err;
    console.info(data);
});
