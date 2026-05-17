import { motion } from 'framer-motion'
import { experience, leadership } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">The Journey</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">Experience & Leadership</h3>
        </div>

        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Work */}
          <div className="space-y-12">
            <h4 className="text-xl font-display font-bold text-text-primary flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </span>
               Professional
            </h4>
            
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card p-8 rounded-3xl relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h5 className="text-xl font-display font-bold text-text-primary">{exp.title}</h5>
                      <p className="text-primary-teal font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">{exp.period}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6">{exp.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-teal flex-shrink-0" />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-12">
             <h4 className="text-xl font-display font-bold text-text-primary flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-primary-cyan/10 flex items-center justify-center text-primary-cyan">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
               </span>
               Leadership
            </h4>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card p-6 rounded-3xl"
                >
                  <div className="mb-4">
                    <h5 className="text-lg font-display font-bold text-text-primary">{lead.title}</h5>
                    <p className="text-primary-cyan text-sm">{lead.organization}</p>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{lead.description}</p>
                  <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">{lead.period}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
