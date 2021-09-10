var jwt = require('jsonwebtoken');
// function auth(req,res,next){
//     const token =req.header('auth-token')
//     if(!token){
//         return res.status(401).send('access denied')
        
//     }
//     try {
//         const verified=jwt.verify(token,process.env.TOKEN)
//         req.user=verified
//         next()
//     } catch (error) {
//         res.status(400).send('invled token')
//     }
// }

// jwt verify 2nd style

const auth =(req,res,next)=>{
    const {authorization}= req.headers;
    try {
        const token = authorization.split(' ')[1]
        const decoded=jwt.verify(token,process.env.TOKEN)
        req.user=decoded
        next()
    } catch (error) {
        res.status(400).send('invled token')
    }
}


module.exports=auth