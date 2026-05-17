import { motion } from 'framer-motion'
import { beyondTheChain } from '../data/portfolioData'

export default function BeyondTheChain() {
  return (
    <section id="beyond" className="relative">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-4">Off-Chain</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">Beyond the Code</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beyondTheChain.map((hobby, i) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-8 rounded-3xl group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {hobby.icon}
              </div>
              <h4 className="text-xl font-display font-bold text-text-primary mb-3">{hobby.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{hobby.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary-teal/5 to-primary-cyan/5 border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 2H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H4.01697C2.9124 8 2.01697 7.10457 2.01697 6V3L2.01697 2H10.017V15C10.017 18.3137 7.3307 21 4.01697 21H2.01697Z"/></svg>
          </div>
          <p className="text-2xl md:text-3xl font-display font-medium text-text-primary leading-tight max-w-3xl mx-auto italic">
            "Excellence is not a destination; it's a continuous journey that requires discipline, patience, and the courage to keep improving."
          </p>
          <p className="mt-6 text-primary-teal font-mono text-xs uppercase tracking-widest">— A lesson from the track</p>
        </motion.div>
      </div>
    </section>
  )
}
