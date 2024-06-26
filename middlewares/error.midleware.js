const debug = require("debug")("app:error");

const errorHandler = (error, req, res, next) => {
    debug(error)

    return res
        .status(error.status || 500)
        .json({ status: error.status, message: error.message })
}

module.exports = { errorHandler }