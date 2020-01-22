const bcrypt = require("bcryptjs")
const express = require("express")
const UserModel = require("../users/user-model")
const restricted = require("../middleware/restricted")
const signToken = require("../users/user-token")

const router = express.Router()


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

        const user = await UserModel.findBy({ username })
        .first()
        
        if (user && bcrypt.compare(password, user.password)) {
            const token = signToken(user)

            return res.status(200).json({ 
            token, 
            message: `Welcome ${ user.username}!`})

    } else {
        return res.status(401).json({ message: "Invalid Credentials, you may not continue forward." })

    } 
  
    } catch (err) {
        next(err)
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