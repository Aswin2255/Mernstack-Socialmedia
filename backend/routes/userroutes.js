import  express  from "express";
import { addremovefriend, getfriends, getuser } from "../controller/Usercontroller.js";
import { verifytoken } from "../middlewares/userauth.js";



const userrouter = express.Router()
userrouter.get("/:id",verifytoken,getuser)
userrouter.get("/:id/friends",verifytoken,getfriends)
userrouter.patch('/addremovefriends',verifytoken,addremovefriend)
export default userrouter