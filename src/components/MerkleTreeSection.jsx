import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useMerkleTree } from '../store/merkleStore'
import MerkleTreeVisualization from './MerkleTreeVisualization'
import ProjectDetails from './ProjectDetails'

export default function MerkleTreeSection() {
  const { isMining, remineTree, tamperedLeafId, isTreeValid, selectedLeaf, clearSelection } = useMerkleTree()
  const [showTamperDemo, setShowTamperDemo] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const treeHealth = isTreeValid ? 100 : 65

  return (
    <section id="merkle-tree" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-5xl mb-10">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Cryptographic Integrity</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">Merkle Tree Ledger</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest">
              <span className="text-text-secondary">System Integrity</span>
              <span className={isTreeValid ? 'text-primary-teal' : 'text-invalid-red'}>{treeHealth}%</span>
              <span className={`h-2 w-2 rounded-full ${isTreeValid ? 'bg-valid-green animate-pulse-slow' : 'bg-invalid-red animate-pulse-fast'}`} />
            </div>
            <div className="h-px w-12 bg-white/10" />
            <button
              onClick={() => setShowTamperDemo(!showTamperDemo)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                showTamperDemo
                ? 'bg-invalid-red/10 border-invalid-red/50 text-invalid-red shadow-lg shadow-invalid-red/10'
                : 'bg-white/[0.03] border-white/10 text-text-primary hover:border-primary-teal/50 hover:bg-white/[0.06]'
              }`}
            >
              {showTamperDemo ? 'Stop Tampering' : 'Try Tamper Demo'}
            </button>
            <button
              onClick={remineTree}
              disabled={isMining || isTreeValid}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                isMining || isTreeValid
                ? 'opacity-50 cursor-not-allowed bg-white/[0.01] border-white/5 text-text-secondary'
                : 'bg-primary-teal/10 border-primary-teal/50 text-primary-teal hover:bg-primary-teal hover:text-deep-black shadow-lg shadow-primary-teal/10'
              }`}
            >
              {isMining ? 'Mining...' : 'Re-mine Tree'}
            </button>
            {tamperedLeafId && (
              <span className="text-xs font-mono uppercase tracking-widest text-invalid-red animate-pulse">
                Mutation detected at {tamperedLeafId}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6">
            <div className="premium-card rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[580px]">
              <div className="absolute top-6 left-6 z-20">
                <h4 className="text-sm font-display font-bold text-text-primary mb-1">Visual Ledger</h4>
                <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">Compact View</p>
              </div>

              <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl text-[10px] font-bold bg-white/5 border border-white/10 text-text-primary hover:bg-primary-teal hover:text-deep-black transition-all uppercase tracking-widest"
              >
                Expand Tree
              </button>

              <MerkleTreeVisualization showTamperDemo={showTamperDemo} isCompact={true} />
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
                <MerkleTreeVisualization showTamperDemo={showTamperDemo} isCompact={false} />
              </div>

              <div className="mt-8 text-center text-text-secondary text-xs font-light">
                Click on any project node to view details or try the tamper demo to see blockchain integrity in action.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedLeaf && (
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
