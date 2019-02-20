import React from 'react';
import { TodoContext } from './todo-context';

import './TodoApp.css';

import { TodoActions } from './TodoActions'
import { TodoList } from './TodoList'
import { TodoAdd } from './TodoAdd'

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilter = (value) => {
      this.setState({
        filter: value
      })
    };

    this.addTodo = (e) => {
      let target = e.target;
      let value = target.value;

      if(e.keyCode === 13) {

        let todo = {
          id: new Date().getTime(),
          title: value,
          completed: false
        };
  
        this.setState({
          todos: [...this.state.todos, todo]
        }, () => {
          target.value = ''
        })
      }
    };

    this.clearToDo = () => {
        this.setState({
            todos: this.state.todos.filter((item) => {
                return item.completed === false
            })
        });
    };

    this.remove = (value) => {
      let id = value;
      this.setState({
          todos: this.state.todos.filter((item) => {
              return item.id !== id
          })
      });
    };

    this.count = () => {

       // return this.state.todos.reduce((count, item) => {
       //      if (item.completed === false) {
       //          count = count + 1;
       //      }
       //      return count;
       //  }, 0)}
    };

    this.state = {
      todos: [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false }
      ],
      filter: 'all', // active, completed,
      deleted: [],
      handleFilter: this.handleFilter,
      addTodo: this.addTodo,
      handleCompleted:this.clearToDo,
      handleRemove: this.remove,
        count:this.count
    }    
  }

  render() {
    return  <React.Fragment>
      <section className="todoapp">
        <TodoContext.Provider value={this.state}>
          <TodoAdd />
          <TodoList />
          <TodoActions />
        </TodoContext.Provider>
      </section>
      <section className="todoapp">
        <TodoAdd />
        <TodoList />
        <TodoActions />
      </section>
    </React.Fragment>;
  }
}