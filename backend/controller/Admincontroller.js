import jwt from "jsonwebtoken";
import Admin from "../models/Adminmodel.js";
import Post from "../models/Postmodel.js";
import user from "../models/Usermodel.js";

const maxage = 3 * 24 * 60 * 60;

// creating token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxage,
  });
};

// to authenticate the admin
export const adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, pass } = req.body;
    const adminfind = await Admin.findOne({ email: email });
    if (!adminfind)
      return res.status(404).json({ status: false, msg: "user not found" });
    const ismatch = adminfind.pass === pass;
    if (!ismatch)
      return res
        .status(401)
        .json({ status: false, msg: "username or password is wrong" });
    adminfind.pass = undefined;
    const token = generateToken(adminfind._id);
    res.cookie("adminjwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxage: maxage * 1000,
    });

    res.status(200).json({
      status: true,
      admindetails: adminfind,
      msg: "admin succesfully logged in",
    });
    console.log(adminfind);
  } catch (error) {
    res.status(400).json({ status: false, msg: "unexpected error ocured" });
  }
};
// get usercount and post cout
export const getAllcount = async (req, res) => {
  try {
    const postcount = (await Post.find()).length;
    const usercount = (await user.find()).length;
    res.status(200).json({
      status: true,
      postcount: postcount,
      usercount: usercount,
      msg: "count fetched",
    });
  } catch (error) {
    res.status(400).json({ status: true, msg: "error happend" });
  }
};
//get all user
export const getAlluser = async (req, res) => {
  try {
    const userdata = await user.find();
    console.log(userdata);
    res.status(200).json({
      status: true,
      userdata: userdata,
      msg: "sucessfully fetched userdata",
    });
  } catch (error) {
    res.status(400).json({ status: false, msg: "unexpected error happends" });
  }
};
//change status of the user
export const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const Userdetails = await user.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );
    const updateddata = await user.find();
    res
      .status(200)
      .json({ status: true, userdata: updateddata, msg: "status changed" });
    console.log(Userdetails);
  } catch (error) {
    res.status(400).json({ status: false, msg: "unexpected error ocured" });
  }
};
export const getReportedpost = async (req, res) => {
  try {
    const allpost = await Post.find();

    const reportedpost = allpost.filter((e) => e.report.length);
    res.status(200).json({
      status: true,
      reported: reportedpost,
      msg: "succesfully fetched reported post",
    });
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
};
export const restrictpost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletpost = await Post.findByIdAndUpdate(
      id,
      {
        deleteflag: !req.body.value,
      },
      {
        new: true,
      }
    );
    const updatedpost = await Post.find();
    const reportedpost = updatedpost.filter((e) => e.report.length);

    res.status(200).json({
      status: true,
      reportedpost: reportedpost,
      msg: "post restricted",
    });
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
};
