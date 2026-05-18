import { motion } from 'framer-motion'
import { projects } from '../data/portfolioData'
import { useMerkleTree } from '../store/merkleStore'

export default function Projects() {
  const { selectLeaf } = useMerkleTree()

  const handleViewInTree = (projectId) => {
    const element = document.getElementById('merkle-tree')
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
      setTimeout(() => selectLeaf(projectId), 800)
    }
  }

  return (
    <section id="projects" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mb-20">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Selected Work</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">Engineering Projects</h3>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl font-light">
            A showcase of my work ranging from decentralized protocols to high-performance backend architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="premium-card rounded-3xl overflow-hidden flex flex-col group"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-display font-bold text-text-primary group-hover:text-primary-teal transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-[9px] font-mono text-primary-teal uppercase tracking-widest">{project.id}</span>
                  </div>
                  <div className="flex gap-3">
                    {project.links?.github && (
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary-teal transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                    {project.links?.demo && (
                      <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary-teal transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.map(tech => (
                    <span key={tech} className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 border border-white/10 text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
                  {Object.entries(project.metrics || {}).slice(0, 2).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-sm font-bold text-text-primary">{value}</div>
                      <div className="text-[9px] text-text-secondary uppercase tracking-widest">{key}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleViewInTree(project.id)}
                  className="mt-6 w-full py-3 rounded-xl bg-primary-teal/5 border border-primary-teal/20 text-primary-teal font-bold text-xs hover:bg-primary-teal hover:text-deep-black transition-all"
                >
                  Verify Integrity
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
