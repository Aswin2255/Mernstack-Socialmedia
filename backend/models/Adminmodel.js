import mongoose from "mongoose";
const Adminschema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        min: 2,
        max: 25,
        unique: true,
      },
      pass:{
        type: String,
        require: true,
        min: 4,
        max: 20,
      }
});
const Admin = mongoose.model("Admin", Adminschema);
export default Admin;