import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Github, Linkedin, Twitter, Sun, Moon, FileText, Menu, X } from 'lucide-react'
import resumeUrl from '../../imports/mohan_resume.pdf?url'

const NAV_LINKS = [
  { label: 'Home',     href: '#home',     id: 'home'     },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills',   href: '#skills',   id: 'skills'   },
  { label: 'Resume',   href: '#resume',   id: 'resume'   },
  { label: 'Contact',  href: '#contact',  id: 'contact'  },
]

export function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [mounted,       setMounted]       = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const ids = ['contact', 'resume', 'skills', 'projects', 'about', 'home']
      const offset = 120
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0B0F14]/80 backdrop-blur-2xl border-b border-[#E5E7EB] dark:border-white/[0.06] shadow-sm dark:shadow-none'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-[#111827] dark:text-[#F3F4F6] tracking-tight hover:opacity-70 transition-opacity duration-300"
          style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          Mohan Krishnan
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'home' && activeSection === 'home')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#111827] dark:text-[#F3F4F6]'
                    : 'text-[#4B5563] dark:text-[#8B95A5] hover:text-[#111827] dark:hover:text-[#B8C1CC]'
                } hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04]`}
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#2563EB] dark:bg-[#4F8CFF] rounded-full" />
                )}
              </a>
            )
          })}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-1.5">
          <a
            href="https://github.com/Oreki1107"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#4B5563] dark:text-[#8B95A5] hover:text-[#111827] dark:hover:text-[#4F8CFF] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all duration-200"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="https://linkedin.com/in/mohan-krishnan-s/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#4B5563] dark:text-[#8B95A5] hover:text-[#111827] dark:hover:text-[#4F8CFF] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="https://x.com/mks_2507"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#4B5563] dark:text-[#8B95A5] hover:text-[#111827] dark:hover:text-[#4F8CFF] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all duration-200"
            aria-label="Visit my X profile"
          >
            <Twitter size={17} />
          </a>

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#4B5563] dark:text-[#8B95A5] hover:text-[#111827] dark:hover:text-[#B8C1CC] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          <div className="w-px h-5 bg-[#E5E7EB] dark:bg-white/[0.08] mx-1" />

          <a
            href={resumeUrl}
            download="Mohan_Krishnan_S_Resume.pdf"
            className="flex items-center gap-2 bg-[#111827] dark:bg-[#F9FAFB] text-white dark:text-[#0B0F14] px-4 py-2 rounded-[14px] hover:bg-[#1F2937] dark:hover:bg-white transition-all duration-200 hover:shadow-md dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:scale-[1.02]"
            style={{ fontSize: '0.85rem', fontWeight: 600 }}
          >
            <FileText size={14} />
            Resume
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          {mounted && (
            <button onClick={toggleTheme} className="p-2 rounded-lg text-[#4B5563] dark:text-[#8B95A5]">
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
          <button
            className="p-2 rounded-lg text-[#4B5563] dark:text-[#8B95A5]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#0D1117] border-b border-[#E5E7EB] dark:border-white/[0.06] px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 rounded-lg text-[#4B5563] dark:text-[#B8C1CC] hover:text-[#111827] dark:hover:text-[#F3F4F6] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all duration-200"
              style={{ fontSize: '0.9rem', fontWeight: 500 }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-[#E5E7EB] dark:border-white/[0.06] flex items-center gap-3">
            <a href="https://github.com/Oreki1107" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-[#4B5563] dark:text-[#8B95A5] hover:text-[#4F8CFF] dark:hover:text-[#4F8CFF]">
              <Github size={17} />
            </a>
            <a href="https://linkedin.com/in/mohan-krishnan-s/" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-[#4B5563] dark:text-[#8B95A5] hover:text-[#4F8CFF] dark:hover:text-[#4F8CFF]">
              <Linkedin size={17} />
            </a>
            <a href="https://x.com/mks_2507" target="_blank" rel="noopener noreferrer"
              aria-label="Visit my X profile"
              className="p-2 text-[#4B5563] dark:text-[#8B95A5] hover:text-[#4F8CFF] dark:hover:text-[#4F8CFF]">
              <Twitter size={17} />
            </a>
            <a
              href={resumeUrl}
              download="Mohan_Krishnan_S_Resume.pdf"
              className="ml-auto flex items-center gap-2 bg-[#111827] dark:bg-[#F9FAFB] text-white dark:text-[#0B0F14] px-4 py-2 rounded-[14px]"
              style={{ fontSize: '0.875rem', fontWeight: 600 }}
            >
              <FileText size={14} />
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
