const express = require('express')
const router= express.Router()
const{CreateUser,resisterUser}=require ('../controller/userCont')
const {access}=require('../controller/access')
const veryfy=require('../router/veryfyToken')
router.post('/resistation',CreateUser)
router.post('/login',resisterUser)


router.get('/',veryfy,access)


module.exports=router