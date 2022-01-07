import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getAllDestinations, createDestination } from "../../../controllers/destinationController";
import onError from '../../../middlewares/errors'

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .get(getAllDestinations)
    
handler
    // .use(isAuthenticatedUser, authorizedRoles('admin'))
    .post(createDestination)

export default handler