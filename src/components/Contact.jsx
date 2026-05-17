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
    await new Promise(r => setTimeout(r, 1500))
    setIsSubmitting(false)
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <div className="max-w-xl">
            <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Connect</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">Get in Touch</h3>
            <p className="text-lg text-text-secondary leading-relaxed mb-12 font-light">
              Interested in collaborating on backend systems, blockchain products, or polished full-stack applications? Let's talk about how I can help.
            </p>

            <div className="space-y-8">
              {[
                { label: 'Email Address', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { label: 'LinkedIn Profile', value: 'Abhinav Sharma', href: personalInfo.social.linkedin },
                { label: 'GitHub Repository', value: 'github.com/abhinav21s', href: personalInfo.social.github },
              ].map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary-teal group-hover:border-primary-teal/50 group-hover:bg-white/[0.06] transition-all duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-mono mb-1">{link.label}</div>
                    <div className="text-lg text-text-primary font-bold group-hover:text-primary-teal transition-colors duration-500">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary ml-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-primary-teal/50 focus:bg-white/[0.06] transition-all duration-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-primary-teal/50 focus:bg-white/[0.06] transition-all duration-500"
                  placeholder="Email Address"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-primary-teal/50 focus:bg-white/[0.06] transition-all duration-500 resize-none"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-5 bg-text-primary text-deep-black font-bold rounded-2xl overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 disabled:opacity-50"
              >
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <div className="absolute inset-0 bg-primary-teal translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </button>
              {status === 'success' && (
                <p className="text-center text-primary-teal text-sm font-medium animate-fade-in">Message sent successfully!</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
