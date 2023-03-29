import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
    {
        chatid : {
            type : String
        },
        senderid:{
            type : String
        },
        text:{
            type : String
        }
    },
    {
        timestamps : true
    }
);
const messageModel = mongoose.model("Message",messageSchema)
export default messageModel;