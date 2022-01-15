import nc from 'next-connect'
import onError from '../../middlewares/errors';

import dbConnect from '../../utils/dbConnect';
import { webhookCheckout } from "../../controllers/checkoutController";

const handler = nc({onError});

dbConnect();

export const config = {
    api: {
        bodyParser: false
    }
}

handler
    .post(webhookCheckout)

export default handler