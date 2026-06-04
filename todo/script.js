const input = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')
const list = document.querySelector('#todo-list')
const emptyMsg = document.querySelector('#empty-msg')


let todos = []
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}
const saved = localStorage.getItem('todos')
if (saved) {
    todos = JSON.parse(saved)
    renderTodos()
}

function renderTodos() {
  list.innerHTML = ''

  if (todos.length === 0) {
    emptyMsg.style.display = 'block'
    return
  }

  emptyMsg.style.display = 'none'

  todos.forEach(function(todo, index) {
    const li = document.createElement('li')
    if (todo.done) li.classList.add('done')

    li.innerHTML = `
      <input type="checkbox" ${todo.done ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button class="delete">✕</button>
    `

    li.querySelector('input').addEventListener('change', function() {
      todos[index].done = !todos[index].done
      saveTodos()
      renderTodos()
    })

    li.querySelector('.delete').addEventListener('click', function() {
      todos.splice(index, 1)
      saveTodos()
      renderTodos()
    })

    list.appendChild(li)
  })
}

function addTodo() {
  const text = input.value.trim()
  if (text === '') return

  todos.push({ text: text, done: false })
  saveTodos()   // added this line
  input.value = ''
  renderTodos()
}

addBtn.addEventListener('click', addTodo)

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTodo()
})