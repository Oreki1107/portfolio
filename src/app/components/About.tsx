import { motion } from 'motion/react'
import { GraduationCap, BookOpen } from 'lucide-react'

const STATS = [
  { value: '4+',     label: 'Projects Built',    sub: 'end-to-end, production-ready'      },
  { value: 'Python', label: 'Primary Language',  sub: 'ML, data & automation'             },
  { value: 'B.Tech', label: 'AI & Data Science', sub: 'Saveetha Institute, Chennai'       },
  { value: '8.3',    label: 'CGPA / 10',         sub: 'academic performance'              },
]

const COURSEWORK = [
  'Machine Learning',
  'Artificial Intelligence',
  'Computer Vision',
  'Data Mining',
  'Database Management Systems',
  'Statistics',
  'Data Structures & Algorithms',
]

const inView = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
}

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div {...inView} className="mb-14">
          <p
            className="text-[#2563EB] dark:text-[#4F8CFF] uppercase tracking-widest mb-3"
            style={{ fontSize: '0.72rem', fontWeight: 700 }}
          >
            About
          </p>
          <h2
            className="text-[#111827] dark:text-[#F3F4F6] max-w-2xl"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}
          >
            Curious. Analytical.{' '}
            <span className="text-[#6B7280] dark:text-[#8B95A5]">Driven by data.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24">
          {/* Left: Bio + Education */}
          <div className="flex flex-col gap-12">
            <motion.p
              {...inView}
              className="text-[#4B5563] dark:text-[#8B95A5]"
              style={{ fontSize: '1.05rem', lineHeight: 1.85, fontWeight: 400 }}
            >
              Artificial Intelligence and Data Science graduate with hands-on experience in
              exploratory data analysis, machine learning, computer vision, and real-world
              software development. Built end-to-end data analytics and AI projects using Python,
              SQL, Pandas, Scikit-learn, and OpenCV, with a strong interest in transforming
              complex datasets into actionable insights. Eager to contribute analytical thinking,
              curiosity, and problem-solving skills while continuing to grow in a collaborative
              product-driven environment.
            </motion.p>

            {/* Education timeline */}
            <motion.div {...inView}>
              <div className="flex items-center gap-2.5 mb-6">
                <GraduationCap size={15} className="text-[#2563EB] dark:text-[#4F8CFF]" />
                <span
                  className="text-[#111827] dark:text-[#F3F4F6]"
                  style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.01em' }}
                >
                  Education
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex gap-6"
              >
                <div className="relative mt-1.5 flex-shrink-0">
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-[#2563EB] dark:border-[#4F8CFF] bg-white dark:bg-[#0D1117] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#4F8CFF]" />
                  </div>
                </div>
                <div>
                  <span
                    className="text-[#2563EB] dark:text-[#4F8CFF] block mb-1.5"
                    style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.03em' }}
                  >
                    2022 — 2026
                  </span>
                  <p
                    className="text-[#111827] dark:text-[#F3F4F6] mb-0.5"
                    style={{ fontSize: '1rem', fontWeight: 700 }}
                  >
                    Bachelor of Technology (B.Tech.)
                  </p>
                  <p
                    className="text-[#4B5563] dark:text-[#B8C1CC] mb-0.5"
                    style={{ fontSize: '0.9rem', fontWeight: 500 }}
                  >
                    Artificial Intelligence & Data Science
                  </p>
                  <p
                    className="text-[#6B7280] dark:text-[#8B95A5] mb-4"
                    style={{ fontSize: '0.85rem', fontWeight: 400 }}
                  >
                    Saveetha Institute of Medical and Technical Sciences (SIMATS), Chennai
                    {' · '}CGPA: 8.3 / 10
                  </p>

                  <div className="flex items-center gap-2 mb-2.5">
                    <BookOpen size={12} className="text-[#9CA3AF] dark:text-[#8B95A5]" />
                    <span
                      className="text-[#9CA3AF] dark:text-[#8B95A5]"
                      style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                      Relevant Coursework
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {COURSEWORK.map((course) => (
                      <span
                        key={course}
                        className="inline-flex items-center px-2.5 py-1 bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-white/[0.07] rounded-md text-[#4B5563] dark:text-[#8B95A5]"
                        style={{ fontSize: '0.75rem', fontWeight: 500 }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Stats */}
          <motion.div {...inView} className="grid grid-cols-2 gap-4 content-start">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-white/[0.07] rounded-2xl p-5 flex flex-col gap-1 hover:shadow-sm dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <span
                  className="text-[#111827] dark:text-[#F3F4F6]"
                  style={{ fontSize: '1.55rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[#111827] dark:text-[#B8C1CC]"
                  style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 4 }}
                >
                  {stat.label}
                </span>
                <span
                  className="text-[#9CA3AF] dark:text-[#8B95A5]"
                  style={{ fontSize: '0.72rem', fontWeight: 400, marginTop: 2 }}
                >
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
