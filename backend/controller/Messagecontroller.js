import messageModel from "../models/Messagemodel.js"

export const newmessage = async(req,res)=>{
    try {
        const newMessage = new messageModel({
            chatid : req.body.chatid,
            senderid : req.user,
            text : req.body.text
        })
        const savedmessage = await newMessage.save()
        res.status(200).json({status:true,newmessage:savedmessage})
        
    } catch (error) {
        console.log(error.message)
        
    }
}
export const getmessage = async (req,res)=>{
    try {
        const {id} = req.params
        const message = await messageModel.find({
            chatid : id
        })
        res.status(200).json({status:true,message:message})
        
    } catch (error) {
        console.log(error.message)
    }
}