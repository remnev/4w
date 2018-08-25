'use strict';

require('dotenv').config();

const {SBER_API_TOKEN} = process.env;

module.exports = function env(req, res, next) {
    res.locals.env = {SBER_API_TOKEN};

    next();
};
