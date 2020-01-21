
const knex = require('knex')
const knexfile = require("../knexfile")

const environment = process.env.NODE_ENV || "development"
const secret = process.env.JWT_SECRET || "Unicorns are not real, sorry."

module.exports = knex(knexfile[environment]),
secret

    // {
    //     jwt.Secret: process.env.JWT_SECRET || "Unicorns are not real, sorry."
    // }