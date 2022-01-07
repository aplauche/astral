import Booking from "../models/booking";


/* POST
------- Create a booking => /api/bookings -------
*/ 

export const createBooking = async (req,res) => {
    try {

        const booking = await Booking.create(req.body)

        res.status(200).json({
            success: true,
            booking
        })
        
    } catch (error) {
        console.log(error);
    }
}