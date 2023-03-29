import express from 'express'
import { createChat, getChat, getspecefichat, searchChat } from '../controller/chatcontroller.js'

import { verifytoken } from '../middlewares/userauth.js'
const router = express.Router()

router.post('/addchat',verifytoken,createChat)
router.get('/getchat',verifytoken,getChat)
router.post('/search',verifytoken,searchChat)
router.get('/getchat/:id',verifytoken,getspecefichat)

export default router