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
    <section id="skills" className="relative">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">My Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">Skills & Tools</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.entries(skills).map(([key, category]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="premium-card rounded-2xl p-8 group"
            >
              <h4 className="text-lg font-display font-bold text-text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal text-sm">
                  {key[0].toUpperCase()}
                </span>
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-text-secondary transition-all group-hover:border-primary-teal/30 group-hover:text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {category.note && (
                <p className="mt-6 text-xs italic text-primary-teal/70">
                  * {category.note}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
