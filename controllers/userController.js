import User from '../models/user'

/* GET
------- Get all Users => /api/users -------
*/ 

export const getAllUsers = async (req,res) => {
    try {

        let users = await User.find()


        res.status(200).json({
            success: true,
            users
        })
        
    } catch (error) {
        console.log(error);
    }
}



/* POST
------- Register user => /api/users -------
*/ 

export const registerUser = async (req,res) => {
    try {

        const user = await User.create(req.body)

        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        console.log(error);
    }
}
