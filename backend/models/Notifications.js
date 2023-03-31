import mongoose from "mongoose";
const notificationschema = mongoose.Schema({
    userid:{
        type : mongoose.Types.ObjectId,
        required:true
    },
    details :{
        typeof: Array,
        
    }
});
const notifications = mongoose.model('Notification',notificationschema)
export default notifications