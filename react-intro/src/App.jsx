import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './components/Home'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-[#1a1a2e] px-8 py-4 flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-wide">DJ</span>
        <div className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'text-white font-semibold text-sm' : 'text-gray-400 text-sm hover:text-white transition-colors'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? 'text-white font-semibold text-sm' : 'text-gray-400 text-sm hover:text-white transition-colors'
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-white font-semibold text-sm' : 'text-gray-400 text-sm hover:text-white transition-colors'
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App