import { createContext, useContext, useState, useEffect } from 'react'
import { projects } from '../data/portfolioData'
import { 
  createLeafNode, 
  buildMerkleTree, 
  markInvalidPath,
  getPathToRoot,
  getAllLeaves
} from '../utils/merkleTree'

const MerkleTreeContext = createContext()

export function useMerkleTree() {
  const context = useContext(MerkleTreeContext)
  if (!context) {
    throw new Error('useMerkleTree must be used within MerkleTreeProvider')
  }
  return context
}

export function MerkleTreeProvider({ children }) {
  const [root, setRoot] = useState(null)
  const [selectedLeaf, setSelectedLeaf] = useState(null)
  const [highlightedPath, setHighlightedPath] = useState([])
  const [isBuilding, setIsBuilding] = useState(true)
  const [isMining, setIsMining] = useState(false)
  const [tamperedLeafId, setTamperedLeafId] = useState(null)

  // Initialize tree on mount
  useEffect(() => {
    initializeTree()
  }, [])

  async function initializeTree() {
    setIsBuilding(true)
    try {
      // Create leaf nodes from projects
      const leaves = await Promise.all(
        projects.map(project => createLeafNode(project))
      )
      
      // Build the tree
      const treeRoot = await buildMerkleTree(leaves)
      setRoot(treeRoot)
    } catch (error) {
      console.error('Error building tree:', error)
    } finally {
      setIsBuilding(false)
    }
  }

  function selectLeaf(leafId) {
    if (!root) return
    
    setSelectedLeaf(leafId)
    const path = getPathToRoot(root, leafId)
    setHighlightedPath(path.map(node => node.id))
  }

  function clearSelection() {
    setSelectedLeaf(null)
    setHighlightedPath([])
  }

  function tamperWithLeaf(leafId) {
    if (!root) return
    
    setTamperedLeafId(leafId)
    const updatedRoot = markInvalidPath({ ...root }, leafId)
    setRoot(updatedRoot)
    
    // Highlight the invalid path
    const path = getPathToRoot(updatedRoot, leafId)
    setHighlightedPath(path.map(node => node.id))
  }

  async function remineTree() {
    setIsMining(true)
    
    // Simulate mining delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Rebuild the tree
    await initializeTree()
    
    setTamperedLeafId(null)
    setHighlightedPath([])
    setIsMining(false)
  }

  const value = {
    root,
    selectedLeaf,
    highlightedPath,
    isBuilding,
    isMining,
    tamperedLeafId,
    selectLeaf,
    clearSelection,
    tamperWithLeaf,
    remineTree,
    isTreeValid: root ? root.isValid : true
  }

  return (
    <MerkleTreeContext.Provider value={value}>
      {children}
    </MerkleTreeContext.Provider>
  )
}
