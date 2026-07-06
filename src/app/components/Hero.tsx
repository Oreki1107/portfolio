import { motion } from 'motion/react'
import { Download, ArrowRight } from 'lucide-react'
import { AIIllustration } from './AIIllustration'
import resumeUrl from '../../imports/mohan_resume.pdf?url'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay },
})

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-white dark:bg-[#0B0F14] relative overflow-hidden">
      {/* Ambient glow — very subtle in dark */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{ background: 'radial-gradient(circle at 65% 25%, #4F8CFF 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="max-w-xl">
            {/* Open-to-work badge */}
            <motion.div {...fadeUp(0.05)}>
              <div className="inline-flex items-center gap-2 bg-[#EEF2FF] dark:bg-[#4F8CFF]/[0.08] border border-[#BFDBFE] dark:border-[#4F8CFF]/[0.18] rounded-full px-3.5 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#4F8CFF] animate-pulse" />
                <span
                  className="text-[#2563EB] dark:text-[#4F8CFF]"
                  style={{ fontSize: '0.775rem', fontWeight: 600, letterSpacing: '0.025em' }}
                >
                  Open to Work · Freelancing Developer + Data Analyst
                </span>
              </div>
            </motion.div>

            <motion.p
              {...fadeUp(0.1)}
              className="text-[#6B7280] dark:text-[#8B95A5] mb-2"
              style={{ fontSize: '1.05rem', fontWeight: 400 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              {...fadeUp(0.18)}
              className="text-[#111827] dark:text-[#F3F4F6] mb-5"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
              }}
            >
              Mohan Krishnan S
            </motion.h1>

            <motion.div {...fadeUp(0.26)} className="mb-6 flex flex-col gap-1">
              <span
                className="text-[#2563EB] dark:text-[#4F8CFF]"
                style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                Freelancing Developer + Data Analyst
              </span>
              <span
                className="text-[#4B5563] dark:text-[#8B95A5]"
                style={{ fontSize: '1rem', fontWeight: 400 }}
              >
                B.Tech Artificial Intelligence & Data Science
              </span>
            </motion.div>

            <motion.p
              {...fadeUp(0.34)}
              className="text-[#4B5563] dark:text-[#8B95A5] mb-10"
              style={{ fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400 }}
            >
              Building end-to-end data analytics and AI projects using Python, SQL,
              Pandas, Scikit-learn and OpenCV — transforming complex datasets into
              actionable insights in collaborative, product-driven environments.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-3">
              <a
                href={resumeUrl}
                download="Mohan_Krishnan_S_Resume.pdf"
                className="group flex items-center gap-2 bg-[#111827] dark:bg-[#F9FAFB] text-white dark:text-[#0B0F14] rounded-[14px] px-6 py-3 hover:bg-[#1F2937] dark:hover:bg-white transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 hover:scale-[1.02]"
                style={{ fontSize: '0.9rem', fontWeight: 600 }}
              >
                <Download size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="group flex items-center gap-2 border border-[#E5E7EB] dark:border-white/[0.1] text-[#111827] dark:text-[#B8C1CC] rounded-[14px] px-6 py-3 hover:bg-[#EEF2FF] dark:hover:bg-white/[0.04] hover:border-[#BFDBFE] dark:hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5"
                style={{ fontSize: '0.9rem', fontWeight: 600 }}
              >
                View Projects
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex items-center gap-6 mt-12 pt-8 border-t border-[#F3F4F6] dark:border-white/[0.06]"
            >
              {[
                { value: '4+', label: 'Projects Built' },
                { value: 'Python', label: 'Primary Stack' },
                { value: '8.3', label: 'CGPA / 10' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-[#111827] dark:text-[#F3F4F6]"
                    style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="text-[#6B7280] dark:text-[#8B95A5]"
                    style={{ fontSize: '0.775rem', fontWeight: 500 }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: AI Illustration — recessed in dark mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.3 }}
            className="hidden lg:flex items-center justify-center opacity-100 dark:opacity-25"
            style={{ height: 480 }}
          >
            <AIIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
