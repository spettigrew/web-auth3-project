const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
// const jwt = require("jsonwebtoken")
// const dbConfig = require("./data/db-config")

const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

require("dotenv").config()

server.use("/users", userRouter)
server.use("/auth", authRouter)

server.get("/", (req, res, next) => {
    res.status(201).json({ message: "Welcome to this API."})
})

server.use((err, req, res, next) => {
    console.log("Error:", err)
    res.status(500).json({ message: "Incorrect, check your work." })
})

module.exports = server;