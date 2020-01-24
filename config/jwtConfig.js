
module.exports = {
    
    jwtSecret: process.env.JWT_SECRET || "Unicorns are not real, sorry.",
    options: { 
        expiresIn: process.env.JWT_EXPIRATION || "2h" 
    } 

}