const { errorCodes, generateErrorResponse } = require('../utils/errorCodes');

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    res.status(status).send(generateErrorResponse(errorCodes.GENERAL_ERROR, err.message));
};

module.exports = errorHandler;
