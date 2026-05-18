import { motion } from 'framer-motion'
import { skills } from '../data/portfolioData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mb-12">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6">Technical Proficiency</h3>
          <p className="text-base text-text-secondary leading-relaxed max-w-2xl">
            A comprehensive stack focused on building secure, scalable, and verifiable applications from the backend out.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(skills).map(([key, category]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="premium-card p-6 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-teal/10 text-primary-teal">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                   </svg>
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary tracking-tight">
                  {category.title}
                </h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-text-secondary transition-all hover:bg-primary-teal/10 hover:border-primary-teal/30 hover:text-primary-teal hover:translate-y-[-2px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {category.note && (
                <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-primary-teal animate-pulse" />
                  <p className="text-xs font-medium text-text-secondary/80">
                    {category.note}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
