import Post from "../models/Postmodel.js";
import user from "../models/Usermodel.js";

/* create */

export const createpost = async(req,res)=>{
    try {
        console.log(req.body)
        const {userid,description,picturepath} = req.body;
        console.log(userid)
        const usefind = await user.findById(userid);
        console.log(usefind)
        const newpost = new Post({
            userid,
            firstname:usefind.firstname,
            lastname:usefind.lastname,
            Location:usefind.location,
            description,
            userpicturepath:usefind.postpicpath,
            picturepath,
            likes:{},
            comments:[]
        })
        console.log(newpost)
        await newpost.save()
        const post = await Post.find()
        console.log(post)
        res.status(201).json(post)
        
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}

/* read */

export const getpost = async(req,res)=>{
    try {
        const post = await post.find()
        res.status(201).json(post)
        
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}

export const getuserpost = async(req,res)=>{
    try {
        const {userid} = req.params;
        const post = await post.find({userid})
        res.status(201).json(post)
        
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}

/* update */

export const likepost = async(req,res)=>{
    try {
        const {id} = req.params
        const {userid} = req.body;
        const post = await post.findById(id)
        const isliked = post.likes.get(userid)
        if(isliked){
            post.likes.delete(userid)
        }
        else{
            post.likes.set(userid,true)
        }
        const updatedpost = await post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        );
        res.status(200).json(updatedpost)
        
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}