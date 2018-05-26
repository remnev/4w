'use strict';

const path = require('path');
const glob = require('glob');
const controllers = {};

glob.sync(path.join(__dirname, 'lib/*.js')).forEach(function(pathToController) {
    const id = pathToController.match(/.*\/(.+).js$/)[1];

    controllers[id] = require(pathToController);
});

module.exports = controllers;
