import { Github, Linkedin, Mail } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Resume',   href: '#resume'   },
  { label: 'Contact',  href: '#contact'  },
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0F14] border-t border-[#E5E7EB] dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left: Logo + nav */}
          <div className="flex flex-col gap-4">
            <span
              className="text-[#111827] dark:text-[#F3F4F6]"
              style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Mohan Krishnan S
            </span>
            <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#9CA3AF] dark:text-[#8B95A5] hover:text-[#4B5563] dark:hover:text-[#B8C1CC] transition-colors duration-200"
                  style={{ fontSize: '0.825rem' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Socials + copy */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex items-center gap-2">
              {[
                { icon: Github,   href: 'https://github.com/Oreki1107',            label: 'GitHub'   },
                { icon: Linkedin, href: 'https://linkedin.com/in/mohan-krishnan-s/', label: 'LinkedIn' },
                { icon: Mail,     href: 'mailto:krishtarry2005@gmail.com',          label: 'Email'    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-[#9CA3AF] dark:text-[#8B95A5] hover:text-[#4B5563] dark:hover:text-[#4F8CFF] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex flex-col items-start sm:items-end gap-0.5">
              <p className="text-[#9CA3AF] dark:text-[#8B95A5]" style={{ fontSize: '0.775rem' }}>
                © 2026 Mohan Krishnan S. All rights reserved.
              </p>
              <p className="text-[#9CA3AF] dark:text-[#8B95A5]" style={{ fontSize: '0.775rem' }}>
                Built with React + Vite · Deployed on Vercel
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
