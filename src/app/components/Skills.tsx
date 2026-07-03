import { motion } from 'motion/react'
import { Code2, Brain, Library, Wrench } from 'lucide-react'

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: 'Programming Languages',
    description: 'Core languages for data engineering, analysis and scripting.',
    skills: ['Python', 'SQL', 'R (Basic)', 'C (Basic)'],
  },
  {
    icon: Brain,
    title: 'Data Analysis & ML',
    description: 'Techniques and algorithms applied across all projects.',
    skills: [
      'Data Cleaning', 'EDA', 'Feature Engineering', 'Model Evaluation',
      'Regression', 'Classification', 'Clustering', 'XGBoost',
      'Random Forest', 'Decision Trees',
    ],
  },
  {
    icon: Library,
    title: 'Libraries & Frameworks',
    description: 'Scientific computing, ML modelling and computer vision.',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'OpenCV', 'Matplotlib', 'Plotly'],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    description: 'Development environment, BI and deployment infrastructure.',
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'Google Colab', 'VS Code', 'Power BI', 'Supabase', 'Vercel'],
  },
]

function Badge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 bg-[#F8FAFC] dark:bg-[#0B0F14] border border-[#E5E7EB] dark:border-white/[0.07] rounded-lg text-[#374151] dark:text-[#8B95A5] hover:border-[#BFDBFE] dark:hover:border-[#4F8CFF]/[0.3] hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-all duration-200 cursor-default"
      style={{ fontSize: '0.825rem', fontWeight: 500 }}
    >
      {label}
    </span>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 bg-white dark:bg-[#0B0F14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="text-[#2563EB] dark:text-[#4F8CFF] uppercase tracking-widest mb-3"
            style={{ fontSize: '0.72rem', fontWeight: 700 }}
          >
            Skills
          </p>
          <h2
            className="text-[#111827] dark:text-[#F3F4F6]"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}
          >
            Technical competencies
          </h2>
          <p
            className="text-[#6B7280] dark:text-[#8B95A5] mt-3 max-w-xl"
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          >
            Tools, languages and techniques I use to analyse, model and build.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                className="bg-[#F8FAFC] dark:bg-[#161B22] border border-[#E5E7EB] dark:border-white/[0.06] rounded-[18px] p-7 flex flex-col gap-5 hover:border-[#BFDBFE] dark:hover:border-white/[0.1] hover:shadow-sm dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-[#4F8CFF]/[0.08] flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-[#2563EB] dark:text-[#4F8CFF]" />
                  </div>
                  <div>
                    <h3
                      className="text-[#111827] dark:text-[#F3F4F6]"
                      style={{ fontSize: '0.95rem', fontWeight: 700 }}
                    >
                      {group.title}
                    </h3>
                    <p
                      className="text-[#6B7280] dark:text-[#8B95A5] mt-0.5"
                      style={{ fontSize: '0.82rem', lineHeight: 1.5 }}
                    >
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-[#E5E7EB] dark:bg-white/[0.05]" />

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} label={skill} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
