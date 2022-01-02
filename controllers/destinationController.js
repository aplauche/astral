import Destination from "../models/destination";


/* GET
------- Get all destinations => /api/destinations -------
*/ 

export const getAllDestinations = async (req,res) => {
    try {
        const destinations = await Destination.find()

        res.status(200).json({
            success: true,
            destinations
        })
        
    } catch (error) {
        console.log(error);
    }
}


/* POST
------- Create destination => /api/destinations -------
*/ 

export const createDestination = async (req,res) => {
    try {

        const destination = await Destination.create(req.body)

        res.status(200).json({
            success: true,
            destination
        })
        
    } catch (error) {
        console.log(error);
    }
}