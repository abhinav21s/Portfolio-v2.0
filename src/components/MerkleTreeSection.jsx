import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMerkleTree } from '../store/merkleStore'
import MerkleTreeVisualization from './MerkleTreeVisualization'
import ProjectDetails from './ProjectDetails'

export default function MerkleTreeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isTreeValid, isMining, remineTree, tamperedLeafId } = useMerkleTree()
  const [showTamperDemo, setShowTamperDemo] = useState(false)

  return (
    <section id="merkle-tree" className="py-32 px-6 bg-deep-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Abhinav's Merkle Tree
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto mb-8">
            Every project is a leaf in this tree. Click any project to explore details and see the cryptographic path to the root. 
            Try the tamper demo to see how blockchain ensures data integrity.
          </p>
          <div className="w-20 h-1 bg-primary-teal mx-auto" />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {!isTreeValid && (
            <button
              onClick={remineTree}
              disabled={isMining}
              className="px-6 py-3 bg-accent-amber text-deep-black font-semibold rounded-lg hover:bg-accent-amber/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label="Re-mine the Merkle tree"
            >
              {isMining ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mining...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Re-mine Chain
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setShowTamperDemo(!showTamperDemo)}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
              showTamperDemo
                ? 'bg-invalid-red text-white'
                : 'bg-card-dark border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-deep-black'
            }`}
            aria-label="Toggle tamper demonstration mode"
          >
            {showTamperDemo ? 'Exit Tamper Demo' : 'Try Tamper Demo'}
          </button>
        </motion.div>

        {/* Info Banner */}
        {showTamperDemo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-card-dark border-l-4 border-primary-teal rounded-lg"
          >
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-primary-teal flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Tamper Demonstration Mode</h3>
                <p className="text-text-secondary">
                  Click on any project card below to "tamper" with its data. Watch how the hash invalidation propagates up the tree to the root, 
                  demonstrating blockchain's core principle of data integrity. Click "Re-mine Chain" to recalculate all hashes and restore validity.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tree Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MerkleTreeVisualization showTamperDemo={showTamperDemo} />
        </motion.div>

        {/* Project Details */}
        <ProjectDetails />

        {/* Educational Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 bg-card-dark border border-primary-teal/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary-teal">What is a Merkle Tree?</h3>
            <p className="text-text-secondary leading-relaxed">
              A Merkle tree is a fundamental data structure in blockchain technology. Each leaf contains data (like a project), 
              and each parent node contains a hash of its children. The root hash represents the entire tree. 
              If any data changes, all hashes along the path to the root change, making tampering immediately detectable. 
              This elegant structure enables efficient verification of large datasets—a principle I apply to building robust, verifiable systems.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
