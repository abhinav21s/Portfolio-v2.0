import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/portfolioData'
import { useMerkleTree } from '../store/merkleStore'
import SectionHeading from './SectionHeading'

function ProjectCard({ project, index, isInView, onViewInTree }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="premium-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-teal/40 sm:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-teal/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold text-text-primary transition-colors duration-300 group-hover:text-primary-teal">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm font-mono">
              {project.id}
            </p>
          </div>
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl border border-primary-teal/20 bg-primary-teal/10 transition-colors duration-300 group-hover:bg-primary-teal/20">
            <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 leading-7 text-text-secondary">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-primary-teal uppercase tracking-wider mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
              className="rounded-lg border border-primary-teal/20 bg-card-darker/70 px-3 py-1.5 text-sm text-text-secondary transition-colors duration-200 hover:border-primary-teal/40 hover:text-primary-teal"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-3 py-1 text-sm text-text-secondary">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-7 grid grid-cols-3 gap-3">
            {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-primary-teal/10 bg-card-darker/40 p-3">
                <div className="mb-1 text-base font-bold text-primary-teal">
                  {value}
                </div>
                <div className="text-xs text-text-secondary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-3">
          <button
            onClick={onViewInTree}
            className="group/btn flex min-w-[180px] flex-1 items-center justify-center gap-2 rounded-xl border border-primary-teal/30 bg-primary-teal/10 px-4 py-3 font-semibold text-primary-teal transition-all duration-300 hover:bg-primary-teal hover:text-deep-black"
          >
            <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>View in Merkle Tree</span>
          </button>
          
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-primary-teal/20 bg-card-darker px-4 py-3 font-semibold text-text-secondary transition-all duration-300 hover:border-primary-teal/40 hover:text-primary-teal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { selectLeaf } = useMerkleTree()

  const handleViewInTree = (projectId) => {
    // Scroll to Merkle Tree section
    const merkleSection = document.getElementById('merkle-tree')
    if (merkleSection) {
      merkleSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Select the leaf after a short delay to allow scroll
      setTimeout(() => {
        selectLeaf(projectId)
      }, 800)
    }
  }

  return (
    <section id="projects" className="section-shell bg-gradient-to-b from-deep-black to-card-darker/30" ref={ref}>
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects"
          description="Selected systems and interfaces built around reliability, performance, and clear user flows."
          isInView={isInView}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onViewInTree={() => handleViewInTree(project.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-text-secondary">
            Want to see the complete cryptographic verification?
          </p>
          <a
            href="#merkle-tree"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-teal px-8 py-4 font-bold text-deep-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-cyan hover:shadow-2xl hover:shadow-primary-teal/20"
          >
            <span>Explore the Merkle Tree</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
