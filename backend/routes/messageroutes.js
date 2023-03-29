import express from 'express';
import { getmessage, newmessage } from '../controller/Messagecontroller.js';
import { verifytoken } from '../middlewares/userauth.js';
const router = express.Router()
router.post('/newmessage',verifytoken,newmessage)
router.get('/getmessage/:id',verifytoken,getmessage)

export default router
