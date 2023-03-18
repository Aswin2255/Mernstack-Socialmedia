import multer from "multer";
/* file storage */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("hii reached multer");
    console.log(file);
    cb(null, "../frontend/public/assets");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

export default upload;
