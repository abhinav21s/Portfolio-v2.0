import { Suspense, lazy } from 'react'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import { MerkleTreeProvider } from './store/merkleStore'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const MerkleTreeSection = lazy(() => import('./components/MerkleTreeSection'))
const Experience = lazy(() => import('./components/Experience'))
const BeyondTheChain = lazy(() => import('./components/BeyondTheChain'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <MerkleTreeProvider>
      <div className="min-h-screen bg-deep-black text-text-primary selection:bg-primary-teal/30">
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <Navigation />
        <Hero />
        <Suspense
          fallback={
            <div className="grid min-h-[40vh] place-items-center bg-deep-black px-6 text-center text-sm font-mono text-text-secondary">
              Loading portfolio sections...
            </div>
          }
        >
          <About />
          <Skills />
          <Projects />
          <MerkleTreeSection />
          <Experience />
          <BeyondTheChain />
          <Contact />
          <Footer />
        </Suspense>
        <BackToTop />
      </div>
    </MerkleTreeProvider>
  )
}

export default App
