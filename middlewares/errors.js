import ErrorHandler from "../utils/errorHandler";

export default (err, req, res, next) => {
    // if no status code exists something went wrong internally
    err.statusCode = err.statusCode || 500

    // Handle Mongoose ID Error
    if(err.name === 'CastError'){
        const message = `Resource not found invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // Handle Validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        err,
        message: err.message,
        stack: err.stack
    })
} 