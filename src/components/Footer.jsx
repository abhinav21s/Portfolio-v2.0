import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import { personalInfo } from '../data/portfolioData'

export default function Footer() {
  const { root } = useMerkleTree()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/5">
          
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-display font-bold text-text-primary mb-6">
              {personalInfo.name}
            </h3>
            <p className="text-text-secondary max-w-sm leading-relaxed">
              Backend & Blockchain Engineer building immutable systems with disciplined precision.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary-teal mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-text-secondary hover:text-primary-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary-teal mb-6">Status</h4>
            <div className="premium-card p-4 rounded-2xl">
              <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Network Root</div>
              <div className="text-xs font-mono text-primary-teal truncate">
                {root ? shortenHash(root.hash, 10) : 'Indexing...'}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-valid-green animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">Mainnet Live</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-text-secondary font-mono">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href={personalInfo.social.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary-teal transition-colors">GitHub</a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary-teal transition-colors">LinkedIn</a>
            <a href={personalInfo.social.twitter} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary-teal transition-colors">X</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
