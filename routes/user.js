const express = require('express');
const router = express.Router();
const User = require('../models/usermodel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

router.post('/signin', (req,res)=>{
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (error) {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
        if (user) {
            const matched=bcrypt.compare(req.body.password===user.password)

            if(matched)
            {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                const { firstname, lastname, email, role } = user
                res.status(201).json({
                    token,
                    user: {
                        firstname, lastname, email, role
                    }
                })
            }
            else{
                res.status(400).json({
                    message:"password does not match !!"
                })
            }
        }
        else {
            res.status(400).json({
                message: "user not found"
            })
        }
    })
})

 router.post('/signup', (req,res)=>{
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (user) {
            return res.status(400).json({
                message: "user alraedy regsitered"
            })
        }

        const { firstname, lastname, email, password } = req.body;

        const salt=bcrypt.gensalt(password,10);
        password= bcrypt.hash(password,salt)

        const _user = new User({

            firstname,
            lastname,
            email,
            password,
            username: Math.random().toString()

        })
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }
            if (data) {
                return res.status(201).json({
                    message: "user created successfully",
                    user: data
                })
            }
        })
    })
 })

router.post('/profile',(req,res,next)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
        // Handle token presented as a Bearer token in the Authorization header
        const token= req.headers.authorization.split(' ')[1];
        console.log('hello jwt');
        const user= jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(user)
        {
            res.status(200).json({
                message: "welcome to profile page"
            })
        }
        else{
            res.status(500).json({
                message:"unauthorized First please signin"
            })
        }
    }
    else{
        res.status(500).json({
            message:"unauthorized First please signin"
        })
    }

})

module.exports = router;