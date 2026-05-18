import { motion } from 'framer-motion'
import { beyondTheChain } from '../data/portfolioData'

const activities = [
  {
    id: "hobby-001",
    title: "Culinary Experiments",
    icon: (
      <img src="/cooking.png" alt="Cooking" className="w-6 h-6 object-contain" />
    ),
    description: "Exploring flavors and techniques in the kitchen. Cooking teaches patience and precision—skills that translate directly to debugging complex systems."
  },
  {
    id: "hobby-002",
    title: "Swimming",
    icon: (
      <img src="/swimming.png" alt="Swimming" className="w-6 h-6 object-contain" />
    ),
    description: "Regular swimming keeps me physically and mentally sharp. The discipline from athletics continues to shape my approach to engineering."
  },
  {
    id: "hobby-003",
    title: "Fashion & Style",
    icon: (
      <img src="/fashion.png" alt="Fashion" className="w-6 h-6 object-contain" />
    ),
    description: "Experimenting with personal style and aesthetics. Good design—whether in clothing or code—is about intentional choices and attention to detail."
  },
  {
    id: "hobby-004",
    title: "Music",
    icon: (
      <img src="/music.png" alt="Music" className="w-6 h-6 object-contain" />
    ),
    description: "I enjoy listening to a wide variety of music — from rock and heavy metal to Punjabi pop, Indian indie, and instrumental solos. It helps me relax, recharge, and stay creative after long coding sessions."
  }
]

export default function BeyondTheChain() {
  return (
    <section id="beyond" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Off-Chain</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">Beyond the Code</h3>
          {/*<p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            My engineering philosophy is shaped by a diverse range of disciplines—from the precision of culinary arts to the endurance of competitive athletics.
          </p>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((hobby, i) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary-teal/30 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-primary-teal/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-teal mb-6 group-hover:scale-110 transition-transform duration-500">
                  {hobby.icon}
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary mb-4 group-hover:text-primary-teal transition-colors">
                  {hobby.title}
                </h4>
                <p className="text-base text-text-secondary leading-relaxed font-light">
                  {hobby.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
