import Booking from "../models/booking";
import { getSession } from "next-auth/react";

/* POST
------- Create a booking => /api/bookings -------
*/ 

export const createBooking = async (req,res) => {
    try {

        const session = await getSession({req})

        console.log(session)

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
            user: session.user._id,
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
        
    } catch (error) {
        console.log(error);
    }
}