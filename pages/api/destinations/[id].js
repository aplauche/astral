import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getDestinationById } from "../../../controllers/destinationController";
import onError from '../../../middlewares/errors'

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

handler
    .get(getDestinationById)

export default handler