'use strict';

const path = require('path');
const glob = require('glob');
const middlewares = {};

glob.sync(path.join(__dirname, 'lib/*.js')).forEach((pathToController) => {
    const id = pathToController.match(/.*\/(.+).js$/)[1];

    middlewares[id] = require(pathToController);
});

module.exports = middlewares;
