// ── Nav scroll effect ──
const navbar = document.getElementById('navbar')

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-link')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'))
      const id = entry.target.getAttribute('id')
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`)
      if (activeLink) activeLink.classList.add('active')
    }
  })
}, { threshold: 0.4 })

sections.forEach(section => observer.observe(section))

// ── Scroll fade-in animation ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })

sections.forEach(section => fadeObserver.observe(section))

// ── Character counter ──
const textarea = document.querySelector('#message')
const counter = document.querySelector('#counter')

if (textarea && counter) {
  textarea.addEventListener('input', () => {
    const length = textarea.value.length
    counter.textContent = `${length} / 300 characters`
    counter.style.color = length > 300 ? '#ff4444' : ''
  })
}

// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})