import jwt from 'jsonwebtoken';
export const verifytoken = async(req,res,next)=>{
    try {
        let token = req.header('Authorization');
        if(!token){
            return res.send(403).send('Acess denied no token')
        }
        if(token.startsWith("Bearer")){
            token = token.slice(7,token.length).trimLeft();
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}