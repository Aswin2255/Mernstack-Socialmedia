import mongoose from "mongoose";
import Post from "../models/Postmodel.js";
import user from "../models/Usermodel.js";

/* create */

export const createpost = async (req, res) => {
  try {
    let tagedusers = [];
    console.log(".....................................................");
    console.log(req.body.tage)
    if (req.body.tage !== 'undefined') {
      console.log('entered')
      const taguserid = req.body.tage.split(",");

      for (const i of taguserid) {
        const taguser = await user.findById(i);
        tagedusers.push(taguser);
      }
    }
    console.log(tagedusers);

    let userid = req.user;
    let picturepath;
    let description;
    console.log("recahed........");
    if (req.file) {
      picturepath = req.file.filename;
    } else {
      picturepath = undefined;
    }
    if (req.body.caption) {
      description = req.body.caption;
    } else {
      description = undefined;
    }
    console.log(description);
    console.log(picturepath);
    console.log(userid);
    const usefind = await user.findById(userid);
    console.log(usefind);
    const newpost = new Post({
      userid,
      name: usefind.name,
      email: usefind.email,
      userpicturepath: usefind.propicpath,
      picturepath: picturepath,
      description: description,
      taggeduser: tagedusers,
    });
    console.log(newpost);
    await newpost.save();
    const updatedpost = await Post.find();
    const newupdatedpost = updatedpost.filter((e)=>e.deleteflag !== true)
    res
      .status(201)
      .json({ status: true, post: newupdatedpost, message: "post created" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "error" });
  }
};

/* read */

// this will give the whole post in the database
export const getpost = async (req, res) => {
  try {
    const allpost = await Post.find();
    const newupdatedpost = allpost.filter((e)=>e.deleteflag !== true)
    res.status(201).json({
      status: true,
      post: newupdatedpost,
      message: "succesfully fetched all post",
    });
  } catch (error) {
    res
      .status(409)
      .json({ status: false, message: "unexpected error occured" });
  }
};
// this will give the specefic user post from the database
export const getuserpost = async (req, res) => {
  console.log("reched");
  try {
    const { id } = req.params;
    console.log(id);
    const postfind = await Post.find({ userid: id });
    const newupdatedpost = postfind.filter((e)=>e.deleteflag !== true)
    res.status(201).json({ status: true, userpost: newupdatedpost });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

/* update */

export const likepost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.user);
    // this will give the logged in user
    const userid = req.user;
    const postfind = await Post.findById(id);
    // this will check whether the hashtable contain liked user
    const isliked = postfind.likes.get(userid);
    if (isliked) {
      // if the hashtable contain the liked user it will delete it from the map
      postfind.likes.delete(userid);
    } else {
      // if not in hashtable we set the map value {userid:true}
      postfind.likes.set(userid, true);
    }
    const updatedpost = await Post.findByIdAndUpdate(
      id,
      { likes: postfind.likes },
      { new: true }
    );
    const allpost = await Post.find();
    const newupdatedpost = allpost.filter((e)=>e.deleteflag !== true)
    res
      .status(200)
      .json({ status: true, updatedpost: newupdatedpost, message: "like is updated" });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ status: false, message: error.message });
  }
};

export const CommentPost = async (req, res) => {
  try {
    const { newcoment, username } = req.body;
    console.log(newcoment, username);

    const { id } = req.params;
    console.log(id);

    const updatecoment = {
      userid: req.user,
      comment: newcoment,
      username: username,
    };
    console.log(updatecoment);

    const finalpostdata = await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: updatecoment },
      },
      {
        new: true,
      }
    );
    const Allpost = await Post.find();
    const newupdatedpost = Allpost.filter((e)=>e.deleteflag !== true)
    res.json({ status: true, updatedpost: newupdatedpost });
  } catch (error) {
    console.log(error);
  }
};
// this to update a post
export const Updatepost = async (req, res) => {
  try {
    const { id } = req.params;
    let picturepath;
    let caption;
    console.log(id);
    const findpost = await Post.findById(id);
    console.log(".................................");
    console.log(findpost);
    // this will check whether there is file input
    console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    console.log(req.file);
    if (req.file) {
      console.log(req.file.filename);
      picturepath = req.file.filename;
    } else {
      // this will check whether the user remove the image  then it remove existing image and update it to database
      console.log(req.body.remove);
      if (req.body.remove) {
        console.log("kk");
        picturepath = "";
      } else {
        console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        // else it will update the existing image path
        picturepath = findpost.picturepath;
      }
    }
    // this will check whether there is caption if there is caption it will update
    if (req.body.caption) {
      caption = req.body.caption;
    } else {
      // if the caption is deleted by the user them it remove existing image and update it to database
      caption = "";
    }
    const updatepost = await Post.findByIdAndUpdate(
      id,
      {
        description: caption,
        picturepath: picturepath,
      },
      { new: true }
    );
    console.log("....................................");
    console.log(updatepost);
    const allpost = await Post.find();
    const newupdatedpost = allpost.filter((e)=>e.deleteflag !== true)
    res
      .status(201)
      .json({ status: true, message: "post updated", updatedpost: newupdatedpost });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message });
  }
};
// delete a post
export const deletepost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletpost = await Post.findByIdAndUpdate(id,{
      deleteflag:true
    },{
      new:true
    });
    console.log(deletpost);
    const updatedpost = await Post.find();
    const newupdatedpost = updatedpost.filter((e)=>e.deleteflag !== true)
    console.log('------------====================================================000000000000000000000--------------')
    console.log(newupdatedpost)
    res.status(200).json({
      status: true,
      updatedpost: newupdatedpost,
      message: "post deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message });
  }
};
// to report a post
export const reportPost = async (req, res) => {
  try {
    console.log("reached");
    const { id } = req.params;
    const { reason } = req.body;
    const postfind = await Post.findById(id);
    let existreport = postfind.report.filter((e) => e.userid === req.user);
    console.log(existreport.length);
    if (existreport.length) {
      console.log("frjb");
      res.status(200).json({
        status: false,
        message: "post already reported will take action soon",
      });
    } else {
      console.log("re");
      const userid = req.user;
      const reportdata = {
        userid,
        reason,
      };
      const updatepostt = await Post.findByIdAndUpdate(
        id,
        {
          $push: { report: reportdata },
        },
        { new: true }
      );
      console.log(updatepostt);
      res.status(200).json({ status: true, message: "post get reported" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

//this is to save post

// this is to save the user post

export const savepost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userid = req.user;
    const findpost = await Post.findById(id);
    const issaved = findpost.saved.get(userid);
    if (issaved) {
      findpost.saved.delete(userid);
    } else {
      findpost.saved.set(userid, true);
    }

    const updatepost = await Post.findByIdAndUpdate(
      id,
      { saved: findpost.saved },
      { new: true }
    );
    console.log(updatepost);
    const allpost = await Post.find();
    res.status(200).json({
      status: true,
      updatedpost: allpost,
      message: "saved post updated",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "unexpected error occured" });
  }
};
