import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMerkleTree } from '../store/merkleStore'
import MerkleTreeVisualization from './MerkleTreeVisualization'
import ProjectDetails from './ProjectDetails'

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
    <section id="merkle-tree" className="py-40 px-6 bg-gradient-to-b from-deep-black via-card-darker/30 to-deep-black relative overflow-hidden" ref={ref}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-primary-teal/10 border border-primary-teal/30 rounded-full text-sm font-mono text-primary-teal backdrop-blur-sm">
              Visual Centerpiece
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-text-primary via-primary-teal to-text-primary bg-clip-text text-transparent">
            Abhinav's Merkle Tree
          </h2>
          
          <p className="text-text-secondary text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed">
            Every project is a cryptographic leaf in this tree. The root hash represents my complete professional identity. 
            Click any project to explore details and witness the elegant path of verification.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-teal to-transparent mx-auto" />
        </motion.div>

        {/* Tree Health & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            {/* Tree Health Indicator */}
            <div className="mb-8 p-6 bg-card-dark/60 backdrop-blur-md border border-primary-teal/20 rounded-2xl">
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
                      {isTreeValid ? '✓ All hashes valid' : '⚠ Integrity compromised'}
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
                        className="px-6 py-3 bg-gradient-to-r from-accent-amber to-yellow-500 text-deep-black font-bold rounded-xl hover:shadow-lg hover:shadow-accent-amber/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    className={`px-6 py-3 font-bold rounded-xl transition-all duration-300 hover:scale-105 ${
                      showTamperDemo
                        ? 'bg-invalid-red text-white shadow-lg shadow-invalid-red/30'
                        : 'bg-card-dark border-2 border-primary-teal text-primary-teal hover:bg-primary-teal/10 hover:shadow-lg hover:shadow-primary-teal/20'
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
                          ⚡ Tamper Demonstration Mode Active
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

        {/* Tree Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <MerkleTreeVisualization showTamperDemo={showTamperDemo} />
        </motion.div>

        {/* Project Details */}
        <ProjectDetails />

        {/* Educational Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="max-w-4xl mx-auto p-10 bg-gradient-to-br from-card-dark/80 to-card-darker/80 border border-primary-teal/20 rounded-2xl backdrop-blur-sm relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-cyan/5 rounded-tr-full" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-teal/10 rounded-xl flex items-center justify-center">
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
