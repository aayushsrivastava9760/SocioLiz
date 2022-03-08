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

// const multer = require("multer")
// const path = require("path")

dotenv.config()

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to MongoDB");
});

// app.use("/images", express.static(path.join(__dirname, "/public/images")))
// app.use("/images", express.static(path.extname))

// middleware

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan("common"))

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/images")
//     },
//     filename: (req,file,cb)=>{
//         const today = new Date()
//         cb(null,today.getDate() + '-' + today.getMonth() + '-' + today.getHours() + file.originalname)
//     }
// })

// const upload = multer({storage:storage})

// app.post("/api/upload", upload.single("file"), (req,res)=>{
//     try {
//         console.log(req.body.name);
//         return res.status(200).json("File uploaded successfully!")
//     } catch (error) {
//         console.log(error);
//     }
// })

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)


app.listen(8800,()=>{
    console.log(`Server is listening on port 8800 ...`)
})