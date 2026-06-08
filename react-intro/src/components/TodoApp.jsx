import { useState, useEffect } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

function TodoApp() {
  const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('react-todos')
  return saved ? JSON.parse(saved) : []
})
const [filter, setFilter] = useState('all')

// Save to localStorage whenever todos changes
useEffect(() => {
  localStorage.setItem('react-todos', JSON.stringify(todos))
}, [todos])

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text: text,
      done: false
    }
    setTodos([...todos, newTodo])
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.done
    if (filter === 'completed') return todo.done
    return true
  })

  const remaining = todos.filter(t => !t.done).length

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      <div className="filters">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <p className="task-count">{remaining} task{remaining === 1 ? '' : 's'} remaining</p>
      <TodoList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  )
}

export default TodoApp