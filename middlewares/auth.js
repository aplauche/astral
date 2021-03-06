import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import {getSession} from 'next-auth/react'

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const session = await getSession({ req });

    if (!session) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    req.user = session.user;
    next();

})

export const isAdmin = catchAsyncErrors(async (req,res,next)=> {

    if (req.user.role !== 'admin') {
        return next(new ErrorHandler('Only Admins can access this resource', 401));
    }

    next();
})