import  express  from "express";
import { addremovefriend, getfriends, getuser, VerifyEmail } from "../controller/Usercontroller.js";
import { verifytoken } from "../middlewares/userauth.js";



const userrouter = express.Router()
userrouter.post("/verifyemail",verifytoken,VerifyEmail)
userrouter.get("/getuser",verifytoken,getuser)
userrouter.get("/:id/friends",verifytoken,getfriends)
userrouter.patch('/addremovefriends',verifytoken,addremovefriend)
export default userrouter