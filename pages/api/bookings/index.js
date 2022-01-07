import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { createBooking } from "../../../controllers/bookingController";

// const handler = nc({onError});
const handler = nc({});

dbConnect();
    
handler
    // .use(isAuthenticatedUser, authorizedRoles('admin'))
    .post(createBooking)

export default handler