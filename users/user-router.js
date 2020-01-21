
const express = require("express")
const userModel = require("./user-model")
const restricted = require("../middleware/restricted")

const router = express.Router()

router.get('/', restricted, checkRole("admin"), async (req, res, next) => {
    try {
        const users = await userModel.find()

        return res.status(200).json(users)
    } catch (err) {
        next (err)
    }
})

function checkRole(role) {
    return function(req, res, next) {
        if(req.token && role === req.token.role) {
            next()
        } else {
            return res.status(403).json({ message: "You are not authorized." })
        }
    }
}

module.exports = router