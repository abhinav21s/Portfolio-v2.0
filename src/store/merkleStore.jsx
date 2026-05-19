import { createContext, useContext, useState, useEffect } from 'react'
import { projects } from '../data/portfolioData'
import { 
  createLeafNode, 
  buildMerkleTree, 
  markInvalidPath,
  getPathToRoot,
  getAllLeaves,
  validateTree
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
  const [tamperedLeafIds, setTamperedLeafIds] = useState([])
  const [tamperedProjects, setTamperedProjects] = useState({})
  const [treeSalt, setTreeSalt] = useState(Math.random().toString(36).substring(7))
  const [lastAction, setLastAction] = useState({ type: 'initialized', timestamp: new Date().toLocaleTimeString() })

  // Initialize tree on mount
  useEffect(() => {
    initializeTree()
  }, [])

  async function initializeTree(isRemine = false) {
    setIsBuilding(true)
    try {
      // Create a new salt for fresh hashes on every re-mine or init
      const newSalt = Math.random().toString(36).substring(7)
      setTreeSalt(newSalt)

      // If re-mining, we use original projects, otherwise use tampered ones
      const currentTampered = isRemine ? {} : tamperedProjects

      // Create leaf nodes from projects
      const leaves = await Promise.all(
        projects.map(project => {
          const data = currentTampered[project.id] || project
          return createLeafNode(data, newSalt)
        })
      )
      
      // Build the tree
      const treeRoot = await buildMerkleTree(leaves)
      setRoot(treeRoot)
      if (isRemine) {
        setTamperedProjects({})
        setTamperedLeafIds([])
        setLastAction({ type: 'remined', timestamp: new Date().toLocaleTimeString() })
      }
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

  // New function to handle actual data tampering
  async function tamperProjectData(leafId, newData) {
    const newTamperedIds = tamperedLeafIds.includes(leafId) 
      ? tamperedLeafIds 
      : [...tamperedLeafIds, leafId]
      
    setTamperedLeafIds(newTamperedIds)
    
    const updatedTamperedProjects = { 
      ...tamperedProjects, 
      [leafId]: { ...projects.find(p => p.id === leafId), ...newData } 
    }
    setTamperedProjects(updatedTamperedProjects)
    
    // Rebuild the tree with current salt and modified data
    const leaves = await Promise.all(
      projects.map(project => {
        const data = updatedTamperedProjects[project.id] || project
        return createLeafNode(data, treeSalt)
      })
    )
    
    let updatedRoot = await buildMerkleTree(leaves)
    
    // Mark all tampered paths as invalid for visual demo
    newTamperedIds.forEach(id => {
      updatedRoot = markInvalidPath(updatedRoot, id)
    })
    
    setRoot(updatedRoot)
    
    // Highlight the path of the most recently tampered node
    const path = getPathToRoot(updatedRoot, leafId)
    setHighlightedPath(path.map(node => node.id))
    setLastAction({ type: 'tampered', timestamp: new Date().toLocaleTimeString() })
  }

  async function remineTree() {
    setIsMining(true)
    
    // Simulate mining delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Rebuild the tree with original data and NEW salt
    await initializeTree(true)
    
    setHighlightedPath([])
    setIsMining(false)
  }

  const getIntegrity = () => {
    const count = tamperedLeafIds.length
    if (count === 0) return 100
    if (count === 1) return 77
    if (count === 2) return 54
    if (count === 3) return 31
    return 18 + Math.floor(Math.random() * 3) // 18-20% for 4+
  }

  const value = {
    root,
    selectedLeaf,
    highlightedPath,
    isBuilding,
    isMining,
    tamperedLeafIds,
    tamperProjectData,
    lastAction,
    selectLeaf,
    clearSelection,
    remineTree,
    integrity: getIntegrity(),
    isTreeValid: tamperedLeafIds.length === 0,
    merkleRoot: root ? root.hash : null,
    projects: projects.map(p => tamperedProjects[p.id] || p) // Provide current (potentially tampered) data
  }

  return (
    <MerkleTreeContext.Provider value={value}>
      {children}
    </MerkleTreeContext.Provider>
  )
}
