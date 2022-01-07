import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Destination'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    daysOfStay: {
        type: Number,
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema)