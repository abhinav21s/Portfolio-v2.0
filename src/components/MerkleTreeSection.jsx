import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useMerkleTree } from '../store/merkleStore'
import MerkleTreeVisualization from './MerkleTreeVisualization'
import ProjectDetails from './ProjectDetails'

export default function MerkleTreeSection() {
  const { isTreeValid, isMining, remineTree, root } = useMerkleTree()
  const [showTamperDemo, setShowTamperDemo] = useState(false)

  const calculateTreeHealth = () => {
    if (!root) return 100
    let totalNodes = 0
    let validNodes = 0
    const traverse = (node) => {
      if (!node) return
      totalNodes++
      if (node.isValid) validNodes++
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
    }
    traverse(root)
    return totalNodes > 0 ? Math.round((validNodes / totalNodes) * 100) : 100
  }

  const treeHealth = calculateTreeHealth()

  return (
    <section id="merkle-tree" className="relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">Proof of Work</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">Merkle Tree Verification</h3>
          <p className="text-text-secondary text-lg leading-relaxed">
            Every project is a cryptographic leaf in this tree. Select a project below to trace its verification path, or use the tamper demo to see how blockchain-grade integrity works.
          </p>
        </div>

        {/* Controls & Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setShowTamperDemo(!showTamperDemo)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                showTamperDemo 
                ? 'bg-invalid-red text-white shadow-lg shadow-invalid-red/20' 
                : 'bg-white/5 border border-white/10 text-text-primary hover:border-primary-teal/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {showTamperDemo ? 'Stop Tamper Demo' : 'Try Tamper Demo'}
            </button>

            {!isTreeValid && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={remineTree}
                disabled={isMining}
                className="px-6 py-3 rounded-xl bg-primary-teal text-deep-black font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isMining ? (
                   <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                )}
                {isMining ? 'Mining...' : 'Re-mine Tree'}
              </motion.button>
            )}
          </div>

          <div className="premium-card rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="24" cy="24" r="20"
                    stroke={treeHealth === 100 ? "#22D3EE" : "#EF4444"}
                    strokeWidth="4" fill="none"
                    initial={{ strokeDasharray: "0 126" }}
                    animate={{ strokeDasharray: `${(treeHealth/100)*126} 126` }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono">
                  {treeHealth}%
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-text-secondary font-mono">Tree Integrity</div>
                <div className={`text-sm font-bold ${treeHealth === 100 ? 'text-primary-teal' : 'text-invalid-red'}`}>
                  {treeHealth === 100 ? 'Verified' : 'Compromised'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showTamperDemo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 p-6 rounded-2xl bg-invalid-red/5 border border-invalid-red/20 backdrop-blur-sm"
            >
              <p className="text-sm text-invalid-red/90 leading-relaxed">
                <strong>Tamper Demo Active:</strong> Click on any project leaf below to simulate data tampering. 
                Watch how the invalid hash propagates up to the root. This is how blockchain ensures immutability.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <MerkleTreeVisualization showTamperDemo={showTamperDemo} />
        
        <div className="mt-20">
          <ProjectDetails />
        </div>
      </div>
    </section>
  )
}
