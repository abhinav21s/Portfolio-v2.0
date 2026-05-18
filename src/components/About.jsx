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
              <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">The Story</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-10">Behind the Code</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              <div className="space-y-5">
                <p className="text-lg text-text-primary leading-relaxed font-medium">
                  {personalInfo.bio[0]}
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  {personalInfo.bio[1]}
                </p>
              </div>
              <div className="space-y-5">
                <p className="text-base text-text-secondary leading-relaxed">
                  {personalInfo.bio[2]}
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  {personalInfo.bio[3]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/5">
              {[
                { label: 'Experience', value: '1+ Years' },
                { label: 'Projects', value: '15+ Built' }
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-2xl font-display font-bold text-text-primary group-hover:text-primary-teal transition-colors">{stat.value}</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
