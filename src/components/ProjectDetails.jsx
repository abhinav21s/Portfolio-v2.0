import { motion, AnimatePresence } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { projects } from '../data/portfolioData'
import { shortenHash } from '../utils/merkleTree'

export default function ProjectDetails() {
  const { selectedLeaf, clearSelection, highlightedPath } = useMerkleTree()
  const selectedProject = projects.find(p => p.id === selectedLeaf)

  if (!selectedProject) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep-black/90 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="premium-card w-full max-w-3xl rounded-[2.5rem] overflow-hidden relative max-h-[90vh] overflow-y-auto"
        >
          <button 
            onClick={clearSelection}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-primary-teal transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono bg-primary-teal/10 text-primary-teal px-3 py-1 rounded-full border border-primary-teal/20">VERIFIED LEAF</span>
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">{selectedProject.id}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary">{selectedProject.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary-teal mb-3">Context</h4>
                  <p className="text-text-secondary leading-relaxed">{selectedProject.description}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary-teal mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map(t => (
                      <span key={t} className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/5 text-text-secondary">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary-teal mb-3">Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                        <div className="text-xl font-display font-bold text-text-primary">{value}</div>
                        <div className="text-[10px] text-text-secondary uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary-teal mb-3">Verification Path</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {highlightedPath.map((node, i) => (
                      <div key={node} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-primary-teal/70">{shortenHash(node, 4)}</span>
                        {i < highlightedPath.length - 1 && <span className="text-text-secondary opacity-30">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-4">
               {selectedProject.links.github && (
                <a href={selectedProject.links.github} target="_blank" rel="noreferrer" className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-text-primary font-bold text-center hover:bg-white/10 transition-colors">GitHub Repository</a>
               )}
               {selectedProject.links.demo && (
                <a href={selectedProject.links.demo} target="_blank" rel="noreferrer" className="flex-1 py-4 rounded-xl bg-primary-teal text-deep-black font-bold text-center hover:scale-105 transition-transform shadow-lg shadow-primary-teal/20">Live Preview</a>
               )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
