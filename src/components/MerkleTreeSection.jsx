import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useMerkleTree } from '../store/merkleStore'
import { projects } from '../data/portfolioData'
import MerkleTreeVisualization from './MerkleTreeVisualization'
import ProjectDetails from './ProjectDetails'

export default function MerkleTreeSection() {
  const { 
    isMining, 
    remineTree, 
    tamperProjectData,
    tamperedLeafIds, 
    isTreeValid, 
    selectedLeaf, 
    clearSelection,
    lastAction,
    merkleRoot,
    integrity
  } = useMerkleTree()
  const [showTamperDemo, setShowTamperDemo] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editingLeafId, setEditingLeafId] = useState(null)

  const handleLeafClick = (leafId) => {
    if (showTamperDemo) {
      setEditingLeafId(leafId)
    }
  }

  return (
    <section id="merkle-tree" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-5xl mb-10">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Cryptographic Integrity</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">Merkle Tree Ledger</h3>
          
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest">
              <span className="text-text-secondary">System Integrity</span>
              <span className={isTreeValid ? 'text-primary-teal' : 'text-invalid-red'}>{integrity}%</span>
              <span className={`h-2 w-2 rounded-full ${isTreeValid ? 'bg-valid-green animate-pulse-slow' : 'bg-invalid-red animate-pulse-fast'}`} />
            </div>
            
            <div className="flex items-center gap-3 text-xs font-mono text-text-secondary border-l border-white/10 pl-6">
              <span className="uppercase tracking-widest">Status:</span>
              <span className="text-text-primary">
                {lastAction.type === 'initialized' && `Initialized: ${lastAction.timestamp}`}
                {lastAction.type === 'tampered' && `Tampered: ${lastAction.timestamp}`}
                {lastAction.type === 'remined' && `Re-mined: ${lastAction.timestamp}`}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTamperDemo(!showTamperDemo)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  showTamperDemo 
                    ? 'bg-invalid-red/10 border-invalid-red text-invalid-red hover:bg-invalid-red/20' 
                    : 'bg-primary-teal/5 border-primary-teal/20 text-primary-teal hover:bg-primary-teal/10'
                }`}
              >
                {showTamperDemo ? 'Cancel Tamper' : 'Try Tamper Demo'}
              </button>

              {!isTreeValid && (
                <button
                  onClick={remineTree}
                  disabled={isMining}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary-teal text-deep-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isMining ? (
                    <>
                      <div className="w-3 h-3 border-2 border-deep-black/30 border-t-deep-black rounded-full animate-spin" />
                      Mining...
                    </>
                  ) : 'Re-mine Tree'}
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Instruction Banner */}
          <motion.div
            initial={false}
            animate={{ 
              backgroundColor: showTamperDemo ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 211, 238, 0.1)',
              borderColor: showTamperDemo ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 211, 238, 0.2)'
            }}
            className="p-5 rounded-2xl border-2 flex items-center gap-5 transition-colors duration-500 shadow-xl"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${
              showTamperDemo ? 'bg-invalid-red/30 text-invalid-red' : 'bg-primary-teal/30 text-primary-teal'
            }`}>
              {showTamperDemo ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h4 className={`text-[16px] font-extrabold transition-colors duration-500 mb-0.5 ${showTamperDemo ? 'text-invalid-red' : 'text-primary-teal'}`}>
                {showTamperDemo ? 'Tamper Mode Activated' : 'Interactive Mode'}
              </h4>
              <p className="text-[15px] text-text-primary leading-relaxed font-semibold">
                {showTamperDemo 
                  ? 'Click on any project node below to edit its data and break the Merkle Tree. Observe the cryptographic impact.' 
                  : 'Click on any project node below to see its details and technical specifications.'}
              </p>
            </div>
            {tamperedLeafIds.length > 0 && (
              <div className="hidden sm:flex flex-col items-end gap-1 px-4 border-l border-white/10">
                <span className="text-[10px] font-mono text-invalid-red uppercase tracking-widest font-bold">Corrupted Paths</span>
                <span className="text-xl font-display font-bold text-invalid-red">{tamperedLeafIds.length}</span>
              </div>
            )}
          </motion.div>

          {merkleRoot && (
            <div className="premium-card mt-6 p-4 rounded-2xl flex items-center justify-between border-primary-teal/20 bg-primary-teal/[0.02] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-teal/70">Current Merkle Root Hash</span>
                <span className={`font-mono text-sm md:text-base break-all ${!isTreeValid ? 'text-invalid-red' : 'text-primary-teal'}`}>
                  0x{merkleRoot}
                </span>
              </div>
              <div className={`relative z-10 hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                isTreeValid ? 'border-valid-green/30 text-valid-green' : 'border-invalid-red/30 text-invalid-red'
              }`}>
                {isTreeValid ? 'Secure' : 'Corrupted'}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
            <div className="premium-card rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[580px]">
              <div className="absolute top-6 left-6 z-20">
                <h4 className="text-sm font-display font-bold text-text-primary mb-1">Visual Ledger</h4>
                <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">
                  {showTamperDemo ? 'Tamper Mode Active - Click a node to edit' : 'Compact View'}
                </p>
              </div>

              <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl text-[10px] font-bold bg-white/5 border border-white/10 text-text-primary hover:bg-primary-teal hover:text-deep-black transition-all uppercase tracking-widest"
              >
                Expand Tree
              </button>

              <MerkleTreeVisualization showTamperDemo={showTamperDemo} isCompact={true} onLeafClick={handleLeafClick} />
            </div>
        </div>
      </div>

      {/* Expanded Tree Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-deep-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-7xl h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-2xl font-display font-bold text-text-primary">Interactive Merkle Ledger</h4>
                  <p className="text-sm text-text-secondary font-mono uppercase tracking-widest mt-1">Full Explorer Mode</p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-primary hover:bg-invalid-red hover:text-white transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 min-h-0 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-y-auto overflow-x-auto relative custom-scrollbar">
                <MerkleTreeVisualization showTamperDemo={showTamperDemo} isCompact={false} onLeafClick={handleLeafClick} />
              </div>

              <div className="mt-8 text-center text-text-secondary text-xs font-light">
                {showTamperDemo ? 'Click on any leaf node to modify its data and observe the cryptographic impact.' : 'Click on any project node to view details or try the tamper demo to see blockchain integrity in action.'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tamper Modal */}
      <AnimatePresence>
        {editingLeafId && (
          <TamperModal 
            leafId={editingLeafId} 
            onClose={() => setEditingLeafId(null)} 
            onSave={(newData) => {
              tamperProjectData(editingLeafId, newData)
              setEditingLeafId(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedLeaf && !showTamperDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-deep-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={clearSelection}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="premium-card rounded-3xl overflow-hidden max-w-md w-full flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={clearSelection}
                className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-primary hover:bg-invalid-red hover:text-white transition-all shadow-lg backdrop-blur-sm"
                aria-label="Close project details"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex-1">
                <ProjectDetails />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function TamperModal({ leafId, onClose, onSave }) {
  const project = projects.find(p => p.id === leafId)
  
  const [formData, setFormData] = useState({
    title: project?.title || '',
    tagline: project?.tagline || '',
    description: project?.description || ''
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-deep-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="premium-card rounded-3xl p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h4 className="text-xl font-display font-bold text-text-primary mb-1">Tamper Project Data</h4>
          <p className="text-xs text-text-secondary uppercase tracking-widest font-mono">Modifying Node: {leafId}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1.5 font-bold">Project Title</label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-primary-teal focus:ring-1 focus:ring-primary-teal outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1.5 font-bold">Tagline</label>
            <input 
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-primary-teal focus:ring-1 focus:ring-primary-teal outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1.5 font-bold">Description</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-primary-teal focus:ring-1 focus:ring-primary-teal outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-text-primary text-xs font-bold hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 py-3 rounded-xl bg-invalid-red text-white text-xs font-bold hover:bg-invalid-red/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            Apply Tamper
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
