import jwt from 'jsonwebtoken';
import user from '../models/Usermodel.js';
export const verifytoken = async(req,res,next)=>{
    try {
       let token = req.cookies.jwt;
       
       if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedtoken)=>{
            if(err){
                res.status(401).json({status:false,message:'jwt token expired'})
            }
            else{
                req.user = decodedtoken.id
                next()
            }
        })
       }
       else{

       }
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}