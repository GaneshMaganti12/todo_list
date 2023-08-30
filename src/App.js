import React, { useState, useEffect } from "react"
import axios from "axios"
import {v4 as uuidv4} from "uuid"
import './App.css';
import Todo from "./components/Todo/Todo";

function App() {

  const [todoList, setTodoList] = useState([])
  const [todoTask, setTodoTask] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  useEffect(() =>{
    getData()
  },[])

  const getData = async() =>{
    try {
      const res = await axios.get("http://localhost:3001/todolist")
      setTodoList(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async() =>{
    const newData = {
      id: uuidv4(),
      task: todoTask,
      isCompleted: false
    }

    try {
      await axios.post("http://localhost:3001/todolist", newData)
    } catch (error) {
      console.log(error)
    }
    getData()
    setTodoTask("")
  }

  const deleteItem = async(id) =>{
    try {
      await axios.delete(`http://localhost:3001/todolist/${id}`)
    } catch (error) {
      console.log(error);
    } 
    getData()
  }

  const clickItem = async({id, task, isCompleted}) =>{
    try {
      const updatedData = {
        id,
        task,
        isCompleted: !isCompleted
      }
      await axios.patch(`http://localhost:3001/todolist/${id}`, updatedData)
    } catch (error) {
      console.log(error);
    }

    getData()
  }

  const updateItem = ({id, task}) =>{
    setTodoTask(task)
    setIsEdit(true)
    setUpdateId(id)
  }

  const updatedTodo = async() =>{
    try {
      const updatedData = {
        id: updateId,
        task: todoTask,
        isCompleted: false
      }
      await axios.patch(`http://localhost:3001/todolist/${updateId}`, updatedData)
    } catch (error) {
      console.log(error);
    }
    getData()
    setIsEdit(false)
  }


  return (
    <div className="app-container">
      <div className="app-card">
        <h1>Todo List</h1>
        <div className="input-button-card">
          <input type="text" className="input" placeholder="Enter the task..." value={todoTask} onChange={(e) => setTodoTask(e.target.value)} />
          {!isEdit ? ( 
            <button className="button add" onClick={addTodo}>Add</button>
            ) : (
              <button className="button update" onClick={updatedTodo}>Update</button>
            )
          }
        </div>
        <hr/>
        <ul className="list-container">
          {todoList.map((todo) => (
            <Todo 
            list={todo} 
            key={todo.id} 
            deleteItem={deleteItem}
            clickItem={clickItem}
            updateItem={updateItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
