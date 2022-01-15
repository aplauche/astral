import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { stripeCheckoutSession } from "../../../controllers/checkoutController";
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser, isAdmin } from '../../../middlewares/auth';

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .use(isAuthenticatedUser)
    .get(stripeCheckoutSession)


export default handler