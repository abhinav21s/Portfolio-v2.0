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
  { id: 'contact', label: 'Contact' },
]

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Adjust based on navbar height
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
      
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    setIsMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        hasScrolled
          ? 'bg-deep-black/80 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3"
          aria-label="Go to home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-teal to-primary-cyan p-[1px] transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-deep-black font-display font-bold text-primary-teal">
              AS
            </div>
          </div>
          <span className="hidden font-display text-lg font-bold tracking-tight text-text-primary sm:block">
            {personalInfo.name}
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/5 p-1 backdrop-blur-md lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-teal' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-primary-teal/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary-teal"
          >
            GitHub
          </a>
          <button
            onClick={() => handleNavClick('contact')}
            className="group relative overflow-hidden rounded-full bg-text-primary px-6 py-2.5 text-sm font-bold text-deep-black transition-all hover:pr-8 active:scale-95"
          >
            <span className="relative z-10 transition-all group-hover:translate-x-[-2px]">Let's Work Together</span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 translate-x-4">
              →
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
        >
          <div className="relative h-5 w-5">
            <span className={`absolute left-0 top-1 h-0.5 w-5 bg-text-primary transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`absolute left-0 top-2.5 h-0.5 w-5 bg-text-primary transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 top-4 h-0.5 w-5 bg-text-primary transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full border-b border-white/5 bg-deep-black/95 p-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg font-medium ${
                    activeSection === item.id ? 'text-primary-teal' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-white/5" />
              <div className="flex items-center gap-6">
                 <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary"
                >
                  GitHub
                </a>
                 <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
