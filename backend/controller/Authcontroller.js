import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import user from "../models/Usermodel.js";

/* register user */

export const register =  async(req,res,next)=>{
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturepath,
            friends,
            location,
            ocupation
        } = req.body;

        const salt = await bcrypt.genSalt()
        const passwordhash = await bcrypt.hash(password,salt)
        const newuser = new user({
            firstname,
            lastname,
            email,
            password:passwordhash,
            picturepath,
            friends,
            location,
            ocupation
        });
        const saveduser = await newuser.save()
        res.status(201).json(saveduser);
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }

};

/* Logging in */

export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const Userfind = await user.findOne({email:email})
        if(!Userfind) return res.status(400).json({msg:"user does not exist"})
        const ismatch = await bcrypt.compare(password,Userfind.password)
        if(!ismatch) return res.status(400).json({msg:'username or password incorrect'})
        const token = jwt.sign({_id:Userfind._id},process.env.JWT_SECRET)
        delete Userfind.password
        res.status(200).json({token,Userfind})
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }
}
