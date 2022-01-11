import Destination from "../models/destination";
import APICallModifier from "../utils/APICallModifier";
import catchAsync from '../middlewares/catchAsyncErrors'
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})


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

    console.log(req.body);

    const images = req.body.images 

    let imagesLinks = []

    for (let i = 0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'astral/destinations',
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    console.log(req.body)

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
