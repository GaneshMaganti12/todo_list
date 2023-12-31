import React, { useState, useEffect } from "react"
import axios from "axios"
// import {v4 as uuidv4} from "uuid"                for fake backend
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
      const res = await axios.get("https://todo-list-a95f.onrender.com/todolist/todos")
      // setTodoList(res.data)               for fake backend
      setTodoList(res.data.data.map((todo) => {                 // for database backend
        return {
          id: todo._id,
          task: todo.task,
          isCompleted: todo.isCompleted
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async() =>{
    const newData = {
      // id: uuidv4(),          for fake backend
      task: todoTask,
      isCompleted: false
    }

    try {
      await axios.post("https://todo-list-a95f.onrender.com/todolist", newData)
    } catch (error) {
      console.log(error)
    }
    getData()
    setTodoTask("")
  }

  const deleteItem = async(id) =>{
    try {
      await axios.delete(`https://todo-list-a95f.onrender.com/todolist/${id}`)
    } catch (error) {
      console.log(error);
    } 
    getData()
  }

  const clickItem = async({id, task, isCompleted}) =>{
    try {
      const updatedData = {
        //id                    for fake backend
        task,
        isCompleted: !isCompleted
      }
      await axios.patch(`https://todo-list-a95f.onrender.com/todolist/${id}`, updatedData)
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
        // id: updateId           for fake backend
        task: todoTask,
        isCompleted: false
      }
      await axios.patch(`https://todo-list-a95f.onrender.com/todolist/${updateId}`, updatedData)
    } catch (error) {
      console.log(error);
    }
    getData()
    setIsEdit(false)
    setTodoTask("")
  }

  const cancelUpdate = () =>{
    setIsEdit(false)
    setTodoTask("")
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
              <>
              <button className="button update" onClick={updatedTodo}>Update</button>
              <button className="button cancel" onClick={cancelUpdate}>Cancel</button>
              </>
            )
          }
        </div>
        <hr/>
        <ul className="list-container">
          {todoList.map((todo, index) => (
            <Todo 
            list={todo}
            index={index} 
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
