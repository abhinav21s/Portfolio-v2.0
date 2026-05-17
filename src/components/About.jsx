import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">The Story</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-12">Behind the Code</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-6">
                <p className="text-xl text-text-primary leading-relaxed font-medium">
                  {personalInfo.bio[0]}
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {personalInfo.bio[1]}
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-text-secondary leading-relaxed">
                  {personalInfo.bio[2]}
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {personalInfo.bio[3]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/5">
              {[
                { label: 'Experience', value: '2+ Years' },
                { label: 'Projects', value: '20+ Built' },
                { label: 'Blockchain', value: 'Web3 Focus' },
                { label: 'Discipline', value: 'Athlete' },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-2xl font-display font-bold text-text-primary group-hover:text-primary-teal transition-colors">{stat.value}</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-teal scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              <p className="text-lg italic text-text-primary/80 leading-relaxed max-w-2xl">
                "Disciplined engineering meets creative problem solving. I build for the long term, focusing on systems that are not just functional, but verifiable."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
