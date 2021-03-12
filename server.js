const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authenticate = require('./auth/authenticate-middleware.js')
const authRouter = require('./auth/auth-router.js')
const carsRouter = require('./database/cars/cars-router')


const server = express()

server.use(helmet())

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

server.use(cors(corsOptions))
server.use(express.json())

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allows-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})


server.use('/users', authRouter)
server.use('/cars', carsRouter)



//custom middleware (write it from scatch)
server.get("/", (req, res) => {
    res.status(200).send(`<h1>Server is up and running</h1>`)
})

module.exports = server