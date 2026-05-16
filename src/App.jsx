import { useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import MerkleTreeSection from './components/MerkleTreeSection'
import Experience from './components/Experience'
import BeyondTheChain from './components/BeyondTheChain'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { MerkleTreeProvider } from './store/merkleStore'

function App() {
  return (
    <MerkleTreeProvider>
      <div className="min-h-screen bg-deep-black text-text-primary">
        <Hero />
        <About />
        <Skills />
        <MerkleTreeSection />
        <Experience />
        <BeyondTheChain />
        <Contact />
        <Footer />
      </div>
    </MerkleTreeProvider>
  )
}

export default App
