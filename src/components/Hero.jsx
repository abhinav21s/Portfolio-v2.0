import { motion, useReducedMotion } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import { personalInfo } from '../data/portfolioData'

export default function Hero() {
  const { root, isTreeValid } = useMerkleTree()
  const shouldReduceMotion = useReducedMotion()

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 sm:pt-32 lg:px-10 lg:pb-24">
      <div className="quiet-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary-teal/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-deep-black to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-primary-teal/25 bg-card-dark/70 px-4 py-2 text-xs font-semibold text-primary-teal shadow-lg shadow-black/20 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-valid-green" />
            Available for full-stack and Web3 work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.04] text-text-primary sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-6 text-xl font-medium text-primary-teal sm:text-2xl"
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl lg:mx-0"
          >
            {personalInfo.tagline} I design calm interfaces over reliable systems, with backend discipline and blockchain-grade verification.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary-teal px-7 py-4 text-base font-bold text-deep-black shadow-xl shadow-primary-teal/20 transition-all hover:-translate-y-0.5 hover:bg-primary-cyan hover:shadow-primary-teal/25"
              aria-label="View featured projects"
            >
              View Projects
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection('merkle-tree')}
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-primary-teal/30 bg-card-dark/70 px-7 py-4 text-base font-bold text-primary-teal backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary-teal hover:bg-primary-teal/10"
              aria-label="Explore the Merkle Tree"
            >
              Explore Tree
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M10 18h4" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.44 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {[
              ['Focus', 'Backend systems'],
              ['Web3', 'Smart contracts'],
              ['Base', personalInfo.location],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">{label}</div>
                <div className="mt-1 text-sm font-semibold text-text-primary">{value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="premium-card overflow-hidden rounded-2xl p-4 sm:p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-card-darker">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.name} portrait`}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent p-5 pt-20">
                <div className="rounded-xl border border-primary-teal/20 bg-deep-black/70 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                      Merkle root
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${isTreeValid ? 'bg-valid-green' : 'bg-invalid-red'}`} />
                  </div>
                  <div className={`break-all font-mono text-xl font-bold ${isTreeValid ? 'text-primary-teal' : 'text-invalid-red'}`}>
                    {root ? shortenHash(root.hash, 10) : 'Building tree...'}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    {isTreeValid ? 'Valid, traceable project graph' : 'Integrity changed, re-mine to restore'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-primary-teal/20 bg-card-dark/90 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-md sm:block">
            <div className="text-3xl font-bold text-primary-teal">20+</div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">Projects</div>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-text-secondary/70 transition-colors hover:text-primary-teal md:flex"
        aria-label="Scroll to explore"
      >
        <span className="text-xs font-mono uppercase tracking-[0.18em]">Scroll to explore</span>
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-10 w-7 place-items-center rounded-full border border-white/20"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  )
}
