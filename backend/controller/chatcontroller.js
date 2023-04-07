import chatModel from "../models/Chatmodel.js";
import user from "../models/Usermodel.js";

export const getChat = async(req,res)=>{
    try {
        let userid = req.user
        const Allchat = await chatModel.find({members:{$in:[userid]}})
        res.status(200).json({status:true,userchat:Allchat})
        
    } catch (error) {
        res.status(400).json({status:false,msg:error.message})
        
    }
}
export const getspecefichat = async(req,res)=>{
    try {
        let userid = req.user
    let receiverid = req.params.id
   // console.log(userid,receiverid)
    const Allchat = await chatModel.find({members:{$all:[userid,receiverid]}})
    if(Allchat.length){
        res.status(200).json({status:true,chat:Allchat,msg:'specefic chat is fetched'})

    }
    else{
        const newchat = new chatModel({
            members:[userid,receiverid]
        })
        const chatsaved = await newchat.save()
        res.status(200).json({status:true,chat:chatsaved,msg:'new chat created'})

    }

        
    } catch (error) {
        res.status(500).json({status:false,msg:error.message})
        
    }
}
export const searchChat = async (req,res)=>{
    try {
        let userid = req.userid
        let search = req.body
        console.log(search)
        const searchresult = await chatModel.find({'members.friend':{$regex:search.searchquery}})
      //  console.log(searchresult)
        
    } catch (error) {
        console.log(error.message)
    }
}
export const createChat = async (req,res)=>{
   try {
    const sender = await user.findById(req.user)
    const receiver = await user.findById(req.body.receiverid)
    const newchat = new chatModel({
        members:[req.body.senderid,req.body.receiverid]
    })
    const chatsaved = await newchat.save()
    res.status(200).json({status:true,userchat:chatsaved})

    
   } catch (error) {
    
   }
}
