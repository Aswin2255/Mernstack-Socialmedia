import mongoose from "mongoose";
const notificationschema = mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
  },
 likeduser:{
  type:mongoose.Types.ObjectId,
 },
 postid:{
  type:mongoose.Types.ObjectId,
 },
 username:{
  type: String
 },
 propicpath:{
  type:String
 },
 read:{
  type:Boolean,
  default:false
 }
});
const Notifications = mongoose.model("Notification", notificationschema);
export default Notifications;
