const projects = [
  {
    id: 1,
    title: "To-Do App",
    description: "Task manager with filter, complete, delete, and localStorage.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://berrymagneto.github.io/Portfolio/todo",
    github: "https://github.com/BerryMagneto/Portfolio"
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather search using the Open-Meteo API.",
    tags: ["HTML", "CSS", "JavaScript", "REST API"],
    live: "https://berrymagneto.github.io/Portfolio/weather",
    github: "https://github.com/BerryMagneto/Portfolio"
  }
]

function Projects() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1a1a2e] mb-8">Projects</h1>
      <div className="flex flex-col gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-[#1a1a2e] text-lg mb-2">{project.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{project.description}</p>
            <div className="flex gap-2 mb-3">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <a href={project.live} target="_blank" rel="noreferrer" className="text-xs font-semibold border border-[#1a1a2e] text-[#1a1a2e] px-3 py-1 rounded-md">Live Site</a>
              <a href={project.github} target="_blank" rel="noreferrer" className="text-xs font-semibold border border-[#1a1a2e] text-[#1a1a2e] px-3 py-1 rounded-md">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects