import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { checkBookingAvailable } from "../../../controllers/bookingController";
import onError from '../../../middlewares/errors'

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .get(checkBookingAvailable)


export default handler