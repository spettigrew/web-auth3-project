
const express = require("express")
const userModel = require("./user-model")
const restricted = require("../middleware/restricted")

const router = express.Router()

router.get('/', restricted, authorizeUser("student"), async (req, res, next) => {
    try {
        const users = await userModel.find()

        return res.status(200).json(users)
    } catch (err) {
        next (err)
    }
})
// single role
function authorizeUser(role) {
    return function(req, res, next) {
        if(req.token && role === req.token.role) {
            next()
        } else {
            console.log(req.token)
            console.log(role)
            return res.status(403).json({ message: "You are not authorized." })
        }
    }
}

// Set up functions for each access, i.e. user, student and teacher for example. Used for an array of roles as said above.

// function authorizeUser(role) {
//     return function (req, res, next) {
//         if (req.token && role && req.token.roles.includes(role)) {
//             next()
//         } else {
//             return res.status(403).json({ message: "You are not authorized." })
//         }
//     }
// }

module.exports = router