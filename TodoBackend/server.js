const express = require("express")
const cors = require("cors")
const colors = require("colors")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8080
const URL = process.env.mongoDbURL
const todoRoute = require('./Routes/Todo')

const connectToDataBase = async() =>{
    try {
        await mongoose.connect(URL)
        console.log('Connected to the Database'.yellow)
    } catch (error) {
        console.log(error);
    }
}

connectToDataBase()

app.use(cors())
app.use(express.json())

app.use("/todolist", todoRoute)

app.listen(PORT, () => console.log(`server is running at port ${PORT}`.green))