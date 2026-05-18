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
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 lg:py-0">
      <div className="quiet-grid absolute inset-0 opacity-20" aria-hidden="true" />
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-teal/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full p-[2px] bg-gradient-to-tr from-primary-teal to-primary-cyan shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-card-darker border-4 border-deep-black">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-valid-green rounded-full border-4 border-deep-black shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-teal/5 border border-primary-teal/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-teal animate-pulse" />
                <span className="text-[11px] font-bold text-primary-teal uppercase tracking-widest">Available for Opportunities</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight mb-2">
                {personalInfo.name}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-primary-teal mb-5">
                {personalInfo.title}
              </h2>
              
              <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Building reliable backend systems and exploring blockchain technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-7 py-3.5 bg-text-primary text-deep-black font-bold rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-primary-teal translate-y-full transition-transform group-hover:translate-y-0" />
              </button>
              <button
                onClick={() => scrollToSection('merkle-tree')}
                className="px-7 py-3.5 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-text-primary font-bold rounded-full"
              >
                Explore Tree
              </button>
            </motion.div>

            {/* Root Hash Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 border-t border-white/5 pt-8"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-mono text-primary-teal">{root ? shortenHash(root.hash, 12) : '...'}</span>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest">Merkle Root Status</span>
              </div>
              <div className="h-8 w-[1px] bg-white/5" />
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isTreeValid ? 'bg-valid-green' : 'bg-invalid-red'} shadow-[0_0_10px_rgba(34,211,238,0.2)]`} />
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                  {isTreeValid ? 'Verified Integrity' : 'Syncing...'}
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
