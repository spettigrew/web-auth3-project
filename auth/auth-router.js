const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("../users/user-model")
const restricted = require("../middleware/restricted")
const jwt = require("jsonwebtoken")

const router = express.Router()


function signToken(user) {
    const payload = {
        username: user.username, 
        role: "student", 
    }

    const secret = process.env.JWT_SECRET || "is your secret safe?"

    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, secret, options)
}


router.post("/register", async (req, res, next) => {
    try {
        const savedUser = await userModel.add(req.body)
        return res.status(201).json(savedUser)
    } catch (err) {
        next (err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password, department } = req.body
        const user = await userModel.findBy({ username })
        .first()


    } catch (err) {
        next (err)
    }
})

router.get("/protected", restricted, async (req, res, next) => {
    try{
        return res.status(200).json({ message: "You are authorized", })

    } catch (err) {
        next(err)
    }
})

router.get("/logout", restricted, (req, res, next) => {
   req.jwt.destroy((err) => {
       if (err) {
           next(err)
       } else {
           return res.status(200).json({ message: "Successfully logged out."})
       }
   })
})

module.exports = router

// Users.findBy({ username }).first()
// try {
//     const token = signToken(user)
//     if (user && bcrypt.compare(password, user.password)) {
//         return res.status(200).json({ token, 
//         message: `Welcome ${ user.username}!`})
//     } else {
//         return res.status(401).json({ message: "Invalid Credentials" })
//     } catch (err) {
//         next (err)
//     }
// }
// Where in in the userModel can I have this function. 