import express from "express";
import {
  CommentPost,
  createpost,
  deletepost,
  getpost,
  getuserpost,
  likepost,
  reportPost,
  savepost,
  Updatepost,
} from "../controller/Postcontroller.js";
import { verifytoken } from "../middlewares/userauth.js";
import upload from "../multerconfig.js";
const router = express.Router();

/* create */

router.post("/createpost", verifytoken, upload.single("image"), createpost);

/* read */

router.get("/getpost", verifytoken, getpost);
router.get("/userpost/:id", verifytoken, getuserpost);

/* update */

router.patch("/like/:id", verifytoken, likepost);
router.patch("/comment/:id", verifytoken, CommentPost);
router.patch(
  "/updatepost/:id",
  upload.single("editimage"),
  verifytoken,
  Updatepost
);
router.patch("/reportpost/:id", verifytoken, reportPost);
router.patch("/savepost/:id", verifytoken, savepost);

/* delete */

router.delete("/deletepost/:id", verifytoken, deletepost);

export default router;
