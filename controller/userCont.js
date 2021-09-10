const User = require('../model/UserModel')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { find } = require('../model/UserModel');
// validation joi
// const schema={
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required()
// }
// // validation joi






const CreateUser = async (req, res) => {

    // user allready databae
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(400).send('email alrady exis')
    }
    // user allready databae

    // hash password 1styel

    // const salt = await bcrypt.genSalt(10)
    // const hashpassword = await bcrypt.hash(req.body.password, salt)

    // hash password 2nd style
    const hashpassword = await bcrypt.hash(req.body.password, 10)


    //   const {name,email}=req.body
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })

    try {
        const saveuser = await user.save()
        res.json({
            saveuser,
            message: 'sign in sucessfull'
        })

    } catch (err) {
        res.json({ mess: 'sign up faild' })
    }
}




const resisterUser = async (req, res) => {
    // user allready databae
   try {
    const user = await User.findOne  ({ email: req.body.email })
    if (!user) {
        return res.status(400).send('email is not found')
    }

    const validpass = await bcrypt.compare(req.body.password, user.password)
    if (!validpass) {
        return res.status(400).send('invalid password')
    }

    //   1style jwt
    // const token = jwt.sign({ id: user._id }, process.env.TOKEN)
    // res.header('auth-token', token).send(token)

    // jwt 2nd style
    const token = jwt.sign({ id: user._id }, process.env.TOKEN,{expiresIn:'1h'})
    res.json({
        "auth-token":token,
        "message":"log in sucessfull"
    })
   } catch (err) {
       res.json({mess:err})
   }


}



module.exports = {
    CreateUser,
    resisterUser
}