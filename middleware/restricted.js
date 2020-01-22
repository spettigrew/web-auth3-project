const jwt = require("jsonwebtoken")
const secrets = require("../config/secrets")


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
// jwt is a synchronous function; does not need async/await.

// Notes from Jason's code.
// module.exports = () => {
//     return (req, res, next) => {
//         try {
//             const token = req.headers.authorization
//             const decoded = jwt.verify(token, secrets.jwt)

//             req.userId = decoded.subject
//             next()
//         } catch (err) {
//             return res.status(401).json({
//                 message: "Invalid credentials",
//             })
//         }
//     }
// }