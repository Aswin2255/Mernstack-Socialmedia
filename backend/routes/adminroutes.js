import expres from "express";
import { adminLogin, changeStatus, getAllcount, getAlluser, getReportedpost, restrictpost } from "../controller/Admincontroller.js";
import { verifyadmintoken } from "../middlewares/adminauth.js";

const router = expres.Router();
router.post("/adminlogin", adminLogin);
// this is to fetch counts of users and post
router.get("/getallcount", verifyadmintoken, getAllcount);
//this is to fetch all users 
router.get('/getalluser',verifyadmintoken,getAlluser)
//this is to change the status of the user
router.patch('/changestatus/:id',verifyadmintoken,changeStatus)
//this is to fetch all reported post 
router.get('/getreported',verifyadmintoken,getReportedpost)
//this is to restrict reported post
router.patch('/restrictpost/:id',verifyadmintoken,restrictpost)

export default router;
