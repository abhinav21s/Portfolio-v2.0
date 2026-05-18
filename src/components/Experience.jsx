import { motion } from 'framer-motion'
import { experience, leadership } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mb-12">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">The Journey</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6">Career Path</h3>
          <p className="text-base text-text-secondary leading-relaxed max-w-2xl font-light">
            A track record of building reliable systems and leading teams towards technical excellence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Work Experience Timeline */}
          <div className="relative border-l-2 border-white/5 ml-4 md:ml-0 md:left-1/2 md:translate-x-[-1px]">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute top-0 w-3 h-3 rounded-full bg-primary-teal shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10 
                                 ${i % 2 === 0 
                                   ? 'right-[-1.5px] md:right-0 md:translate-x-1/2' 
                                   : 'left-[-1.5px] md:left-0 md:-translate-x-1/2'}`} 
                />
                
                <div className="premium-card p-5 md:p-6 rounded-2xl group">
                  <span className="inline-block text-[9px] font-mono text-primary-teal uppercase tracking-widest mb-2 px-3 py-0.5 rounded-full bg-primary-teal/5 border border-primary-teal/10">
                    {exp.period}
                  </span>
                  <h4 className="text-lg md:text-xl font-display font-bold text-text-primary mb-1 group-hover:text-primary-teal transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-primary-cyan text-sm font-medium mb-1">{exp.company}</p>
                  <p className="text-[10px] font-mono text-primary-teal/70 uppercase tracking-widest mb-3">{exp.type}</p>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <ul className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="text-[10px] text-text-secondary bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-full">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leadership Section */}
          <div className="mt-32">
            <div className="flex items-center gap-4 mb-12">
               <h4 className="text-2xl font-display font-bold text-text-primary tracking-tight">
                 Leadership & Impact
               </h4>
               <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card p-8 rounded-3xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="text-lg font-display font-bold text-text-primary mb-1">{lead.title}</h5>
                      <p className="text-primary-cyan text-sm">{lead.organization}</p>
                    </div>
                    <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">{lead.period}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{lead.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
