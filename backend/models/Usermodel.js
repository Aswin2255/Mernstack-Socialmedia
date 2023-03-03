import mongoose from "mongoose";
const Userschema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            require:true,
            min:2,
            max:15,
        },
        lastname:{
            type:String,
            require:true,
            min:2,
            max:15,
        },
        email:{
            type:String,
            require:true,
            min:2,
            max:25,
            unique:true
        },
        password:{
            type:String,
            require:true,
            min:4,
            max:20,  
        },
        propicpath:{
            type:String,
            default:"",
        },
        friends:{
            type : Array,
            default : []
        },
        location:String,
        ocuupation:String,
      
    },
    {timestamps:true}
);

const user = mongoose.model("User",Userschema)
export default user
