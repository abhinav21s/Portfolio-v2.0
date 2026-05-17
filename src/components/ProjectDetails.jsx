import { motion, AnimatePresence } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { projects } from '../data/portfolioData'
import { shortenHash } from '../utils/merkleTree'

export default function ProjectDetails() {
  const { selectedLeaf, clearSelection, highlightedPath, root } = useMerkleTree()

  const selectedProject = projects.find(p => p.id === selectedLeaf)

  if (!selectedProject) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className="relative mt-12"
      >
        <div className="premium-card overflow-hidden rounded-2xl border-primary-teal/40">
          <div className="border-b border-primary-teal/20 bg-primary-teal/10 px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-primary-teal/20 border border-primary-teal rounded-full text-xs font-mono text-primary-teal">
                    LEAF NODE
                  </span>
                  <span className="text-xs font-mono text-text-secondary">
                    {shortenHash(selectedProject.id, 4)}
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={clearSelection}
                className="rounded-lg p-2 transition-colors duration-200 hover:bg-card-darker"
                aria-label="Close project details"
              >
                <svg className="w-6 h-6 text-text-secondary hover:text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary-teal uppercase tracking-wider mb-3">
                    Description
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary-teal uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-card-darker border border-primary-teal/30 rounded-full text-sm text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary-teal uppercase tracking-wider mb-3">
                    Key Challenges
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary-teal uppercase tracking-wider mb-3">
                    Results & Impact
                  </h4>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {selectedProject.results}
                  </p>
                  
                  {/* Metrics */}
                  {selectedProject.metrics && (
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="rounded-lg border border-primary-teal/20 bg-card-darker/70 p-4">
                          <div className="text-2xl font-bold text-primary-teal mb-1">
                            {value}
                          </div>
                          <div className="text-xs text-text-secondary capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Links */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-teal uppercase tracking-wider mb-3">
                    Links
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-card-darker border border-primary-teal/30 rounded-lg hover:border-primary-teal hover:bg-primary-teal/10 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-sm">GitHub</span>
                      </a>
                    )}
                    {selectedProject.links.demo && (
                      <a
                        href={selectedProject.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-teal text-deep-black font-semibold rounded-lg hover:bg-primary-cyan transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Path */}
            <div className="mt-8 pt-8 border-t border-primary-teal/20">
              <h4 className="text-sm font-semibold text-primary-teal uppercase tracking-wider mb-4">
                Cryptographic Path to Root
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {highlightedPath.map((nodeId, index) => (
                  <div key={nodeId} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-card-darker border border-primary-teal/30 rounded text-xs font-mono text-primary-teal">
                      {shortenHash(nodeId, 3)}
                    </span>
                    {index < highlightedPath.length - 1 && (
                      <svg className="w-4 h-4 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-3">
                This path shows how this project's data contributes to the root hash, ensuring immutability and verifiability.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
