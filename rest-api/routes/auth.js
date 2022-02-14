const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// register

router.post("/register", async (req,res)=>{
    try {
        // generate hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create new user 
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })

        // save user and respond
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

// login

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).send("user not found")
        // if(!user){
        //     res.status(404).send("user not found")
        // }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).send("Invalid Password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router