const jwt = require("jsonwebtoken")
const secret = require("../data/db-config")

function signToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: "student",
    }

    const options = {
        expiresIn: "2h"
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = signToken;