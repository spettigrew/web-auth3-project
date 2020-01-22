const jwt = require("jsonwebtoken")
const config = require("../config/secrets")

function signToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: "student",
    }

    return jwt.sign(payload, config.jwtSecret, config.options)
}

module.exports = signToken