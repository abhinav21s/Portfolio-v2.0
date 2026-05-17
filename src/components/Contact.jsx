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
    <section id="contact" className="relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">Connect</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-8">Get in Touch</h3>
            <p className="text-lg text-text-secondary leading-relaxed mb-12">
              Interested in collaborating on backend systems, blockchain products, or polished full-stack applications? Let's talk about how I can help.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { label: 'LinkedIn', value: 'Abhinav Sharma', href: personalInfo.social.linkedin },
                { label: 'GitHub', value: 'abhinav21s', href: personalInfo.social.github },
              ].map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-teal group-hover:border-primary-teal/50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">{link.label}</div>
                    <div className="text-text-primary font-bold group-hover:text-primary-teal transition-colors">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-8 md:p-10 rounded-[2.5rem]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-secondary ml-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-primary-teal transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-secondary ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-primary-teal transition-colors"
                  placeholder="Email Address"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-secondary ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-primary-teal transition-colors resize-none"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-text-primary text-deep-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-center text-primary-teal text-sm font-medium">Message sent successfully!</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
