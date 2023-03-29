import jwt from "jsonwebtoken";
import user from "../models/Usermodel.js";
export const verifytoken = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
  //  console.log("reached");

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedtoken) => {
        if (err) {
          res.status(401).json({ status: false, message: "jwt token expired" });
        } else {
          const userfind = await user.findById(decodedtoken.id);
         // console.log(userfind);
          const status = userfind.status;
          if (!status)
            return res
              .status(401)
              .json({ status: false, message: "user gets blocked" });
          req.user = decodedtoken.id;
          next();
        }
      });
    } else {
      res.status(401).json({ status: false, message: "jwt token missing" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
