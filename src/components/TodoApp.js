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
      let countItem = this.state.todos.reduce((countItem, item) => {
            if (item.completed === false) {
                countItem = countItem + 1;
            }
            return countItem;
        }, 0);

      return countItem;
    };

    this.complete = (todoId, e) => {
      let newStatus = e.target.checked;
      let id = todoId;
        this.setState({
            todos: this.state.todos.map((todo) => {
              if (todo.id == id) {
                todo.completed = newStatus;
              }
              return todo;
            })
        });
    };

    this.state = {
      todos: [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false }
      ],
      filter: 'all',
      deleted: [],
      handleFilter: this.handleFilter,
      addTodo: this.addTodo,
      handleCompleted:this.clearToDo,
      handleRemove: this.remove,
      count:this.count,
      handleComplete: this.complete
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
        <Calendar
            selected={this.state.date}
            onChange={this.handleChange}
        />

    </React.Fragment>;
  }
}