import { motion } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import { useState, useEffect } from 'react'

function TreeNode({ node, level, isHighlighted, onSelect, showTamperDemo }) {
  if (!node) return null

  const isLeaf = node.type === 'leaf'
  const isInvalid = !node.isValid

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: level * 0.1 }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => isLeaf && onSelect(node.id)}
        className={`
          px-6 py-4 rounded-lg border-2 cursor-pointer transition-all duration-300
          ${isLeaf ? 'min-w-[200px]' : 'min-w-[180px]'}
          ${isHighlighted 
            ? isInvalid 
              ? 'bg-invalid-red/20 border-invalid-red shadow-lg shadow-invalid-red/30' 
              : 'bg-primary-teal/20 border-primary-teal shadow-lg shadow-primary-teal/30'
            : isInvalid
              ? 'bg-card-dark border-invalid-red/50'
              : 'bg-card-dark border-primary-teal/30 hover:border-primary-teal'
          }
        `}
        role="button"
        tabIndex={0}
        aria-label={isLeaf ? `Project: ${node.data.title}` : `Tree node at level ${level}`}
      >
        <div className="text-center">
          <div className="text-xs text-text-secondary mb-2 font-mono uppercase">
            {isLeaf ? 'Leaf' : `Level ${level}`}
          </div>
          {isLeaf && (
            <div className="text-sm font-semibold text-text-primary mb-2 line-clamp-1">
              {node.data.title}
            </div>
          )}
          <div className={`text-xs font-mono ${isInvalid ? 'text-invalid-red' : 'text-primary-teal'}`}>
            {shortenHash(node.hash, 4)}
          </div>
          {showTamperDemo && isLeaf && (
            <div className="mt-2 text-xs text-text-secondary">
              Click to tamper
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function TreeLevel({ nodes, level, highlightedIds, onSelect, showTamperDemo }) {
  return (
    <div className="flex justify-center items-start gap-8 mb-12">
      {nodes.map((node, index) => (
        <TreeNode
          key={node.id}
          node={node}
          level={level}
          isHighlighted={highlightedIds.includes(node.id)}
          onSelect={onSelect}
          showTamperDemo={showTamperDemo}
        />
      ))}
    </div>
  )
}

export default function MerkleTreeVisualization({ showTamperDemo }) {
  const { root, highlightedPath, selectLeaf, tamperWithLeaf } = useMerkleTree()
  const [treeLevels, setTreeLevels] = useState([])

  useEffect(() => {
    if (!root) return

    // Build levels array for visualization
    const levels = []
    const queue = [{ node: root, level: 0 }]

    while (queue.length > 0) {
      const { node, level } = queue.shift()
      
      if (!levels[level]) {
        levels[level] = []
      }
      
      levels[level].push(node)

      if (node.type === 'internal') {
        if (node.left) queue.push({ node: node.left, level: level + 1 })
        if (node.right) queue.push({ node: node.right, level: level + 1 })
      }
    }

    setTreeLevels(levels)
  }, [root])

  const handleNodeClick = (nodeId) => {
    if (showTamperDemo) {
      tamperWithLeaf(nodeId)
    } else {
      selectLeaf(nodeId)
    }
  }

  if (!root) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary font-mono">Building Merkle Tree...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Desktop View - Tree Layout */}
      <div className="hidden lg:block overflow-x-auto pb-8">
        <div className="min-w-max px-8">
          {treeLevels.map((levelNodes, index) => (
            <TreeLevel
              key={index}
              nodes={levelNodes}
              level={index}
              highlightedIds={highlightedPath}
              onSelect={handleNodeClick}
              showTamperDemo={showTamperDemo}
            />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet View - Card Grid */}
      <div className="lg:hidden">
        <div className="mb-8 p-6 bg-card-dark border border-primary-teal/30 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-text-secondary mb-2 font-mono uppercase">
              Merkle Root
            </div>
            <div className={`text-sm font-mono ${root.isValid ? 'text-primary-teal' : 'text-invalid-red'}`}>
              {shortenHash(root.hash, 6)}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {treeLevels[treeLevels.length - 1]?.map((node) => (
            <motion.div
              key={node.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNodeClick(node.id)}
              className={`
                p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
                ${highlightedPath.includes(node.id)
                  ? node.isValid
                    ? 'bg-primary-teal/20 border-primary-teal shadow-lg'
                    : 'bg-invalid-red/20 border-invalid-red shadow-lg'
                  : node.isValid
                    ? 'bg-card-dark border-primary-teal/30 hover:border-primary-teal'
                    : 'bg-card-dark border-invalid-red/50'
                }
              `}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {node.data.title}
              </h3>
              <div className="text-xs font-mono text-text-secondary mb-3">
                {shortenHash(node.hash, 4)}
              </div>
              <p className="text-sm text-text-secondary line-clamp-2">
                {node.data.description}
              </p>
              {showTamperDemo && (
                <div className="mt-3 text-xs text-primary-teal font-semibold">
                  Tap to tamper →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection Lines Overlay (Desktop only) */}
      <svg className="hidden lg:block absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {/* SVG lines would be drawn here based on tree structure */}
        {/* This is a simplified version - you can enhance with actual path calculations */}
      </svg>
    </div>
  )
}
