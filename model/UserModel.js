const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255,  
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255,  
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:255,  
    }
})

const user=mongoose.model('user',userSchema)

module.exports=user