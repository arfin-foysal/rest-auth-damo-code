const express = require('express')
const app=express()
require('dotenv').config()
const Port=process.env.PORT
const mongoose=require('mongoose')
const userApi=require('./router/userRouter')
app.use(express.json())


app.use('/api',userApi)

app.get('/',(req,res)=>{
    res.send("hello")
})

const DB= process.env.DB_CONNECTION
mongoose.connect(DB).then(()=>{
    console.log("DataBase Connect");
}).catch((err)=>{
    console.log(err);
})

app.listen(Port,()=>{
    console.log(`Server is Running http://localhost:${Port}`);
})