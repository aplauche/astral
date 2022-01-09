import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getAllDestinations, createDestination } from "../../../controllers/destinationController";
import onError from '../../../middlewares/errors'
import {isAuthenticatedUser, isAdmin} from '../../../middlewares/auth'


// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .get(getAllDestinations)
    
handler
    .use(isAuthenticatedUser, isAdmin)
    .post(createDestination)

export default handler