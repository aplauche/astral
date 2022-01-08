import Booking from "../models/booking";
import catchAsync from '../middlewares/catchAsyncErrors'
import Moment from 'moment'
import { extendMoment } from 'moment-range';

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
------- Get all bookings => /api/bookings -------
*/ 

export const getAllBookingsByUser = catchAsync(async (req,res) => {

    const user = req.user

    let bookings = await Booking.find({user: user._id})

    res.status(200).json({
        success: true,
        bookings
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