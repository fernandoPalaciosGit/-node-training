'use strict';

var _ = require('lodash'),
    Mustache = require('mustache'),
    exec = require('child_process').exec,
    express = require('express'),
    morgan = require('morgan'),
    viewAge = {
        name: 'nando',
        age: function () {
            return (new Date('11-12-1985')).toDateString();
        }
    },
    list = _.range(5, 30, 5),
    output,
    serverApp = express();

// MODULE UNDERSCORE
output = _.chain(list).reduce(function (memo, val, index) {
    return _.join([memo, index + '-->' + val], ' - ');
}, '').trimStart(' - ').value();
console.log(output);

// MODULE MUSTACHE
output = Mustache.render('{{name}} is from {{age}}', viewAge);
console.log(output);

// MODULE CHILD_PROCESS (node core), COFFEE SCRIPT
exec('coffee --output out --compile modules/logs.coffee', function(error) {
    if (error === null) {
        output = require('./../out/logs')();
        console.log(output);

    } else {
        console.error(error);
    }
});

//MODULE MORGAN // npm info morgan versions
serverApp.use(morgan('combined'));

//MODULE EXPRESS
serverApp.get('/', function (req, res) {
    res.send(output);
});
serverApp.listen(2828, _.bind(console.log, console, 'http://127.0.0.1:2828/'));