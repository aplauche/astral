import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getBookingById } from "../../../controllers/bookingController";
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';

const handler = nc({onError});

dbConnect();

handler
    .use(isAuthenticatedUser)
    .get(getBookingById)

export default handler