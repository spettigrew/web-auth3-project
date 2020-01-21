const jwt = require("jsonwebtoken")

// module.export = (req, res, next) => {
//     if (!req.jwt && !req.jwt.user) {
//         res.status(401).json({ message: "Incorrect credentials provided."})
//     } else {
//         next()
//     }
// }

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (authorization) {
    const secret = process.env.JWT_SECRET || "is your secret safe?"

    jwt.verify(authorization, secret, function(err, decodedToken) {
        if (err) {
            return res.status(401).json({ message: "Invalid token." })
        } else {
            req.token = decodedToken

            next()
    }
   })
}   else {
    return res.status(400).json({ message: "Login and try again."})
 }
}

