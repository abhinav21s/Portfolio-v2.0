import { motion } from 'framer-motion'
import { useState } from 'react'
import { personalInfo } from '../data/portfolioData'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Create form data for Web3Forms
    const submissionData = {
      ...formData,
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      from_name: formData.name,
      subject: `New Portfolio Message from ${formData.name}`
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()
      
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="max-w-xl">
            <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">Connect</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6">Get in Touch</h3>
            <p className="text-base text-text-secondary leading-relaxed mb-10 font-light">
              Interested in collaborating on backend systems, blockchain products, or polished full-stack applications? Let's talk about how I can help.
            </p>

            <div className="space-y-6">
              {[
                { 
                  label: 'Email Address', 
                  value: personalInfo.email, 
                  href: `mailto:${personalInfo.email}`,
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002-2z" />
                    </svg>
                  )
                },
                { 
                  label: 'LinkedIn Profile', 
                  value: 'Abhinav Sharma', 
                  href: personalInfo.social.linkedin,
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )
                },
                { 
                  label: 'GitHub Repository', 
                  value: 'github.com/abhinav21s', 
                  href: personalInfo.social.github,
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )
                },
              ].map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary-teal group-hover:border-primary-teal/50 group-hover:bg-white/[0.06] transition-all duration-500">
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-text-secondary font-mono mb-1">{link.label}</div>
                    <div className="text-base text-text-primary font-bold group-hover:text-primary-teal transition-colors duration-500">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-secondary ml-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 text-text-primary focus:outline-none focus:border-primary-teal/50 focus:bg-white/[0.06] transition-all duration-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-secondary ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 text-text-primary focus:outline-none focus:border-primary-teal/50 focus:bg-white/[0.06] transition-all duration-500"
                  placeholder="Email Address"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-secondary ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 text-text-primary focus:outline-none focus:border-primary-teal/50 focus:bg-white/[0.06] transition-all duration-500 resize-none"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 bg-text-primary text-deep-black font-bold rounded-xl overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 disabled:opacity-50"
              >
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <div className="absolute inset-0 bg-primary-teal translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </button>
              {status === 'success' && (
                <p className="text-center text-primary-teal text-sm font-medium animate-fade-in">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-center text-invalid-red text-sm font-medium animate-fade-in">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
