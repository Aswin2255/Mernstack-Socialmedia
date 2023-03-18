import jwt from "jsonwebtoken";
import user from "../models/Usermodel.js";
export const verifyadmintoken = async (req, res, next) => {
  try {
    let token = req.cookies.adminjwt;
    console.log("reached");

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedtoken) => {
        if (err) {
          res.status(401).json({ status: false, msg: "jwt token expired" });
        } else {
          req.admin = decodedtoken.id;
          next();
        }
      });
    } else {
      res.status(401).json({ status: false, msg: "jwt token missing" });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
};