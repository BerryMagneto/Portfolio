const textarea = document.querySelector('#message')
const counter = document.querySelector('#counter')


textarea.addEventListener('input' , function() {
const length = textarea.value.length
counter.textContent = length + ' / 300 characters'

if (length > 300) {
    counter.style.color = 'red'
} else {
    counter.style.color = '#999'
}
})