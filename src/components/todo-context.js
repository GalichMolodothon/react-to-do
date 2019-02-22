import React from 'react'

export const defaultState = {
  todos: [
    { id: 1, title: 'Todo from default context', completed: false }],
  filter: 'all',
  deleted: [],
  activeItemCount: () => {},
  handleFilter: () => {},
  addTodo: () => {},
  handleCompleted: () => {},
  handleRemove: () => {},
  count: () => {},
  complete: () => {}
};

export const TodoContext = React.createContext(defaultState);