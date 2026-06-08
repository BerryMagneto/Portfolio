const projects = [
  {
    id: 1,
    title: 'To-Do App',
    description: 'Task manager with filter, complete, delete, and localStorage persistence.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://berrymagneto.github.io/Portfolio/todo',
    github: 'https://github.com/BerryMagneto/Portfolio/tree/main/todo'
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Real-time weather search using the Open-Meteo API.',
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    live: 'https://berrymagneto.github.io/Portfolio/weather',
    github: 'https://github.com/BerryMagneto/Portfolio/tree/main/weather'
  },
  {
    id: 3,
    title: 'React To-Do App',
    description: 'Rebuilt to-do app in React with components, useState, useEffect, and localStorage.',
    tags: ['React', 'JavaScript', 'CSS'],
    live: '#',
    github: '#'
  }
]

function Projects() {
  return (
    <div className="page">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.live} target="_blank" rel="noreferrer">Live Site</a>
              <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects