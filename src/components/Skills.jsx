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
        <div className="max-w-4xl mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Expertise</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">Technical Proficiency</h3>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            A comprehensive stack focused on building secure, scalable, and verifiable applications from the backend out.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
        >
          {Object.entries(skills).map(([key, category]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-primary-teal/50" />
                <h4 className="text-xl font-display font-bold text-text-primary uppercase tracking-wider">
                  {category.title}
                </h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-sm font-medium text-text-secondary transition-all hover:bg-white/[0.08] hover:border-primary-teal/30 hover:text-text-primary hover:scale-[1.02]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {category.note && (
                <div className="mt-8 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-teal/40" />
                  <p className="text-xs font-mono text-text-secondary/60 italic uppercase tracking-wider">
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
