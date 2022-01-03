import Destination from "../models/destination";


/* GET
------- Get all destinations => /api/destinations -------
*/ 

export const getAllDestinations = async (req,res) => {
    try {

        let destinations;

        if(req.query.sign){
            
             destinations = await Destination.find({
                signs: req.query.sign
            })

        } else {
             destinations = await Destination.find()
        }

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


/* GET
------- Get destination by ID => /api/destinations/:id -------
*/ 

export const getDestinationById = async (req,res) => {
    try {

        let destination = await Destination.findById(req.query.id)

        res.status(200).json({
            success: true,
            destination
        })
        
    } catch (error) {
        console.log(error);
    }
}