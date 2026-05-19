import { motion } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import React from 'react'

function TreeNode({ node, level, isHighlighted, onSelect, showTamperDemo, onPositionCalculated, isCompact, onLeafClick }) {
  const nodeRef = React.useRef(null)

  React.useEffect(() => {
    if (nodeRef.current && onPositionCalculated) {
      const rect = nodeRef.current.getBoundingClientRect()
      const parentRect = nodeRef.current.offsetParent?.getBoundingClientRect()
      if (parentRect) {
        onPositionCalculated(node.id, {
          x: Math.round(rect.left - parentRect.left + rect.width / 2),
          y: Math.round(rect.top - parentRect.top + rect.height / 2),
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
        onClick={() => {
          if (isLeaf) {
            if (showTamperDemo && onLeafClick) {
              onLeafClick(node.id)
            } else {
              onSelect(node.id)
            }
          }
        }}
        className={`
          relative rounded-xl border transition-all duration-500 text-center
          ${isCompact ? 'p-3 min-w-[120px]' : 'p-4 min-w-[150px]'}
          ${isLeaf && !isCompact ? 'min-w-[180px] cursor-pointer' : isLeaf ? 'cursor-pointer' : ''}
          ${isHighlighted
            ? isInvalid ? 'bg-invalid-red/[0.08] border-invalid-red shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'bg-primary-teal/[0.08] border-primary-teal shadow-[0_0_20px_rgba(34,211,238,0.15)]'
            : isInvalid ? 'bg-white/[0.02] border-invalid-red/40' : 'bg-white/[0.02] border-white/5 hover:border-white/20'
          }
          ${isRoot ? 'border-primary-teal/40 bg-primary-teal/[0.04]' : ''}
        `}
      >
        {!isCompact && (
          <div className="text-[8px] uppercase tracking-[0.2em] text-text-secondary font-mono mb-2">
            {isRoot ? 'Root Hash' : isLeaf ? 'Leaf Node' : `Branch L${level}`}
          </div>
        )}

        {isLeaf && (
          <div className={`${isCompact ? 'text-[10px] max-w-[105px]' : 'text-xs max-w-[150px]'} font-display font-bold text-text-primary mb-1 truncate`}>
            {node.data.title}
          </div>
        )}

        <div className={`
          font-mono font-medium tracking-tight
          ${isCompact ? 'text-[8px]' : 'text-[10px]'}
          ${isInvalid ? 'text-invalid-red' : 'text-primary-teal/90'}
        `}>
          {shortenHash(node.hash, isCompact ? 6 : 10)}
        </div>

        {/* Verification Status */}
        <div className={`
          absolute -top-1 -right-1 rounded-full border border-deep-black
          ${isCompact ? 'w-2 h-2' : 'w-3 h-3 border-2'}
          ${isInvalid ? 'bg-invalid-red shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-valid-green shadow-[0_0_8px_rgba(34,211,238,0.4)]'}
        `} />
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
            stroke={isHighlighted ? (isInvalid ? '#EF4444' : '#22D3EE') : 'rgba(255,255,255,0.15)'}
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

export default function MerkleTreeVisualization({ showTamperDemo, isCompact = false, onLeafClick }) {
  const { root, highlightedPath, selectLeaf } = useMerkleTree()
  const [treeLevels, setTreeLevels] = React.useState([])
  const [nodePositions, setNodePositions] = React.useState({})
  const containerRef = React.useRef(null)

  React.useEffect(() => {
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

  const handlePositionCalculated = React.useCallback((nodeId, position) => {
    setNodePositions(prev => {
      if (prev[nodeId]?.x === position.x && prev[nodeId]?.y === position.y) {
        return prev
      }
      return { ...prev, [nodeId]: position }
    })
  }, [])

  const handleNodeClick = (nodeId) => {
    selectLeaf(nodeId)
  }

  if (!root) return null

  return (
    <div className={`relative ${isCompact ? 'p-4 w-full' : 'p-8 lg:p-12 w-full'}`}>
      <div
        ref={containerRef}
        className={`relative mx-auto ${isCompact ? 'w-full min-h-[480px]' : 'min-w-max w-full min-h-[600px]'}`}
      >
        <ConnectionLines
          nodePositions={nodePositions}
          treeLevels={treeLevels}
          highlightedPath={highlightedPath}
        />

        <div className={`relative z-10 flex flex-col ${isCompact ? 'gap-16' : 'gap-24'}`}>
          {treeLevels.map((levelNodes, levelIdx) => (
            <div key={levelIdx} className="flex justify-around items-center gap-4">
              {levelNodes.map(node => (
                <TreeNode
                  key={node.id}
                  node={node}
                  level={levelIdx}
                  isHighlighted={highlightedPath.includes(node.id)}
                  onSelect={handleNodeClick}
                  showTamperDemo={showTamperDemo}
                  onPositionCalculated={handlePositionCalculated}
                  isCompact={isCompact}
                  onLeafClick={onLeafClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
