const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },

    isCompleted: {
        type: Boolean,
        required: true
    }
})

const Todo = mongoose.model('todo', todoSchema)

module.exports = Todo