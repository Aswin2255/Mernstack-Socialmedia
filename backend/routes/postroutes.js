import express from 'express'
import { createpost, getpost, getuserpost, likepost } from '../controller/Postcontroller.js'
import { verifytoken } from '../middlewares/userauth.js'
import upload from '../multerconfig.js'
const router = express.Router()

/* create */

router.post('/createposts',verifytoken,upload.single('post'),createpost)

/* read */

router.get('/',verifytoken,getpost)
router.get('/:userid/post',verifytoken,getuserpost)

/* update */

router.patch("/:id/like",verifytoken,likepost)



export default router