import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

useEffect(() => {
  localStorage.setItems(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
}, [])

function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

function handleAddTodo(e) {
  const name = todoNameRef.current.value
  if (name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
  })
    todoNameRef.current.value = null
}

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type='test' />
        <button onClick={handleAddTodo} >Add To-do item</button>
        <button>Clear completed</button>
      <div>0 items left to do!</div>
    </>
  );
}

export default App;
