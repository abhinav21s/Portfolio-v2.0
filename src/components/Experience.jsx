import { motion } from 'framer-motion'
import { experience, leadership } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mb-20">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">The Journey</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">Career Path</h3>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl font-light">
            A track record of building reliable systems and leading teams towards technical excellence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Work */}
          <div className="space-y-16">
            <div className="flex items-center gap-6">
               <div className="h-[1px] w-12 bg-primary-teal/50" />
               <h4 className="text-2xl font-display font-bold text-text-primary uppercase tracking-wider">
                 Professional
               </h4>
            </div>
            
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-primary-teal/20 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                      <div>
                        <h5 className="text-2xl font-display font-bold text-text-primary mb-2">{exp.title}</h5>
                        <p className="text-lg text-primary-teal font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono text-text-secondary uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-lg text-text-secondary leading-relaxed mb-10 font-light">{exp.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-base text-text-secondary group/item">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-teal/40 group-hover/item:bg-primary-teal transition-colors flex-shrink-0" />
                          <span className="group-hover/item:text-text-primary transition-colors font-light">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-16">
             <div className="flex items-center gap-6">
                <div className="h-[1px] w-12 bg-primary-cyan/50" />
                <h4 className="text-2xl font-display font-bold text-text-primary uppercase tracking-wider">
                  Leadership & Impact
                </h4>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadership.map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary-cyan/20 transition-all duration-500"
                >
                  <div className="mb-6">
                    <h5 className="text-xl font-display font-bold text-text-primary mb-2">{lead.title}</h5>
                    <p className="text-primary-cyan text-sm font-medium">{lead.organization}</p>
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed mb-6 font-light">{lead.description}</p>
                  <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">{lead.period}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
