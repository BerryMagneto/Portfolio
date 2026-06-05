const taskSummary = document.querySelector('#task-summary')
const input = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')
const list = document.querySelector('#todo-list')
const emptyMsg = document.querySelector('#empty-msg')
const filterBtns = document.querySelectorAll('.filter-btn')
const taskCount = document.querySelector('#task-count')
let currentFilter = 'all'


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

  const filtered = todos.filter(function(todo) {
    if (currentFilter === 'active') return !todo.done
    if (currentFilter === 'completed') return todo.done
    return true
  })

  const remaining = todos.filter(function(todo) {
    return !todo.done
  }).length

  taskCount.textContent = remaining + ' task' + (remaining === 1 ? '' : 's') + ' remaining'
  const summaryParts = ['all', 'active', 'completed'].map(function(filter) {
    if (filter === 'all') return todos.length + ' total'
    if (filter === 'active') return todos.filter(t => !t.done).length + ' active'
    if (filter === 'completed') return todos.filter(t => t.done).length + ' completed'
  })

  taskSummary.textContent = summaryParts.join(' . ')
  
  if (filtered.length === 0) {
    emptyMsg.style.display = 'block'
    return
  }

  emptyMsg.style.display = 'none'

  filtered.forEach(function(todo, index) {
    const realIndex = todos.indexOf(todo)
    const li = document.createElement('li')
    if (todo.done) li.classList.add('done')

    li.innerHTML = `
      <input type="checkbox" ${todo.done ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button class="delete">✕</button>
    `

    li.querySelector('input').addEventListener('change', function() {
      todos[realIndex].done = !todos[realIndex].done
      saveTodos()
      renderTodos()
    })

    li.querySelector('.delete').addEventListener('click', function() {
      todos.splice(realIndex, 1)
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

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        currentFilter = btn.dataset.filter
        filterBtns.forEach(function(b) {
            b.classList.remove('active')
        })
        btn.classList.add('active')
        renderTodos()
    })
})