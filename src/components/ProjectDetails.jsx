import { motion } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { projects } from '../data/portfolioData'

export default function ProjectDetails() {
  const { selectedLeaf } = useMerkleTree()
  const project = projects.find(p => p.id === selectedLeaf)
  
  if (!project) return null

  const features = project.features || project.techStack || []
  const challenges = project.challenges ? project.challenges.split(', ').slice(0, 1) : []
  const results = project.results ? project.results.split('. ').filter(s => s).slice(0, 1) : []

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-2 h-full overflow-hidden"
    >
      <header className="mb-0.5">
        <h4 className="text-lg font-display font-bold text-text-primary leading-none">
          {project.title}
        </h4>
        <p className="text-primary-teal text-[11px] font-medium uppercase leading-none mt-0.5">
          {project.tagline}
        </p>
      </header>

      <div className="space-y-1">
        <section>
          <p className="text-[11px] text-text-primary leading-tight font-light line-clamp-2">
            {project.description}
          </p>
        </section>

        <section>
          <h5 className="text-[10px] text-primary-teal uppercase font-bold border-b border-white/5 leading-none pb-0.5 mb-0.5">Features</h5>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-0">
            {features.slice(0, 4).map((f, i) => (
              <li key={i} className="flex items-center gap-1 text-[11px] text-text-secondary font-light truncate leading-none py-0.5">
                <span className="text-primary-teal">•</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h5 className="text-[10px] text-primary-teal uppercase font-bold border-b border-white/5 leading-none pb-0.5 mb-0.5">Challenges</h5>
          <p className="text-[11px] text-text-secondary font-light leading-none py-0.5 truncate">
            {challenges[0]}
          </p>
        </section>

        <section>
          <h5 className="text-[10px] text-primary-teal uppercase font-bold border-b border-white/5 leading-none pb-0.5 mb-0.5">Results</h5>
          <p className="text-[11px] text-text-secondary font-light leading-none py-0.5 truncate">
            {results[0]}
          </p>
        </section>
      </div>

      <div className="flex gap-2 mt-1.5 pt-1 border-t border-white/5">
        {project.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-1 rounded-md bg-primary-teal text-deep-black font-bold text-[10px] text-center transition-all"
          >
            Live Demo
          </a>
        )}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-1 rounded-md bg-white/5 border border-white/10 text-text-primary font-bold text-[10px] text-center transition-all"
          >
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  )
}
