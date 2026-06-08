import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function handleAdd() {
    if (text.trim() === '') return
    onAdd(text)
    setText('')
  }

  return (
    <div className="input-row">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TodoInput