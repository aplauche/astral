import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { createBooking, getAllBookingsByUser } from "../../../controllers/bookingController";
import {isAuthenticatedUser} from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .use(isAuthenticatedUser)
    .get(getAllBookingsByUser)
    
handler
    .use(isAuthenticatedUser)
    .post(createBooking)

export default handler