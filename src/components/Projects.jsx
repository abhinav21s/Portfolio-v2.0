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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-primary-teal/30 transition-all duration-500 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2 group-hover:text-primary-teal transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">{project.id}</span>
                  </div>
                  <div className="flex gap-4">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-10 flex-1 font-light text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono uppercase tracking-[0.1em] px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-text-secondary group-hover:border-primary-teal/20 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-xl font-display font-bold text-text-primary mb-1">{value}</div>
                      <div className="text-[9px] text-text-secondary uppercase tracking-[0.2em]">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleViewInTree(project.id)}
                  className="mt-12 w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-text-primary font-bold text-sm hover:bg-primary-teal hover:text-deep-black transition-all flex items-center justify-center gap-3 group/btn overflow-hidden relative"
                >
                  <span className="relative z-10">Verify Integrity</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  <div className="absolute inset-0 bg-primary-teal translate-y-full transition-transform group-hover/btn:translate-y-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
