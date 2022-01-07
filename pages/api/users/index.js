import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getAllUsers, registerUser} from "../../../controllers/userController";
import onError from '../../../middlewares/errors'

// const handler = nc({onError});
const handler = nc({onError});

dbConnect();

// handler
//     .get(getAllUsers)
    
handler
    .post(registerUser)

export default handler