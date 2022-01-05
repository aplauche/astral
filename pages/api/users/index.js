import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect';
import { getAllUsers, registerUser} from "../../../controllers/userController";

// const handler = nc({onError});
const handler = nc({});

dbConnect();

// handler
//     .get(getAllUsers)
    
handler
    .post(registerUser)

export default handler