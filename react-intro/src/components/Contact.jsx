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
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">Contact</h1>
        <p className="text-green-500 text-lg">Thanks {form.name}! I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1a1a2e] mb-8">Contact</h1>
      <div className="flex flex-col gap-4 max-w-lg">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a1a2e]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a1a2e]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a1a2e]"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#1a1a2e] text-white px-6 py-3 rounded-lg text-sm font-semibold self-start hover:opacity-80 transition-opacity"
        >
          Send message
        </button>
      </div>
    </div>
  )
}

export default Contact