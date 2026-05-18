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
    <section id="merkle-tree" className="relative overflow-hidden scroll-mt-24 py-24 md:py-32">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Proof of Work</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 leading-tight">Merkle Tree Verification</h3>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl font-light">
              Every project is a cryptographic leaf in this tree. Select a project below to trace its verification path, or use the tamper demo to see how blockchain-grade integrity works.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setShowTamperDemo(!showTamperDemo)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 border ${
                showTamperDemo 
                ? 'bg-invalid-red/10 border-invalid-red/50 text-invalid-red shadow-lg shadow-invalid-red/10' 
                : 'bg-white/[0.03] border-white/10 text-text-primary hover:border-primary-teal/50 hover:bg-white/[0.06]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {showTamperDemo ? 'Stop Tampering' : 'Try Tamper Demo'}
            </button>

            {!isTreeValid && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={remineTree}
                disabled={isMining}
                className="px-6 py-3 rounded-2xl bg-primary-teal text-deep-black font-bold flex items-center gap-3 hover:scale-[1.02] transition-transform disabled:opacity-50"
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
        </div>

        {/* Tree Integrity Status Overlay (Fixed or neatly placed) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center gap-4">
             <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="none" />
                    <motion.circle
                      cx="28" cy="28" r="24"
                      stroke={treeHealth === 100 ? "#22D3EE" : "#EF4444"}
                      strokeWidth="4" fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 151" }}
                      animate={{ strokeDasharray: `${(treeHealth/100)*151} 151` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono text-text-primary">
                    {treeHealth}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-mono mb-1">System Health</div>
                  <div className={`text-sm font-bold font-display ${treeHealth === 100 ? 'text-primary-teal' : 'text-invalid-red'}`}>
                    {treeHealth === 100 ? 'Integrity Verified' : 'Integrity Compromised'}
                  </div>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {showTamperDemo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:col-span-3 p-6 rounded-2xl bg-invalid-red/[0.03] border border-invalid-red/20 backdrop-blur-sm flex items-center gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-invalid-red/10 flex items-center justify-center text-invalid-red shrink-0 animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <p className="text-sm text-invalid-red/90 leading-relaxed font-light">
                  <strong className="block mb-1 text-base">Simulation Mode: Data Tampering</strong>
                  Click on any project leaf below to simulate an attack. Watch as the hash collision breaks the entire branch's verification up to the root.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MerkleTreeVisualization showTamperDemo={showTamperDemo} />
        
        <div className="mt-32">
          <ProjectDetails />
        </div>
      </div>
    </section>
  )
}
