import { motion, AnimatePresence } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import { useState, useEffect, useRef } from 'react'

function TreeNode({ node, level, isHighlighted, onSelect, showTamperDemo, onPositionCalculated }) {
  const nodeRef = useRef(null)
  
  useEffect(() => {
    if (nodeRef.current && onPositionCalculated) {
      const rect = nodeRef.current.getBoundingClientRect()
      const parentRect = nodeRef.current.offsetParent?.getBoundingClientRect()
      if (parentRect) {
        onPositionCalculated(node.id, {
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2,
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center relative"
    >
      <motion.div
        whileHover={{ y: -5 }}
        onClick={() => (isLeaf || showTamperDemo) && onSelect(node.id)}
        className={`
          relative rounded-2xl border transition-all duration-500 p-5 text-center
          ${isLeaf ? 'min-w-[200px] cursor-pointer' : 'min-w-[160px]'}
          ${isHighlighted 
            ? isInvalid ? 'bg-invalid-red/[0.08] border-invalid-red shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'bg-primary-teal/[0.08] border-primary-teal shadow-[0_0_20px_rgba(34,211,238,0.15)]'
            : isInvalid ? 'bg-white/[0.02] border-invalid-red/40' : 'bg-white/[0.02] border-white/5 hover:border-white/20'
          }
          ${isRoot ? 'border-primary-teal/40 bg-primary-teal/[0.04]' : ''}
        `}
      >
        <div className="text-[9px] uppercase tracking-[0.2em] text-text-secondary font-mono mb-2">
          {isRoot ? 'Root Hash' : isLeaf ? 'Leaf Node' : `Branch L${level}`}
        </div>
        {isLeaf && (
          <div className="text-sm font-display font-bold text-text-primary mb-2 truncate max-w-[160px]">
            {node.data.title}
          </div>
        )}
        <div className={`text-[11px] font-mono font-medium tracking-tight ${isInvalid ? 'text-invalid-red' : 'text-primary-teal/90'}`}>
          {shortenHash(node.hash, 12)}
        </div>

        {/* Verification Status */}
        <div className={`absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-deep-black ${isInvalid ? 'bg-invalid-red shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-valid-green shadow-[0_0_8px_rgba(34,211,238,0.4)]'}`} />
      </motion.div>
    </motion.div>
  )
}

function ConnectionLines({ nodePositions, treeLevels, highlightedPath }) {
  const connections = []
  
  treeLevels.forEach((levelNodes, levelIndex) => {
    if (levelIndex === treeLevels.length - 1) return
    
    levelNodes.forEach(parentNode => {
      if (parentNode.type === 'internal') {
        const parentPos = nodePositions[parentNode.id]
        
        if (parentNode.left) {
          const leftPos = nodePositions[parentNode.left.id]
          if (parentPos && leftPos) {
            connections.push({ from: parentPos, to: leftPos, isHighlighted: highlightedPath.includes(parentNode.id) && highlightedPath.includes(parentNode.left.id), isInvalid: !parentNode.isValid || !parentNode.left.isValid })
          }
        }
        
        if (parentNode.right) {
          const rightPos = nodePositions[parentNode.right.id]
          if (parentPos && rightPos) {
            connections.push({ from: parentPos, to: rightPos, isHighlighted: highlightedPath.includes(parentNode.id) && highlightedPath.includes(parentNode.right.id), isInvalid: !parentNode.isValid || !parentNode.right.isValid })
          }
        }
      }
    })
  })

  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full">
      {connections.map(({ from, to, isHighlighted, isInvalid }, i) => {
        const path = `M ${from.x} ${from.y} C ${from.x} ${(from.y + to.y) / 2}, ${to.x} ${(from.y + to.y) / 2}, ${to.x} ${to.y}`
        return (
          <motion.path
            key={i}
            d={path}
            stroke={isHighlighted ? (isInvalid ? '#EF4444' : '#22D3EE') : 'rgba(255,255,255,0.05)'}
            strokeWidth={isHighlighted ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
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
    const levels = []
    const queue = [{ node: root, level: 0 }]
    while (queue.length > 0) {
      const { node, level } = queue.shift()
      if (!levels[level]) levels[level] = []
      levels[level].push(node)
      if (node.type === 'internal') {
        if (node.left) queue.push({ node: node.left, level: level + 1 })
        if (node.right) queue.push({ node: node.right, level: level + 1 })
      }
    }
    setTreeLevels(levels)
  }, [root])

  const handlePositionCalculated = (nodeId, position) => {
    setNodePositions(prev => ({ ...prev, [nodeId]: position }))
  }

  const handleNodeClick = (nodeId) => {
    if (showTamperDemo) tamperWithLeaf(nodeId)
    else selectLeaf(nodeId)
  }

  if (!root) return null

  return (
    <div className="relative premium-card rounded-3xl p-8 lg:p-12 overflow-x-auto">
      <div 
        ref={containerRef}
        className="relative min-w-[800px] min-h-[500px]"
      >
        <ConnectionLines 
          nodePositions={nodePositions}
          treeLevels={treeLevels}
          highlightedPath={highlightedPath}
        />
        
        <div className="relative z-10 flex flex-col gap-24">
          {treeLevels.map((levelNodes, levelIdx) => (
            <div key={levelIdx} className="flex justify-around items-center">
              {levelNodes.map(node => (
                <TreeNode
                  key={node.id}
                  node={node}
                  level={levelIdx}
                  isHighlighted={highlightedPath.includes(node.id)}
                  onSelect={handleNodeClick}
                  showTamperDemo={showTamperDemo}
                  onPositionCalculated={handlePositionCalculated}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
