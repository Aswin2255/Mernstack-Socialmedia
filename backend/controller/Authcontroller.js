import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import user from "../models/Usermodel.js";
import nodemailer from 'nodemailer';
import { SendOtp } from "../services/Mail.js";

// create token
const maxage = 3 * 24 * 60 * 60
const CreateToken = (id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : maxage
    })
}

/* register user */

export const register = async (req, res, next) => {
    console.log(req.body)
    try {
        const {
            name,
            email,
            phone,
            pass,
        } = req.body;

        const salt = await bcrypt.genSalt()
        const passwordhash = await bcrypt.hash(pass, salt)

         // generate the otp 
         const otp = await SendOtp()
         console.log(otp)

        const newuser = new user({
            name,
            email,
            phone,
            pass: passwordhash,
            verified: false,
            otp
        });
        const saveduser = await newuser.save()
        console.log(saveduser)
        const token = CreateToken(saveduser._id)

        // generate the verification email
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        // Message to be send
        let message = await transporter.sendMail({
            from: '"Social-App" <Social-App@example.com>', // sender address
            to: newuser.email, // list of receivers
            subject: "verification email", // Subject line
            text: `your OTP : ${otp}`, // plain text body
        });

        res.cookie('jwt',token,{
            withCredentials:true,
            httpOnly:false,
            maxage:maxage * 1000

        });


        res.status(201).json({status:true,message:'user created'});
    } catch (err) {
        console.log(err)
        if(err.code === 11000){
            res.json({status:false,message:'Email/phone already registered'})
        }
        else{
            res.json({status:false,message:'unexpected error ocuured'})
        }
       

    }

};

/* sending email verification to the user  */


/* Logging in */

export const login = async (req, res, next) => {
    try {
        const { email, pass } = req.body
        const Userfind = await user.findOne({ email: email })
        if (!Userfind) return res.json({status:false, msg: "user does not exist" })
        const ismatch = await bcrypt.compare(pass, Userfind.pass)
        if (!ismatch) return res.json({status:false, msg: 'username or password incorrect' })
        const token = CreateToken(Userfind._id)
        res.cookie('jwt',token,{
            withCredentials:true,
            httpOnly:false,
            maxage:maxage * 1000

        });
        delete Userfind.pass
        res.json({status:true,msg:'user logged in'})
    } catch (err) {
        res.json({ error: err.message })

    }
}
