/**
 * Merkle Tree Utilities
 * Uses native Web Crypto API for SHA-256 hashing
 */

/**
 * Generate SHA-256 hash of input data
 * @param {string} data - Data to hash
 * @returns {Promise<string>} - Hex string of hash
 */
export async function generateHash(data) {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * Shorten hash for display
 * @param {string} hash - Full hash
 * @param {number} length - Number of characters to show on each side
 * @returns {string} - Shortened hash
 */
export function shortenHash(hash, length = 6) {
  if (!hash || hash.length < length * 2) return hash
  return `0x${hash.slice(0, length)}...${hash.slice(-length)}`
}

/**
 * Create a leaf node from project data
 * @param {Object} project - Project data
 * @returns {Promise<Object>} - Leaf node with hash
 */
export async function createLeafNode(project) {
  const data = JSON.stringify({
    id: project.id,
    title: project.title,
    description: project.description,
    techStack: project.techStack
  })
  const hash = await generateHash(data)
  
  return {
    id: project.id,
    type: 'leaf',
    hash,
    data: project,
    isValid: true,
    level: 0
  }
}

/**
 * Create an internal node from two child nodes
 * @param {Object} left - Left child node
 * @param {Object} right - Right child node
 * @param {number} level - Level in tree
 * @returns {Promise<Object>} - Internal node with hash
 */
export async function createInternalNode(left, right, level) {
  const combinedHash = left.hash + (right ? right.hash : left.hash)
  const hash = await generateHash(combinedHash)
  
  return {
    id: `node-${level}-${left.id}-${right?.id || 'single'}`,
    type: 'internal',
    hash,
    left,
    right,
    isValid: left.isValid && (right ? right.isValid : true),
    level
  }
}

/**
 * Build complete Merkle Tree from leaf nodes
 * @param {Array} leaves - Array of leaf nodes
 * @returns {Promise<Object>} - Root node of tree
 */
export async function buildMerkleTree(leaves) {
  if (leaves.length === 0) {
    return null
  }
  
  if (leaves.length === 1) {
    return leaves[0]
  }
  
  let currentLevel = [...leaves]
  let level = 1
  
  while (currentLevel.length > 1) {
    const nextLevel = []
    
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i]
      const right = currentLevel[i + 1] || null
      const parent = await createInternalNode(left, right, level)
      nextLevel.push(parent)
    }
    
    currentLevel = nextLevel
    level++
  }
  
  return currentLevel[0]
}

/**
 * Get path from leaf to root
 * @param {Object} root - Root node
 * @param {string} leafId - ID of target leaf
 * @returns {Array} - Array of nodes from leaf to root
 */
export function getPathToRoot(root, leafId) {
  const path = []
  
  function traverse(node) {
    if (!node) return false
    
    if (node.type === 'leaf' && node.id === leafId) {
      path.push(node)
      return true
    }
    
    if (node.type === 'internal') {
      if (traverse(node.left) || traverse(node.right)) {
        path.push(node)
        return true
      }
    }
    
    return false
  }
  
  traverse(root)
  return path.reverse()
}

/**
 * Validate entire tree
 * @param {Object} root - Root node
 * @returns {boolean} - True if all nodes are valid
 */
export function validateTree(root) {
  if (!root) return true
  
  if (root.type === 'leaf') {
    return root.isValid
  }
  
  const leftValid = root.left ? validateTree(root.left) : true
  const rightValid = root.right ? validateTree(root.right) : true
  
  return root.isValid && leftValid && rightValid
}

/**
 * Mark node and ancestors as invalid
 * @param {Object} root - Root node
 * @param {string} leafId - ID of tampered leaf
 * @returns {Object} - Updated tree
 */
export function markInvalidPath(root, leafId) {
  function traverse(node) {
    if (!node) return false
    
    if (node.type === 'leaf' && node.id === leafId) {
      node.isValid = false
      return true
    }
    
    if (node.type === 'internal') {
      const leftInvalid = traverse(node.left)
      const rightInvalid = node.right ? traverse(node.right) : false
      
      if (leftInvalid || rightInvalid) {
        node.isValid = false
        return true
      }
    }
    
    return false
  }
  
  traverse(root)
  return root
}

/**
 * Get all leaf nodes from tree
 * @param {Object} root - Root node
 * @returns {Array} - Array of all leaf nodes
 */
export function getAllLeaves(root) {
  const leaves = []
  
  function traverse(node) {
    if (!node) return
    
    if (node.type === 'leaf') {
      leaves.push(node)
    } else {
      traverse(node.left)
      traverse(node.right)
    }
  }
  
  traverse(root)
  return leaves
}

/**
 * Get tree statistics
 * @param {Object} root - Root node
 * @returns {Object} - Tree statistics
 */
export function getTreeStats(root) {
  let leafCount = 0
  let internalCount = 0
  let maxDepth = 0
  
  function traverse(node, depth = 0) {
    if (!node) return
    
    maxDepth = Math.max(maxDepth, depth)
    
    if (node.type === 'leaf') {
      leafCount++
    } else {
      internalCount++
      traverse(node.left, depth + 1)
      traverse(node.right, depth + 1)
    }
  }
  
  traverse(root)
  
  return {
    leafCount,
    internalCount,
    totalNodes: leafCount + internalCount,
    maxDepth
  }
}
