import { useState } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>('')

  function addTodo() {
    if (input.trim() === '') return
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false
    }
    setTodos([...todos, newTodo])
    setInput('')
  }

  function toggleTodo(id: number) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  return (
    <div style={{ maxWidth: '400px', margin: '48px auto', padding: '0 24px' }}>
      <h1>TypeScript To-Do</h1>
      <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#aaa' : '#222'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App