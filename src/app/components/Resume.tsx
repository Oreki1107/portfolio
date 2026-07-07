import { motion } from 'motion/react'
import { Download, FileText, GraduationCap, Briefcase, Award } from 'lucide-react'
import { trackEvent } from '../../analytics/ga'
import resumeUrl from '../../imports/mohan_resume.pdf?url'

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: 'B.Tech AI & Data Science',
    detail: 'SIMATS Chennai · CGPA 8.3 / 10 · 2022–2026',
  },
  {
    icon: Briefcase,
    title: 'Python · ML · Computer Vision',
    detail: 'Scikit-learn, XGBoost, OpenCV, Pandas, SQL',
  },
  {
    icon: Award,
    title: '4 End-to-End Projects',
    detail: 'EDA, ML modelling, CV systems & web deployment',
  },
]

export function Resume() {
  return (
    <section id="resume" className="py-24 lg:py-32 bg-white dark:bg-[#0B0F14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[#2563EB] dark:text-[#4F8CFF] uppercase tracking-widest mb-3"
              style={{ fontSize: '0.72rem', fontWeight: 700 }}
            >
              Resume
            </p>
            <h2
              className="text-[#111827] dark:text-[#F3F4F6] mb-4"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}
            >
              My full credentials
            </h2>
            <p
              className="text-[#4B5563] dark:text-[#8B95A5] mb-8"
              style={{ fontSize: '1rem', lineHeight: 1.8 }}
            >
              Download my resume for a complete overview of my education, technical skills,
              project experience and achievements — formatted for product-company applications.
            </p>

            <a
              href={resumeUrl}
              download="Mohan_Krishnan_S_Resume.pdf"
              onClick={() => trackEvent('resume_download')}
              className="inline-flex items-center gap-2.5 bg-[#2563EB] dark:bg-[#4F8CFF] text-white px-7 py-3.5 rounded-[14px] hover:bg-[#1D4ED8] dark:hover:bg-[#76A9FF] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-[0_8px_28px_rgba(79,140,255,0.2)] hover:-translate-y-0.5 hover:scale-[1.02]"
              style={{ fontSize: '0.95rem', fontWeight: 600 }}
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Right: Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="bg-[#F8FAFC] dark:bg-[#161B22] border border-[#E5E7EB] dark:border-white/[0.07] rounded-[18px] p-8 dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
              {/* Top bar */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E5E7EB] dark:border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-[#4F8CFF]/[0.08] flex items-center justify-center">
                  <FileText size={17} className="text-[#2563EB] dark:text-[#4F8CFF]" />
                </div>
                <div>
                  <p
                    className="text-[#111827] dark:text-[#F3F4F6]"
                    style={{ fontSize: '0.95rem', fontWeight: 700 }}
                  >
                    Mohan_Krishnan_S_Resume.pdf
                  </p>
                  <p
                    className="text-[#9CA3AF] dark:text-[#8B95A5]"
                    style={{ fontSize: '0.775rem' }}
                  >
                    Updated July 2026 · PDF · 2 pages
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-4">
                {HIGHLIGHTS.map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] dark:bg-[#4F8CFF]/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-[#2563EB] dark:text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p
                        className="text-[#111827] dark:text-[#B8C1CC]"
                        style={{ fontSize: '0.875rem', fontWeight: 600 }}
                      >
                        {title}
                      </p>
                      <p
                        className="text-[#6B7280] dark:text-[#8B95A5]"
                        style={{ fontSize: '0.8rem', marginTop: 1 }}
                      >
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download button */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB] dark:border-white/[0.05]">
                <a
                  href={resumeUrl}
                  download="Mohan_Krishnan_S_Resume.pdf"
                  onClick={() => trackEvent('resume_download')}
                  className="flex items-center justify-center gap-2 w-full border border-[#E5E7EB] dark:border-white/[0.1] text-[#4B5563] dark:text-[#8B95A5] hover:text-[#2563EB] dark:hover:text-[#4F8CFF] hover:border-[#BFDBFE] dark:hover:border-[#4F8CFF]/[0.3] rounded-[14px] py-2.5 transition-all duration-200 hover:bg-[#F8FAFC] dark:hover:bg-white/[0.02]"
                  style={{ fontSize: '0.875rem', fontWeight: 500 }}
                >
                  <Download size={15} />
                  Download PDF
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
