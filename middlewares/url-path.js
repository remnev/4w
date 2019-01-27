'use strict';

module.exports = function urlPathMuddleware() {
    return (req, res, next) => {
        res.locals.urlPath = req.path;

        next();
    };
}
