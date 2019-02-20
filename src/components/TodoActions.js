import React from 'react'
import { TodoContext } from './todo-context';

export function TodoActions() {
    return <TodoContext.Consumer>
        {value => {
            return <footer className="footer">
            <span className="todo-count">
                {value.count()}
                <strong>
                    {value.todos.reduce((count, item) => {
                      if (item.completed === false) {
                      count = count + 1;
                    }
                      return count;
                    }, 0)}
            </strong>
                 items left</span>
            <ul className="filters">
                <li><a href="#/all" onClick={() => value.handleFilter('all')} className={`${value.filter === 'all' ? 'selected': ''}`}>All</a></li>
                <li><a href="#/active" onClick={() => value.handleFilter('active')} className={`${value.filter === 'active' ? 'selected': ''}`}>Active</a></li>
                <li><a href="#/completed" onClick={() => value.handleFilter('completed')} className={`${value.filter === 'completed' ? 'selected': ''}`}>Completed</a></li>
            </ul> 
            <button className="clear-completed" onClick={value.handleCompleted}>
                Clear completed
            </button>
        </footer>
        }}
    </TodoContext.Consumer>
}