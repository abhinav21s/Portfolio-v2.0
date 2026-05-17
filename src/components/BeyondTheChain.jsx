import { motion } from 'framer-motion'
import { beyondTheChain } from '../data/portfolioData'

const activities = [
  {
    id: "hobby-001",
    title: "Culinary Experiments",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description: "Exploring flavors and techniques in the kitchen. Cooking teaches patience and precision—skills that translate directly to debugging complex systems."
  },
  {
    id: "hobby-002",
    title: "Swimming",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    description: "Regular swimming keeps me physically and mentally sharp. The discipline from athletics continues to shape my approach to engineering."
  },
  {
    id: "hobby-003",
    title: "Fashion & Style",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "Experimenting with personal style and aesthetics. Good design—whether in clothing or code—is about intentional choices and attention to detail."
  },
  {
    id: "hobby-004",
    title: "Athletic Background",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: "Former state-level athlete. The mindset of continuous improvement and pushing limits drives everything I build."
  }
]

export default function BeyondTheChain() {
  return (
    <section id="beyond" className="relative scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mb-16">
          <h2 className="text-sm font-mono text-primary-teal uppercase tracking-[0.3em] mb-6">Off-Chain</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">Beyond the Code</h3>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            My engineering philosophy is shaped by a diverse range of disciplines—from the precision of culinary arts to the endurance of competitive athletics.
          </p>
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

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-10 md:p-20 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary-teal">
             <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 2H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H4.01697C2.9124 8 2.01697 7.10457 2.01697 6V3L2.01697 2H10.017V15C10.017 18.3137 7.3307 21 4.01697 21H2.01697Z"/></svg>
          </div>
          <p className="text-2xl md:text-4xl font-display font-medium text-text-primary leading-tight max-w-4xl mx-auto italic relative z-10">
            "Excellence is not a destination; it's a continuous journey that requires discipline, patience, and the courage to keep improving."
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 relative z-10">
            <div className="w-12 h-[1px] bg-primary-teal/50" />
            <p className="text-primary-teal font-mono text-xs uppercase tracking-[0.4em]">A lesson from the track</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
