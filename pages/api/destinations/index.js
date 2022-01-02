import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getAllDestinations, createDestination } from "../../../controllers/destinationController";

// const handler = nc({onError});
const handler = nc({});

dbConnect();

handler
    .get(getAllDestinations)
    
handler
    // .use(isAuthenticatedUser, authorizedRoles('admin'))
    .post(createDestination)

export default handler