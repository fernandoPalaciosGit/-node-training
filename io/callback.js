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

/**
 * each node program executes on a single threat, even all of the its callback events that solve concurrent program features
 */

/**
 * single thread blocking code. Sync process
 */
function sleep(mill) {
    let start = new Date().getTime();

    while ((new Date().getTime() - start) < mill) {
    }
}

function fetchPage() {
    console.info('fetch page');
    sleep(2000); // simulate time left to catch web page data
    console.info('returned from request page');
}

function fetchApi() {
    console.info('fetch api');
    sleep(2000); // simulate time left to retrieve vendor program data
    console.info('returned from Api');
}

fetchPage();
fetchApi();

/**
 * single thread non blocking code. Async process
 * fetchpage/api has even the same time execution, non blockin of its response. That is callback responsability.
 */
function fetchPageAsync() {
    console.log('fetching page');
    http.get({host: 'trafficjamapp.herokuapp.com', path: '/?delay=2000'}, function (res) {
        console.log('data returned from requesting page');
    }).on('error', function (e) {
        console.log("There was an error" + e);
    });
}

function fetchApiAsync() {
    console.log('fetching api');
    http.get({host: 'trafficjamapp.herokuapp.com', path: '/?delay=2000'}, function (res) {
        console.log('data returned from the api');
    }).on('error', function (e) {
        console.log("There was an error" + e);
    });
}

fetchPageAsync();
fetchApiAsync();
