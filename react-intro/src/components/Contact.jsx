import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page">
        <h1>Contact</h1>
        <p className="success">Thanks {form.name}! I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Contact</h1>
      <div className="form">
        <label>Your name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
        />
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
        />
        <label>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="5"
        />
        <button onClick={handleSubmit}>Send message</button>
      </div>
    </div>
  )
}

export default Contact