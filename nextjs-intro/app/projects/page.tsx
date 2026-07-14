import LikeButton from '../components/LikeButton'


interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  live: string
  github: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NYC Restaurant Finder',
    description: 'Search restaurants across Brooklyn neighborhoods using OpenStreetMap data.',
    tags: ['React', 'TypeScript', 'Tailwind', 'API'],
    live: 'https://berrymagneto.github.io/NYC-Restaurant-Finder',
    github: 'https://github.com/BerryMagneto/NYC-Restaurant-Finder'
  },
  {
    id: 2,
    title: 'NYC Transit Alerts',
    description: 'MTA-style subway service alerts dashboard with line filtering.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    live: 'https://berrymagneto.github.io/transit-app',
    github: 'https://github.com/BerryMagneto/transit-app'
  },
  {
    id: 3,
    title: 'Weather App',
    description: 'Real-time weather search using the Open-Meteo API.',
    tags: ['JavaScript', 'HTML', 'CSS', 'API'],
    live: 'https://berrymagneto.github.io/Portfolio/weather',
    github: 'https://github.com/BerryMagneto/Portfolio'
  }
]

export default function Projects() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-5xl font-bold mb-4">Projects</h1>
        <p className="text-gray-400 mb-12">Things I've built and shipped.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:border-white/30 transition-colors"
            >
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-400 text-sm flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={project.live} target="_blank" rel="noreferrer" className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Live Site
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="text-xs font-semibold border border-white/30 text-white px-4 py-2 rounded-lg hover:border-white transition-colors">
                  GitHub
                </a>
              </div>
              <LikeButton />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}