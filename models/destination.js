import mongoose from 'mongoose'


const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter destination name."],
        trim: true,
        maxLength: [100, "Name can only be 100 chars long."]
    },
    pricePerNight: {
        type: Number,
        required: [true, "Please enter price."],
        maxLength: [5, "Price should be a maximum of 5 characters. Do not include cents"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter destination description."],
    },
    guestCapacity: {
        type: Number,
        required: [true, "Please enter room guest capacity."],
    },
    signs: [{
        type: String
    }],
    benefits: [{
        type: String
    }],
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// Boilerplate you must use conditional in Next.js, check if model exists, if not create it
export default mongoose.models.Destination || mongoose.model('Destination', destinationSchema)