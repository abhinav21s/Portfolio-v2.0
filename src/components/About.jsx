import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">The Story</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">Behind the Code</h3>
            </div>
            
            <div className="space-y-6">
              {personalInfo.bio.map((para, i) => (
                <p key={i} className="text-lg text-text-secondary leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {[
                { label: 'Exp', value: '2+' },
                { label: 'Projects', value: '20+' },
                { label: 'Web3', value: '10+' },
                { label: 'Coffee', value: '∞' },
              ].map((stat, i) => (
                <div key={i} className="premium-card rounded-2xl p-4 text-center">
                  <div className="text-2xl font-display font-bold text-primary-teal">{stat.value}</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-black/40">
              <img 
                src={personalInfo.photo} 
                alt="Abhinav" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 premium-card p-8 rounded-3xl max-w-xs hidden md:block">
              <p className="text-sm italic text-text-primary leading-relaxed">
                "Disciplined engineering meets creative problem solving. I build for the long term."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
