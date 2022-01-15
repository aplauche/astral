import Destination from '../models/destination'
import catchAsync from '../middlewares/catchAsyncErrors'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


import absoluteUrl from 'next-absolute-url'

// Generate the stripe session => /api/checkout/:id
export const stripeCheckoutSession = catchAsync(async(req,res) => {


    // get destination details

    const destination = await Destination.findById(req.query.id)
    const {checkInDate, checkOutDate, daysOfStay } = req.query
    
    // origin

    const {origin} = absoluteUrl(req)

    // checkout session

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: `${origin}/bookings`,
        cancel_url: `${origin}/destinations/${destination._id}`,
        customer_email: req.user.email,
        client_reference_id: req.query.id,
        metadata: {
            checkInDate,
            checkOutDate,
            daysOfStay
        },
        line_items: [
            {
                name: destination.name,
                // images: [`${destination.images[0].url}`],
                amount: destination.pricePerNight * daysOfStay * 100,
                currency: 'usd',
                quantity: 1
            }
        ]
    })


    //res.writeHead(307, { Location: session.url }).end()
    // res.redirect(307, '/');
    res.status(200).json(session)

})

