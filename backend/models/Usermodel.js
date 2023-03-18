import mongoose from "mongoose";
const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 2,
      max: 15,
    },
    email: {
      type: String,
      require: true,
      min: 2,
      max: 25,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
      unique: true,
    },
    pass: {
      type: String,
      require: true,
      min: 4,
      max: 20,
    },
    propicpath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    verified: {
      type: Boolean,
      require: true,
    },
    otp: {
      type: Number,
      default: null,
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
);

const user = mongoose.model("User", Userschema);
export default user;
