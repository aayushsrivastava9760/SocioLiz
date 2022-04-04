const express = require("express")
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')
const commentRoute = require('./routes/comments')

dotenv.config()

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to MongoDB");
});

// middleware

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))
app.use(helmet())
app.use(cors())
app.options('*', cors())
app.use(morgan("common"))


app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)
app.use("/api/comments",commentRoute)


const port = process.env.PORT || 8800

app.listen(port,()=>{
    console.log(`Server is listening on port ${port} ...`)
})