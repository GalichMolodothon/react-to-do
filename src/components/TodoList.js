import React from 'react'
import { TodoContext } from './todo-context';

import { TodoItem } from './TodoItem'

export function TodoList() {
    
    return <TodoContext.Consumer>
    {value => {

        let filteredTodos = value.todos.filter(todo => {
                
            if(value.filter === 'all') return true;
            if(value.filter === 'active' && !todo.completed) return true;
            if(value.filter === 'completed' && todo.completed) return true;
            
            return false
        });

        return <section className="main">
        <input type="checkbox" className="toggle-all" />
        <ul className="todo-list">
            {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} /> )}
        </ul>
    </section>
    }}
  </TodoContext.Consumer>
    
}

// export class TodoList extends React.Component {
    
//     render() {

//         let value = this.context;
        
//         let filteredTodos = value.todos.filter(todo => {
        
//             if(value.filter === 'all') return true
//             if(value.filter === 'active' && !todo.completed) return true
//             if(value.filter === 'completed' && todo.completed) return true
            
//             return false
//         })
        
//         return <section className="main">
//             <input type="checkbox" className="toggle-all" />
//             <ul className="todo-list">
//                 {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} /> )}
//             </ul>
//         </section>
//     }
// }

// TodoList.contextType = TodoContext;
