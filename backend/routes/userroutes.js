import express from "express";
import {
  addremovefriend,
  getallUser,
  getfollowers,
  getfollowing,
  getuser,
  VerifyEmail,
} from "../controller/Usercontroller.js";
import { verifytoken } from "../middlewares/userauth.js";

const userrouter = express.Router();
userrouter.post("/verifyemail", verifytoken, VerifyEmail);

userrouter.get("/getuser/:id", verifytoken, getuser);
userrouter.get('/getloginuser',verifytoken)
userrouter.get("/Followers/:id", verifytoken, getfollowers);
userrouter.get("/Following/:id",verifytoken,getfollowing)
userrouter.get('/alluser',verifytoken,getallUser)


userrouter.patch("/addremovefriends/:id", verifytoken, addremovefriend);
export default userrouter;
