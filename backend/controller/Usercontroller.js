
import user from "../models/Usermodel.js";


/* verify user email  */

export const VerifyEmail = async(req,res,next)=>{
    try {
        const userid = req.user
        const userfind = await user.findById(userid)
        console.log(userfind)
        if(userfind.otp === parseInt(req.body.otp)){
               const verified = await user.findByIdAndUpdate(userid,{verified:true})
               res.status(201).json({status:true,message:'user verified'})
        }
        else{
            res.status(401).json({status:false,message:'invalid otp'})
        }
    } catch (error) {
        
    }
}


/* read */

/*--------------------neede to change this function ----------------------------------*/
export const getuser = async (req,res,next)=>{
    try {
        let id = req.user
        const userfind = await user.findById(id);
        if(userfind.verified){
            res.status(200).json(userfind)
        }
        else{
            res.status(404).json({msg:'user not verified'})
        }
       
    } catch (error) {
        res.status(404).json({message:error.message})      
    }
}/*------------------------------------------------------------------------------------------*/


export const getfriends = async(req,res)=>{
    try {
        const {id} = req.params;
        const userfind = await user.findById(id)
       // const friends = await userfind.friends.map((id)=>user.findById(id))
       const friends = await Promise.all(
        userfind.map((id)=>user.findById(id))
       );
    const formatedfriends = friends.map(({_id,firstname,lastname,occupation,location,picturepath})=>{return {_id,firstname,lastname,occupation,location,picturepath}})
    res.json(200).json(formatedfriends)
    } catch (error) {
        res.status(404).json({message:error.message})      
        
    }
}

/* update */

export const addremovefriend = async (req,res)=>{
    try {
        const {id,friendid} = req.params;
        const user = await user.findById(id)
        const friend = await user.findById(friendid)
        if(user.friends.includes(friendid)){
            user.friends = user.friends.filter((id)=>id !== friendid)
            friend.friends = friend.friends.filter((id)=>id !== id)
        }
        else{
            user.friends.push(friendid)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()
        const formatedfriends = friends.map(({_id,firstname,lastname,occupation,location,picturepath})=>{return {_id,firstname,lastname,occupation,location,picturepath}})
        res.status(200).json(formatedfriends)
        
    } catch (error) {
        res.status(404).json({message:error.message})      
        
    }
}