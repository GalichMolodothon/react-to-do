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

        fetch('http://localhost:3000/todos', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(todo)
          })
        .then(res=>res.json())
        .then(res => {
          this.setState({
              todos: [...this.state.todos, res]
            }, () => {
              target.value = ''
            })
        });
      }
    };

    this.clearToDo = () => {
      this.state.todos.forEach((item) => {
        if (item.completed === true) {
          this.remove(item.id);
        }
      });
    };

    this.remove = (value) => {
      let id = value;

      fetch(`http://localhost:3000/todos/${id}`, {
          method: 'delete',
      })
      .then(res=>res.json())
      .then(() => {
        fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(todos => {
          this.setState({
            todos
          })
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

    this.complete = (todoNewStatus, e) => {
      let newStatus = e.target.checked;
      let id = todoNewStatus.id;
      let title = todoNewStatus.title;
      let todoPut = {
          id:id,
          completed:newStatus,
          title:title
      };
      fetch(`http://localhost:3000/todos/${id}`, {
          method: 'put',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(todoPut)
      })
      .then(res=>res.json())
      .then(res => {
          this.setState({
              todos: this.state.todos.map((todo) => {
                  if (todo.id === res.id) {
                      todo.completed = res.completed;
                  }
                  return todo;
              })
          });
      });
    };

    this.state = {
      todos: [],
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

  componentDidMount() {

      fetch('http://localhost:3000/todos')
      .then(response => response.json())
      .then(todos => {
          this.setState({
              todos
          })
      })
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