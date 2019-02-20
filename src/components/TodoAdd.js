import React from 'react'
import { TodoContext } from './todo-context';

export function TodoAdd() {
    return <TodoContext.Consumer>
        {value => {
            return <header className="header">
            <h1>todos</h1> <input autoFocus="autofocus" onKeyDown={value.addTodo} autoComplete="off" placeholder="What needs to be done?" className="new-todo" />
        </header>
        }}
    </TodoContext.Consumer>
}