import React from 'react'
import { TodoContext } from './todo-context';

export function TodoItem(props) {
    return <TodoContext.Consumer>
            {value => {
                return <li className={`todo ${props.todo.completed ? 'completed' : ''}`}>
                    <div className="view">
                        <input type="checkbox" onChange={(e) => value.handleComplete(props.todo.id, e)} defaultChecked={`${props.todo.completed ? true : ''}`} className="toggle"/>
                        <label>{props.todo.title}</label>
                        <button className="destroy" onClick={() => value.handleRemove(props.todo.id)}></button>
                    </div>
                    <input type="text" className="edit"/>
                </li>
            }}
        </TodoContext.Consumer>

}