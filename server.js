const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authenticate = require('./auth/authenticate-middleware.js')
const authRouter = require('./auth/auth-router.js')
const commRouter = require('./database/commentary/commentary-router')
const postsRouter = require('./database/posts/posts-router')
const commentsOnPostsRouter = require('./database/comments_on_posts/comments_on_posts-router')

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


server.use('/api/auth', authRouter)
server.use('/commentary', commRouter)
server.use('/posts', postsRouter)
server.use('/comments-on-posts', commentsOnPostsRouter)


//custom middleware (write it from scatch)
server.get("/", (req, res) => {
    res.status(200).send(`<h1>Server is up and running</h1>`)
})

module.exports = server