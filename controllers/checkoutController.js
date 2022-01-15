import Booking from '../models/booking'
import User from '../models/user'
import Destination from '../models/destination'
import catchAsync from '../middlewares/catchAsyncErrors'
import getRawBody from 'raw-body';
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


    // res.writeHead(307, { Location: session.url }).end()
    // res.redirect(307, session.url);
    res.status(200).json(session)

})



// Save booking in DB after payment => /api/webhook
export const webhookCheckout = catchAsync(async(req,res) => {

    const rawBody = await getRawBody(req)

    try {
        
        const signature = req.headers['stripe-signature']

        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)

        if(event.type === 'checkout.session.completed'){
            // pull out data from session
            const session = event.data.object

            const destination = session.client_reference_id
            const user = (await User.findOne({email: session.customer_email})).id


            const checkInDate = session.metadata.checkInDate
            const checkOutDate = session.metadata.checkOutDate
            const daysOfStay = session.metadata.daysOfStay

            const amountPaid = session.amount_total / 100 // total in dollars

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status
            }

            const booking = await Booking.create({
                destination,
                user,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid,
                paymentInfo,
                paidAt: Date.now()
            })
        
        
            res.status(200).json({ success: true })

        }


    } catch (error) {
        console.log('Error: Payment not successful in portal: ', error);
    }

})


