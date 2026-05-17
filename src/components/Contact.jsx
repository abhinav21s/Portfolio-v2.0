import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => setSubmitStatus(null), 5000)
  }

  return (
    <section id="contact" className="section-shell bg-gradient-to-b from-deep-black to-card-dark/20" ref={ref}>
      <div className="section-divider" />
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          description="Interested in collaborating on backend systems, blockchain products, or polished full-stack applications? Let's connect."
          isInView={isInView}
        />

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Let's Build Something Immutable
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Whether you're looking for a backend engineer, blockchain developer, or someone who brings athletic discipline to code, I'd love to hear from you.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.social.email}`}
                className="group flex items-center gap-4 rounded-xl border border-primary-teal/20 bg-card-dark/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-teal hover:bg-card-darker"
              >
                <div className="w-12 h-12 bg-primary-teal/10 rounded-lg flex items-center justify-center group-hover:bg-primary-teal/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Email</div>
                  <div className="text-text-primary font-semibold">{personalInfo.social.email}</div>
                </div>
              </a>

              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-primary-teal/20 bg-card-dark/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-teal hover:bg-card-darker"
              >
                <div className="w-12 h-12 bg-primary-teal/10 rounded-lg flex items-center justify-center group-hover:bg-primary-teal/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-primary-teal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">GitHub</div>
                  <div className="text-text-primary font-semibold">@abhinavsharma</div>
                </div>
              </a>

              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-primary-teal/20 bg-card-dark/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-teal hover:bg-card-darker"
              >
                <div className="w-12 h-12 bg-primary-teal/10 rounded-lg flex items-center justify-center group-hover:bg-primary-teal/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-primary-teal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">LinkedIn</div>
                  <div className="text-text-primary font-semibold">Abhinav Sharma</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="premium-card space-y-6 rounded-2xl p-6 sm:p-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-primary-teal/25 bg-card-dark px-4 py-3 text-text-primary placeholder-text-secondary transition-colors duration-200 focus:border-primary-teal focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-primary-teal/25 bg-card-dark px-4 py-3 text-text-primary placeholder-text-secondary transition-colors duration-200 focus:border-primary-teal focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-primary-teal/25 bg-card-dark px-4 py-3 text-text-primary placeholder-text-secondary transition-colors duration-200 focus:border-primary-teal focus:outline-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-teal px-8 py-4 font-semibold text-deep-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-cyan disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary-teal/20 border border-primary-teal rounded-lg text-primary-teal text-center"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
