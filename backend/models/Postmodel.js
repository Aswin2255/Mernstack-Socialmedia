import mongoose from "mongoose";
const postschema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturepath: String,
    userpicturepath: String,
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    comments: {
      type: Array,
    },
    taggeduser: {
      type: Array,
    },
    deleteflag: {
      type: Boolean,
      default: false,
    },
    report: {
      type: Array,
    },
    saved: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postschema);
export default Post;
