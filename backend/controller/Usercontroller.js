import mongoose from "mongoose";
import Post from "../models/Postmodel.js";
import user from "../models/Usermodel.js";
import Notifications from "../models/Notifications.js";

/* verify user email  */

export const VerifyEmail = async (req, res, next) => {
  try {
    const userid = req.user;
    const userfind = await user.findById(userid);
  //  console.log(userfind);
    if (userfind.otp === parseInt(req.body.otpvalues)) {
      const verified = await user.findByIdAndUpdate(
        userid,
        { verified: true },
        { new: true }
      );
    //  console.log(verified);
      (verified.pass = undefined), (verified.otp = undefined);
      res.status(201).json({
        status: true,
        message: "user verified",
        userdetails: verified,
      });
    } else {
      res.status(401).json({ status: false, message: "invalid otp" });
    }
  } catch (error) {}
}; 

/* get a user by id */

export const getuser = async (req, res, next) => {
  try {
    console.log("hi");
    let id = req.params.id;
    const userfind = await user.find({ _id: id });

    // console.log(userfind);
    if (userfind[0].verified) {
      res.status(200).json({
        status: true,
        userdetails: userfind,
        msg: "user find succesfully",
      });
    } else {
      res.json({ status: false, msg: "user not verified" });
    }
  } catch (error) {
    res.status(404).json({ status: false, msg: error.message });
  }
};

/* to get the followers list of a user */

export const getfollowers = async (req, res) => {
  try {
    const { id } = req.params;
    //  console.log(id + "jjj");
    const userfind = await user.findById(id);
    // console.log(userfind.followers)
    let folowerslist = [];
    for (const id of userfind.followers) {
      const followers = await user.findById(id[0]);
      (followers.otp = undefined), (followers.pass = undefined);
      folowerslist.push(followers);
    }
    res.status(200).json({
      status: true,
      followers: folowerslist,
      msg: "succesfully fetched followers",
    });
  } catch (error) {
    res.stattus(400).json({ status: false, msg: "error occured" });
  }
};

/* to get the following  list of a user */

export const getfollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const usefind = await user.findById(id);
    let followinglist = [];
    for (const id of usefind.following) {
      const following = await user.findById(id[0]);
      (following.otp = undefined), (following.pass = undefined);
      followinglist.push(following);
    }
    res.status(200).json({
      status: true,
      followers: followinglist,
      msg: "succesfully fetched following users",
    });
  } catch (error) {
    res.stattus(400).json({ status: false, msg: "error occured" });
  }
};

/* update */

export const addremovefriend = async (req, res) => {
  try {
    console.log("hi");
    const { id } = req.params;
    const userid = req.user;
    const friend = await user.findById(id);
    const userlogedin = await user.findById(userid);
    const isfollow =
      friend.followers.get(userid) || userlogedin.following.get(id);
    if (isfollow) {
      friend.followers.delete(userid);
      userlogedin.following.delete(id);
    } else {
      friend.followers.set(userid, true);
      userlogedin.following.set(id, true);
    }
    const updateuser = await user.findByIdAndUpdate(
      userid,
      {
        following: userlogedin.following,
      },
      {
        new: true,
      }
    );
    const updatfriend = await user.findByIdAndUpdate(
      id,
      {
        followers: friend.followers,
      },
      {
        new: true,
      }
    );
    /* console.log("--------------------------------------------------------");
    console.log(updatfriend);
    console.log("==========================================================");
    console.log(updateuser);*/

    res.status(200).json({
      status: true,
      updateuser: [updatfriend],
      msg: "add/remove friends",
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ stattus: false, msg: error.message });
  }
};

/* to get list of all users in database */

export const getallUser = async (req, res) => {
  try {
    const Allusers = await user.find();
    res
      .status(200)
      .json({ status: true, allusers: Allusers, msg: "fetched all users" });
  } catch (error) {
    res.status(404).json({ status: false, msg: "unexpected error happend" });
  }
};

/* to get the login user */

export const getLoginuser = async (req, res) => {
  try {
    const userid = req.user;
    const userfind = await user.findById(userid);
    console.log(userfind);
    res.status(200).json({
      status: true,
      logedinuser: userfind,
      msg: "user fetched sucessfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: false, msg: "unexpected error happend" });
  }
};

/* to update user */

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { username, email, phone } = req.body;
    phone = parseInt(phone);
    const updateduser = await user.findByIdAndUpdate(
      id,
      {
        name: username,
        email: email,
        phone: phone,
      },
      {
        new: true,
      }
    );
    console.log(".............................................");
    await Post.updateMany(
      { userid: id },
      {
        $set: {
          name: username,
        },
      }
    );
    await Post.updateMany(
      { "comments.userid": id },
      {
        $set: {
          "comments.$.username": username,
        },
      }
    );

    await Post.updateMany(
      { "taggeduser._id": mongoose.Types.ObjectId(id) },
      {
        $set: {
          "taggeduser.$.name": username,
        },
      }
    );

    console.log([updateduser]);
    res
      .status(200)
      .json({ status: true, updateduser: updateduser, msg: "user updated" });
  } catch (error) {
    res.status(404).json({ status: false, msg: "unexpected error happend" });
    console.log(error);
  }
};

/* to update profile pic */

export const ChangeProfile = async (req, res) => {
  try {
    const filepath = req.file.filename;
    const userid = req.user;
    const updateduser = await user.findByIdAndUpdate(
      userid,
      {
        propicpath: filepath,
      },
      {
        new: true,
      }
    );
    await Post.updateMany(
      { userid: userid },
      {
        $set: {
          userpicturepath: filepath,
        },
      }
    );
    await Post.updateMany(
      { "comments.userid": userid },
      {
        $set: {
          "comments.$.propicpath": filepath,
        },
      }
    );
    console.log(updateduser);
    res.status(200).json({
      status: true,
      updateduser: updateduser,
      msg: "profile pic updated",
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: false, msg: error.message });
  }
};
export const Updatenotifications = async (req,res)=>{
  try {
    const {id} = req.params
    console.log(id)
    await Notifications.updateMany({userid:id},{$set:{
      read:true
    }})
    const allnotifications = await Notifications.find({userid:mongoose.Types.ObjectId(id)})
    const notifications = allnotifications.filter((items)=>
      !items.likeduser.equals(id)
    )
    console.log(notifications)
    res.status(200).json({status:true,notifications:notifications,msg:'user notifications fetched and marked as read'})
    
  } catch (error) {
    console.log(error)
    
  }
}
