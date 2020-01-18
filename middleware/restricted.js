
module.export = (req, res, next) => {
    if (!req.jwt && !req.jwt.user) {
        res.status(401).json({ message: "Incorrect credentials provided."})
    } else {
        next()
    }
}