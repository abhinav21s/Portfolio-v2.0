import { motion } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { projects } from '../data/portfolioData'

export default function ProjectDetails() {
  const { selectedLeaf } = useMerkleTree()
  const project = projects.find(p => p.id === selectedLeaf)
  
  if (!project) return null

  const features = project.features || project.techStack || []

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full p-4 overflow-hidden"
    >
      {/* Header */}
      <header className="mb-2">
        <h4 className="text-[17px] font-display font-bold text-text-primary leading-tight">
          {project.title}
        </h4>
        <p className="text-primary-teal text-[10px] font-medium uppercase tracking-widest mt-0.5">
          {project.tagline}
        </p>
      </header>

      {/* Description */}
      <p className="text-[11px] text-text-primary leading-tight font-light mb-3 line-clamp-2">
        {project.description}
      </p>

      {/* Key Features */}
      <section className="mb-3">
        <h5 className="text-[10px] text-primary-teal uppercase font-bold mb-1.5 tracking-wider">
          KEY FEATURES
        </h5>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-text-secondary leading-tight">
          {features.slice(0, 6).map((f, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-primary-teal text-xs mt-0.5">•</span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* Challenge & Result */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-[11px]">
        {project.challenges && (
          <div>
            <h5 className="text-[10px] text-primary-teal uppercase font-bold mb-1 tracking-wider">
              CHALLENGE
            </h5>
            <p className="text-text-secondary leading-tight line-clamp-3">
              {project.challenges.split(', ')[0] || project.challenges}
            </p>
          </div>
        )}

        {project.results && (
          <div>
            <h5 className="text-[10px] text-primary-teal uppercase font-bold mb-1 tracking-wider">
              RESULT
            </h5>
            <p className="text-text-secondary leading-tight line-clamp-3">
              {project.results.split('. ')[0] || project.results}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-auto flex gap-2 pt-3 border-t border-white/10">
        {project.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 rounded-md bg-primary-teal text-deep-black font-bold text-xs text-center hover:bg-teal-400 transition-all"
          >
            Live Demo
          </a>
        )}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 rounded-md bg-white/5 border border-white/10 text-text-primary font-bold text-xs text-center hover:bg-white/10 transition-all"
          >
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  )
}