import User from '../models/user'
import catchAsync from '../middlewares/catchAsyncErrors'

/* GET
------- Get all Users => /api/users -------
*/ 

export const getAllUsers =  catchAsync(async (req,res) => {


    let users = await User.find()


    res.status(200).json({
        success: true,
        users
    })
        
})



/* POST
------- Register user => /api/users -------
*/ 

export const registerUser =  catchAsync(async (req,res) => {

    const user = await User.create(req.body)

    res.status(200).json({
        success: true,
        user
    })
        

})
