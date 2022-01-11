import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getAllDestinations, createDestination } from "../../../controllers/destinationController";
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .get(getAllDestinations)
    
handler
    .use(isAuthenticatedUser)
    .post(createDestination)

export default handler