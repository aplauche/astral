import Booking from "../models/booking";
import catchAsync from '../middlewares/catchAsyncErrors'
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment)



/* GET
------- Get all bookings by destination => /api/bookings/check-booked-dates -------
*/ 

export const getAllBookingsByDestination = catchAsync(async (req,res) => {

    let {
        destinationId
    } = req.query

    // Find all bookings
    const bookings = await Booking.find({
        destination: destinationId,
    })

    let bookedDates = []

    bookings.forEach(booking => {
        // get all dates for each booking
        const range = moment.range(moment(booking.checkInDate), moment(booking.checkOutDate))
        const dates = Array.from(range.by('day'))

        bookedDates = bookedDates.concat(dates)
    })

    console.log(bookedDates)

    res.status(200).json({
        success: true,
        bookedDates
    })
        
})


/* GET
------- Check Booking available => /api/bookings/check-valid-dates -------
*/ 

export const checkBookingAvailable = catchAsync(async (req,res) => {

    let {
        destinationId,
        checkInDate,
        checkOutDate
    } = req.query

    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)

    // Find all bookings
    const bookings = await Booking.find({
        destination: destinationId,
        $and: [
            {
                checkInDate: {
                    $lte: checkOutDate
                },
            },
            {
                checkOutDate: {
                    $gte: checkInDate
                },
            }
        ]
    })

    let isAvailable;

    if(bookings && bookings.length === 0){
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable
    })
        
})

/* GET
------- Get all bookings by user => /api/bookings -------
*/ 

export const getAllBookingsByUser = catchAsync(async (req,res) => {

    const user = req.user

    let bookings = await Booking.find({user: user._id})
    .populate({
        path: 'destination',
        select: 'name pricePerNight'
    })
    .populate({
        path: 'user',
        select: 'name email'
    })

    res.status(200).json({
        success: true,
        bookings
    })
        
})


/* GET
------- Get booking by ID => /api/bookings/:id -------
*/ 

export const getBookingById = catchAsync(async (req,res) => {

    const user = req.user

    console.log(req.query)

    let booking = await Booking.findById(req.query.id)
        .populate({
            path: 'destination',
            select: 'name pricePerNight'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    if(booking.user !== req.user._id){
        new ErrorHandler("You do not have permission to view this page", 403)
    }

    res.status(200).json({
        success: true,
        booking
    })
        
})

/* POST
------- Create a booking => /api/bookings -------
*/ 

export const createBooking = catchAsync(async (req,res) => {

        const {
            destination,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid,
            paymentInfo,
            paidAt
        } = req.body
    
        const booking = await Booking.create({
            destination,
            user: req.user._id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid,
            paymentInfo,
            paidAt
        })

        res.status(200).json({
            success: true,
            booking
        })

})