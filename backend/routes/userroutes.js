import express from "express";
import {
  addremovefriend,
  ChangeProfile,
  getallUser,
  getfollowers,
  getfollowing,
  getLoginuser,
  getuser,
  updateUser,
  VerifyEmail,
} from "../controller/Usercontroller.js";
import { verifytoken } from "../middlewares/userauth.js";
import upload from "../multerconfig.js";

const userrouter = express.Router();
userrouter.post("/verifyemail", verifytoken, VerifyEmail);

userrouter.get("/getuser/:id", verifytoken, getuser);
userrouter.get("/getloginuser", verifytoken, getLoginuser);
userrouter.get("/Followers/:id", verifytoken, getfollowers);
userrouter.get("/Following/:id", verifytoken, getfollowing);
userrouter.get("/alluser", verifytoken, getallUser);

userrouter.patch("/addremovefriends/:id", verifytoken, addremovefriend);
userrouter.patch("/updateuser/:id", verifytoken, updateUser);
userrouter.patch('/changeprofile',verifytoken,upload.single("image"),ChangeProfile)
export default userrouter;
