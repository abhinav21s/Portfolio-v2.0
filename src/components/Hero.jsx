import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'

export default function Hero() {
  const { root, isTreeValid } = useMerkleTree()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-0">
      <div className="quiet-grid absolute inset-0 opacity-40" aria-hidden="true" />
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-teal/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary-cyan/10 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Profile Photo - Left on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full p-[2px] bg-gradient-to-tr from-primary-teal to-primary-cyan shadow-2xl shadow-primary-teal/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-card-darker">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-valid-green rounded-full border-4 border-deep-black animate-pulse" />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary-teal font-mono text-sm tracking-widest uppercase mb-4">
                Available for opportunities
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text-primary tracking-tight mb-6">
                I'm <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10">
                {personalInfo.tagline} Focused on <span className="text-text-primary">Reliability</span> and <span className="text-text-primary">Performance</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-5"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-primary-teal text-deep-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary-teal/20"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('merkle-tree')}
                className="px-8 py-4 border border-white/10 hover:border-primary-teal/50 hover:bg-primary-teal/5 transition-all text-text-primary font-bold rounded-full"
              >
                Explore Tree
              </button>
            </motion.div>

            {/* Stats/Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary">2+</span>
                <span className="text-xs text-text-secondary uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary">20+</span>
                <span className="text-xs text-text-secondary uppercase tracking-wider">Projects</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="premium-card rounded-lg px-4 py-2 flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${isTreeValid ? 'bg-valid-green' : 'bg-invalid-red'}`} />
                 <span className="font-mono text-xs text-text-secondary">
                   ROOT: {root ? shortenHash(root.hash, 6) : '...'}
                 </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-teal to-transparent" />
      </motion.div>
    </section>
  )
}
