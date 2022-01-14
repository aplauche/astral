import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getDestinationById, updateDestination, deleteDestination } from "../../../controllers/destinationController";
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser, isAdmin } from '../../../middlewares/auth';

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .get(getDestinationById)


handler
    .use(isAuthenticatedUser, isAdmin)
    .put(updateDestination)
handler
    .use(isAuthenticatedUser, isAdmin)
    .delete(deleteDestination)

export default handler