function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">No tasks yet. Add one above.</p>
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.done ? 'done' : ''}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.text}</span>
          <button className="delete" onClick={() => onDelete(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList