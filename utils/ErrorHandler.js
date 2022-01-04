// Extends the error class to allow for a custom status code and message

class ErrorHandler extends Error {
    constructor(message, status){
        super(message)
        this.statusCode = status
        this.message = message

        // this creates a .stack property on the error that shows line number
        Error.captureStackTrace(this, this.constructor);
    }


}


export default ErrorHandler;