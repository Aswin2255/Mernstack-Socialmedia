import multer from 'multer';
/* file storage */

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../frontend/public/assets')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload = multer ({storage})

export default upload