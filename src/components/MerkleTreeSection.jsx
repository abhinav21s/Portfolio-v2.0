import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMerkleTree } from '../store/merkleStore'
import MerkleTreeVisualization from './MerkleTreeVisualization'
import ProjectDetails from './ProjectDetails'
import SectionHeading from './SectionHeading'

export default function MerkleTreeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isTreeValid, isMining, remineTree, root } = useMerkleTree()
  const [showTamperDemo, setShowTamperDemo] = useState(false)

  // Calculate tree health percentage
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
    <section id="merkle-tree" className="section-shell relative overflow-hidden bg-gradient-to-b from-deep-black via-card-darker/30 to-deep-black" ref={ref}>
      <div className="section-divider" />
      <div className="quiet-grid absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Visual Centerpiece"
          title="Abhinav's Merkle Tree"
          description="Every project is a cryptographic leaf. Select a project to trace its verification path, or use the tamper demo to see how integrity changes propagate."
          isInView={isInView}
        />

        {/* Tree Health & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="premium-card mb-8 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(148, 163, 184, 0.1)"
                        strokeWidth="6"
                        fill="none"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={treeHealth === 100 ? "#14B8A6" : "#EF4444"}
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 175.93" }}
                        animate={{ 
                          strokeDasharray: `${(treeHealth / 100) * 175.93} 175.93`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold font-mono text-text-primary">
                        {treeHealth}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">
                      Tree Health
                    </h3>
                    <p className="text-sm text-text-secondary font-mono">
                      {isTreeValid ? 'All hashes valid' : 'Integrity compromised'}
                    </p>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <AnimatePresence mode="wait">
                    {!isTreeValid && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={remineTree}
                        disabled={isMining}
                        className="flex items-center gap-2 rounded-xl bg-accent-amber px-6 py-3 font-bold text-deep-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-amber/30 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Re-mine the Merkle tree"
                      >
                        {isMining ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Mining...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Re-mine Chain</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setShowTamperDemo(!showTamperDemo)}
                    className={`rounded-xl px-6 py-3 font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                      showTamperDemo
                        ? 'bg-invalid-red text-white shadow-lg shadow-invalid-red/30'
                        : 'bg-card-dark border border-primary-teal/40 text-primary-teal hover:bg-primary-teal/10 hover:shadow-lg hover:shadow-primary-teal/20'
                    }`}
                    aria-label="Toggle tamper demonstration mode"
                  >
                    {showTamperDemo ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Exit Demo
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Try Tamper Demo
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <AnimatePresence>
              {showTamperDemo && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-r from-invalid-red/10 to-accent-amber/10 border-l-4 border-invalid-red rounded-xl backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-invalid-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-invalid-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-text-primary mb-2">
                          Tamper demonstration mode active
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                          Click on any project leaf below to simulate data tampering. Watch in real-time as the hash invalidation 
                          propagates up the tree to the root, demonstrating blockchain's fundamental principle of immutability. 
                          The glowing red path shows exactly which nodes are affected. Click <strong>"Re-mine Chain"</strong> to 
                          recalculate all hashes and restore the tree to a valid state.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <MerkleTreeVisualization showTamperDemo={showTamperDemo} />
        </motion.div>

        <ProjectDetails />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="premium-card relative mx-auto max-w-4xl overflow-hidden rounded-2xl p-7 sm:p-10">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary-teal/20 bg-primary-teal/10">
                  <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-teal">
                  What is a Merkle Tree?
                </h3>
              </div>
              
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                A Merkle tree is a fundamental cryptographic data structure in blockchain technology. Each leaf contains 
                hashed data (like a project), and each parent node contains a hash of its children's combined hashes. 
                The root hash represents the entire tree's state.
              </p>
              
              <p className="text-text-secondary text-lg leading-relaxed">
                If any data changes anywhere in the tree, all hashes along the path to the root change, making tampering 
                immediately detectable. This elegant structure enables efficient verification of large datasets—a principle 
                I apply to building robust, verifiable, and immutable systems.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
