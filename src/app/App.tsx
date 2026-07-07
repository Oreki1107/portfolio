import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { initializeAnalytics } from '../analytics/ga'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Resume } from './components/Resume'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  useEffect(() => {
    initializeAnalytics()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        ::selection { background: #DBEAFE; color: #1E40AF; }
        .dark ::selection { background: #1E3A5F; color: #93C5FD; }
        .dark * { -webkit-font-smoothing: antialiased; }
      `}</style>
      <div className="bg-white dark:bg-[#0B0F14] text-[#111827] dark:text-[#F3F4F6] min-h-screen antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-[#111827] focus:rounded-br-md focus:shadow-md">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
