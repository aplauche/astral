import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getDestinationById } from "../../../controllers/destinationController";

// const handler = nc({onError});
const handler = nc({});

dbConnect();

handler
    .get(getDestinationById)

export default handler