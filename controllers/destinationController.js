import Destination from "../models/destination";
import APICallModifier from "../utils/APICallModifier";
import catchAsync from '../middlewares/catchAsyncErrors'

/* GET
------- Get all destinations => /api/destinations -------
*/ 

export const getAllDestinations = catchAsync(async (req,res) => {

    const customCall = new APICallModifier(Destination.find(), req.query).filter()


    let destinations = await customCall.query;


    res.status(200).json({
        success: true,
        destinations
    })
        
})


/* POST
------- Create destination => /api/destinations -------
*/ 

export const createDestination = catchAsync(async (req,res) => {

    const destination = await Destination.create(req.body)

    res.status(200).json({
        success: true,
        destination
    })

})


/* GET
------- Get destination by ID => /api/destinations/:id -------
*/ 

export const getDestinationById =  catchAsync(async (req,res) => {

    let destination = await Destination.findById(req.query.id)

    res.status(200).json({
        success: true,
        destination
    })      

})
