import { motion, AnimatePresence } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import { useState, useEffect, useRef } from 'react'

function TreeNode({ node, level, isHighlighted, onSelect, showTamperDemo, position, onPositionCalculated }) {
  const nodeRef = useRef(null)
  
  useEffect(() => {
    if (nodeRef.current && onPositionCalculated) {
      const rect = nodeRef.current.getBoundingClientRect()
      const parentRect = nodeRef.current.offsetParent?.getBoundingClientRect()
      if (parentRect) {
        onPositionCalculated(node.id, {
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        })
      }
    }
  }, [node.id, onPositionCalculated])

  if (!node) return null

  const isLeaf = node.type === 'leaf'
  const isInvalid = !node.isValid
  const isRoot = level === 0

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: level * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="flex flex-col items-center relative"
    >
      <motion.div
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isLeaf && onSelect(node.id)}
        className={`
          relative px-8 py-5 rounded-xl border-2 transition-all duration-500
          ${isLeaf ? 'min-w-[240px] cursor-pointer' : isRoot ? 'min-w-[280px]' : 'min-w-[200px]'}
          ${isHighlighted 
            ? isInvalid 
              ? 'bg-invalid-red/20 border-invalid-red shadow-2xl shadow-invalid-red/40 animate-glow-path' 
              : 'bg-primary-teal/20 border-primary-teal shadow-2xl shadow-primary-teal/40 animate-glow-path'
            : isInvalid
              ? 'bg-card-dark/80 border-invalid-red/60 backdrop-blur-sm'
              : 'bg-card-dark/80 border-primary-teal/30 hover:border-primary-teal/70 hover:shadow-lg hover:shadow-primary-teal/20 backdrop-blur-sm'
          }
          ${isRoot ? 'border-4' : ''}
        `}
        role="button"
        tabIndex={0}
        aria-label={isLeaf ? `Project: ${node.data.title}` : isRoot ? 'Merkle Root' : `Tree node at level ${level}`}
      >
        {/* Glow effect for highlighted nodes */}
        {isHighlighted && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              boxShadow: [
                `0 0 20px ${isInvalid ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 211, 238, 0.3)'}`,
                `0 0 40px ${isInvalid ? 'rgba(239, 68, 68, 0.6)' : 'rgba(34, 211, 238, 0.6)'}`,
                `0 0 20px ${isInvalid ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 211, 238, 0.3)'}`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <div className="text-center relative z-10">
          <div className="text-xs text-text-secondary mb-2 font-mono uppercase tracking-wider">
            {isRoot ? '🌳 Root Hash' : isLeaf ? '🍃 Leaf' : `⬡ Level ${level}`}
          </div>
          {isLeaf && (
            <div className="text-base font-bold text-text-primary mb-3 line-clamp-2 leading-tight">
              {node.data.title}
            </div>
          )}
          <div className={`text-sm font-mono font-semibold ${isInvalid ? 'text-invalid-red' : 'text-primary-teal'}`}>
            {shortenHash(node.hash, isRoot ? 8 : 6)}
          </div>
          {showTamperDemo && isLeaf && (
            <motion.div 
              className="mt-3 text-xs text-primary-teal font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡ Click to tamper
            </motion.div>
          )}
        </div>

        {/* Status indicator */}
        <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-deep-black ${
          isInvalid ? 'bg-invalid-red' : 'bg-valid-green'
        }`} />
      </motion.div>
    </motion.div>
  )
}

function TreeLevel({ nodes, level, highlightedIds, onSelect, showTamperDemo, onPositionCalculated }) {
  return (
    <div className="flex justify-center items-start gap-12 mb-20">
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={level}
          isHighlighted={highlightedIds.includes(node.id)}
          onSelect={onSelect}
          showTamperDemo={showTamperDemo}
          onPositionCalculated={onPositionCalculated}
        />
      ))}
    </div>
  )
}

function ConnectionLines({ nodePositions, treeLevels, highlightedPath }) {
  const connections = []
  
  // Build connections between parent and child nodes
  treeLevels.forEach((levelNodes, levelIndex) => {
    if (levelIndex === treeLevels.length - 1) return // Skip leaf level
    
    levelNodes.forEach(parentNode => {
      if (parentNode.type === 'internal') {
        const parentPos = nodePositions[parentNode.id]
        
        if (parentNode.left) {
          const leftPos = nodePositions[parentNode.left.id]
          if (parentPos && leftPos) {
            const isHighlighted = highlightedPath.includes(parentNode.id) && highlightedPath.includes(parentNode.left.id)
            const isInvalid = !parentNode.isValid || !parentNode.left.isValid
            connections.push({
              from: parentPos,
              to: leftPos,
              isHighlighted,
              isInvalid,
              key: `${parentNode.id}-${parentNode.left.id}`
            })
          }
        }
        
        if (parentNode.right) {
          const rightPos = nodePositions[parentNode.right.id]
          if (parentPos && rightPos) {
            const isHighlighted = highlightedPath.includes(parentNode.id) && highlightedPath.includes(parentNode.right.id)
            const isInvalid = !parentNode.isValid || !parentNode.right.isValid
            connections.push({
              from: parentPos,
              to: rightPos,
              isHighlighted,
              isInvalid,
              key: `${parentNode.id}-${parentNode.right.id}`
            })
          }
        }
      }
    })
  })

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="gradientTeal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="gradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      
      {connections.map(({ from, to, isHighlighted, isInvalid, key }) => {
        // Create curved path
        const midY = (from.y + to.y) / 2
        const controlY = midY + 30
        
        const path = `M ${from.x} ${from.y} Q ${from.x} ${controlY}, ${(from.x + to.x) / 2} ${controlY} T ${to.x} ${to.y}`
        
        return (
          <motion.g key={key}>
            {/* Background glow for highlighted paths */}
            {isHighlighted && (
              <motion.path
                d={path}
                stroke={isInvalid ? "url(#gradientRed)" : "url(#gradientTeal)"}
                strokeWidth="6"
                fill="none"
                opacity="0.3"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}
            
            {/* Main path */}
            <motion.path
              d={path}
              stroke={isHighlighted ? (isInvalid ? "#EF4444" : "#22D3EE") : "rgba(148, 163, 184, 0.2)"}
              strokeWidth={isHighlighted ? "3" : "2"}
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isHighlighted ? 1 : 0.4,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Animated particles for highlighted paths */}
            {isHighlighted && (
              <motion.circle
                r="4"
                fill={isInvalid ? "#EF4444" : "#22D3EE"}
                filter="url(#glow)"
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path={path}
                />
              </motion.circle>
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}

export default function MerkleTreeVisualization({ showTamperDemo }) {
  const { root, highlightedPath, selectLeaf, tamperWithLeaf } = useMerkleTree()
  const [treeLevels, setTreeLevels] = useState([])
  const [nodePositions, setNodePositions] = useState({})
  const containerRef = useRef(null)

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

  const handlePositionCalculated = (nodeId, position) => {
    setNodePositions(prev => ({
      ...prev,
      [nodeId]: position
    }))
  }

  const handleNodeClick = (nodeId) => {
    if (showTamperDemo) {
      tamperWithLeaf(nodeId)
    } else {
      selectLeaf(nodeId)
    }
  }

  if (!root) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <motion.div 
            className="w-20 h-20 border-4 border-primary-teal border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-text-secondary font-mono text-lg">Building Merkle Tree...</p>
          <p className="text-text-secondary/60 text-sm mt-2">Calculating cryptographic hashes</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Desktop View - Tree Layout with SVG Connections */}
      <div className="hidden lg:block">
        <div 
          ref={containerRef}
          className="relative min-h-[600px] py-12"
        >
          {/* SVG Connection Lines */}
          <ConnectionLines 
            nodePositions={nodePositions}
            treeLevels={treeLevels}
            highlightedPath={highlightedPath}
          />
          
          {/* Tree Nodes */}
          <div className="relative z-10">
            {treeLevels.map((levelNodes, index) => (
              <TreeLevel
                key={index}
                nodes={levelNodes}
                level={index}
                highlightedIds={highlightedPath}
                onSelect={handleNodeClick}
                showTamperDemo={showTamperDemo}
                onPositionCalculated={handlePositionCalculated}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet View - Enhanced Card Grid */}
      <div className="lg:hidden">
        {/* Root Hash Display */}
        <motion.div 
          className="mb-10 p-8 bg-gradient-to-br from-card-dark to-card-darker border-2 border-primary-teal/40 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <div className="text-xs text-text-secondary mb-3 font-mono uppercase tracking-wider">
              🌳 Merkle Root Hash
            </div>
            <div className={`text-lg font-mono font-bold mb-3 ${root.isValid ? 'text-primary-teal' : 'text-invalid-red'}`}>
              {shortenHash(root.hash, 8)}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-3 h-3 rounded-full ${root.isValid ? 'bg-valid-green' : 'bg-invalid-red'} animate-pulse`} />
              <span className="text-sm text-text-secondary font-mono">
                {root.isValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Project Leaves */}
        <div className="grid sm:grid-cols-2 gap-6">
          {treeLevels[treeLevels.length - 1]?.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNodeClick(node.id)}
              className={`
                p-6 rounded-xl border-2 cursor-pointer transition-all duration-500 backdrop-blur-sm
                ${highlightedPath.includes(node.id)
                  ? node.isValid
                    ? 'bg-primary-teal/20 border-primary-teal shadow-2xl shadow-primary-teal/30'
                    : 'bg-invalid-red/20 border-invalid-red shadow-2xl shadow-invalid-red/30'
                  : node.isValid
                    ? 'bg-card-dark/80 border-primary-teal/30 hover:border-primary-teal/70 hover:shadow-lg'
                    : 'bg-card-dark/80 border-invalid-red/60'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-text-secondary font-mono">🍃 LEAF</span>
                <div className={`w-3 h-3 rounded-full ${node.isValid ? 'bg-valid-green' : 'bg-invalid-red'}`} />
              </div>
              
              <h3 className="text-lg font-bold text-text-primary mb-3 leading-tight">
                {node.data.title}
              </h3>
              
              <div className="text-xs font-mono text-text-secondary mb-4 bg-card-darker/50 px-3 py-2 rounded">
                {shortenHash(node.hash, 6)}
              </div>
              
              <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                {node.data.description}
              </p>
              
              {showTamperDemo && (
                <motion.div 
                  className="mt-4 text-xs text-primary-teal font-semibold flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>⚡</span>
                  <span>Tap to tamper</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
