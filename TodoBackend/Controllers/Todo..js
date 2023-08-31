const Todo = require('../Models/Todo')


const createTodo = async(req, res) =>{
    const todos = await Todo.create(req.body)
    res.status(200).json({success: true, message: "Todo is successfully created"})
}

const getTodos = async(req, res) =>{
    const todos = await Todo.find()
    res.json({success: true, data: todos})
}

const updateTodo = async(req, res) =>{
    const todos = await Todo.findByIdAndUpdate(req.params.id, req.body)
    res.json({success: true, message: "Todo is successfully updated"})
}

const deleteTodo = async(req, res) =>{
    const todos = await Todo.findByIdAndDelete(req.params.id)
    res.json({success: true, message: "Todo is successfully deleted"})
}

module.exports = {createTodo, getTodos, updateTodo, deleteTodo}