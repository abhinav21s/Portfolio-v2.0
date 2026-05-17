import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'center', isInView }) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`${centered ? 'mx-auto text-center' : ''} mb-14 max-w-3xl md:mb-20`}
    >
      {eyebrow && (
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-teal/25 bg-primary-teal/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-primary-teal">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-teal" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={`${centered ? 'mx-auto' : ''} mt-5 max-w-2xl text-base leading-8 text-text-secondary md:text-lg`}>
          {description}
        </p>
      )}
      <div className={`${centered ? 'mx-auto' : ''} mt-7 h-px w-28 bg-gradient-to-r from-transparent via-primary-teal/80 to-transparent`} />
    </motion.div>
  )
}
