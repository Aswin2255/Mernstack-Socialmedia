import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';  
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import authrouter from './routes/authrouer.js';
import userrouter from './routes/userroutes.js';
import postrouter from './routes/postroutes.js';


/* configuration */

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use("/assets",express.static(path.join(__dirname,'public/assets')));


/* mongose setup */

const port = process.env.PORT || 6001;
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL,{
       maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true
}).then(()=>{
    app.listen(port,()=> console.log(`server running in ${port}`))
}).catch((er)=>console.log(er))

/* roues aetup */

app.use('/auth',authrouter)
app.use('/user',userrouter)
app.use('/post',postrouter)