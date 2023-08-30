import React from 'react'
import "./Todo.css"

function Todo(props) {
    const { list, deleteItem, clickItem, updateItem } = props

    const { id, task, isCompleted } = list

  return (
    <li className='list-card'>
        <div className='input-card'>
            <input type='checkbox' className='input-check' id={id} checked={isCompleted} onChange={() => clickItem(list)} />
            <label className={isCompleted ? "label checked" : "label"} htmlFor={id}>{task}</label>
        </div>
        <div className='icon-card'>
            {!isCompleted && <svg style={{marginRight: "5px", cursor: "pointer"}} onClick={() => updateItem(list)} width="20" height="20" fill="#3eac20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 3.023a2.21 2.21 0 0 0-1.57.657l-7.43 7.406-.164.164-.047.234-.516 2.625-.234 1.102 1.102-.234 2.625-.516.234-.047.164-.164 7.406-7.43a2.226 2.226 0 0 0-1.57-3.797Zm0 1.454c.176 0 .349.09.516.257.334.334.334.698 0 1.032L12 13.03l-1.29.258.26-1.288 7.265-7.266c.167-.167.34-.257.516-.257ZM3 6v15h15v-9.89l-1.5 1.5v6.89h-12v-12h6.89l1.5-1.5H3Z"></path>
            </svg>}
            <svg style={{marginLeft: "5px", cursor: "pointer"}} onClick={() => deleteItem(id)} width="18" height="18" fill="none" stroke="#f60404"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m5.25 5.25.938 15c.044.867.675 1.5 1.5 1.5h8.625c.828 0 1.447-.633 1.5-1.5l.937-15"></path>
                <path d="M3.75 5.25h16.5"></path>
                <path d="M9 5.25V3.375a1.122 1.122 0 0 1 1.125-1.125h3.75A1.121 1.121 0 0 1 15 3.375V5.25"></path>
                <path d="M12 8.25v10.5"></path>
                <path d="M8.625 8.25 9 18.75"></path>
                <path d="M15.375 8.25 15 18.75"></path>
            </svg>
        </div>
    </li>
  )
}

export default Todo