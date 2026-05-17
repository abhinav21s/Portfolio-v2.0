import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personalInfo } from '../data/portfolioData'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'merkle-tree', label: 'Tree' },
  { id: 'experience', label: 'Experience' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const observedSections = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.08, 0.2, 0.4],
      }
    )

    const observeSections = () => {
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section && !observedSections.has(id)) {
          observer.observe(section)
          observedSections.add(id)
        }
      })
    }

    observeSections()
    const mutationObserver = new MutationObserver(observeSections)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    const onScroll = () => setHasScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleNavClick = (id) => {
    setIsMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
          hasScrolled
            ? 'border-primary-teal/20 bg-deep-black/80 shadow-2xl shadow-black/30 backdrop-blur-xl'
            : 'border-transparent bg-deep-black/30 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-10">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left"
            aria-label="Go to home section"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary-teal/30 bg-primary-teal/10 font-mono text-sm font-bold text-primary-teal transition-colors group-hover:border-primary-teal">
              AS
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-text-primary">{personalInfo.name}</span>
              <span className="block text-xs text-text-secondary">Full Stack Developer</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.slice(1).map((item) => {
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg border border-primary-teal/25 bg-primary-teal/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-text-secondary transition-all hover:border-primary-teal/40 hover:bg-primary-teal/10 hover:text-primary-teal"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="rounded-lg bg-primary-teal px-4 py-2 text-sm font-bold text-deep-black transition-all hover:bg-primary-cyan hover:shadow-lg hover:shadow-primary-teal/20"
            >
              Contact
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-primary-teal/25 bg-card-dark/80 text-text-primary transition-colors hover:border-primary-teal/60 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            <span className="relative h-5 w-5">
              <span className={`absolute left-0 top-1 h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`absolute left-0 top-2.5 h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden border-t border-primary-teal/20 bg-deep-black/95 backdrop-blur-xl lg:hidden"
            >
              <div className="grid gap-1 px-5 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary-teal/10 text-primary-teal'
                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavClick(item.id)}
            className={`group relative h-3 w-3 rounded-full border transition-all ${
              activeSection === item.id
                ? 'border-primary-teal bg-primary-teal shadow-lg shadow-primary-teal/30'
                : 'border-white/25 bg-white/10 hover:border-primary-teal/70'
            }`}
            aria-label={`Go to ${item.label}`}
          >
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-card-dark px-2 py-1 text-xs text-text-secondary opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
