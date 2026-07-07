import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import { Github, ExternalLink, Database, Eye, Users, Globe } from 'lucide-react'
import { trackEvent } from '../../analytics/ga'

interface Project {
  icon: ComponentType<{ size?: number | string; className?: string }>
  title: string
  tag: string
  techs: string[]
  bullets: string[]
  github: string
  demo?: string
}

const PROJECTS: Project[] = [
  {
    icon: Database,
    title: 'COVID-19 Data Integration & Risk Assessment',
    tag: 'Data Analysis & EDA',
    techs: ['Python', 'Pandas', 'Plotly', 'Matplotlib', 'EDA'],
    bullets: [
      'Integrated and cleaned multiple COVID-19 datasets using Python and Pandas.',
      'Performed EDA to identify vaccination trends and regional risk patterns.',
      'Built interactive visualisations and developed a composite COVID risk score.',
    ],
    github: 'https://github.com/Oreki1107/COVID_VACCINATION_DATA_ANALYSIS',
  },
  {
    icon: Eye,
    title: 'Intelligent Driver Monitoring System',
    tag: 'Computer Vision',
    techs: ['Python', 'OpenCV', 'Computer Vision'],
    bullets: [
      'Developed a computer vision system to detect driver drowsiness and distraction.',
      'Implemented facial landmark analysis for eye closure and head movement tracking.',
      'Designed a modular pipeline for future real-time alert integration.',
    ],
    github: 'https://github.com/Oreki1107',
  },
  {
    icon: Users,
    title: 'Student Performance Prediction',
    tag: 'Machine Learning',
    techs: ['Python', 'Scikit-learn', 'XGBoost'],
    bullets: [
      'Built a machine learning model to predict student academic performance.',
      'Applied preprocessing, feature engineering, and model comparison techniques.',
      'Selected XGBoost based on predictive performance and evaluated model accuracy.',
    ],
    github: 'https://github.com/Oreki1107',
  },
  {
    icon: Globe,
    title: 'Freelance Business Website – Naveen Landscapes',
    tag: 'Full-Stack Web',
    techs: ['React', 'Vite', 'Supabase', 'GitHub', 'Vercel'],
    bullets: [
      'Designed, developed, and deployed a responsive business website from concept to production.',
      'Collaborated directly with the client to translate business requirements into a modern, user-friendly solution.',
      'Integrated enquiry forms, project galleries, and backend services using Supabase with deployment on Vercel.',
    ],
    github: 'https://github.com/Oreki1107/Naveen-landscapes',
    demo: '#',
  },
]

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 bg-[#F8FAFC] dark:bg-[#0B0F14] border border-[#E5E7EB] dark:border-white/[0.06] rounded-md text-[#4B5563] dark:text-[#8B95A5]"
      style={{ fontSize: '0.75rem', fontWeight: 500 }}
    >
      {label}
    </span>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon: ComponentType<{ size?: number | string; className?: string }> = project.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-white/[0.06] rounded-[18px] p-7 flex flex-col gap-5 hover:shadow-xl dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:border-[#BFDBFE] dark:hover:border-white/[0.1] transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] dark:bg-[#4F8CFF]/[0.08] flex items-center justify-center flex-shrink-0">
          <Icon size={19} className="text-[#2563EB] dark:text-[#4F8CFF]" />
        </div>
        <span
          className="inline-flex items-center px-2.5 py-1 bg-[#F8FAFC] dark:bg-[#0B0F14] border border-[#E5E7EB] dark:border-white/[0.06] rounded-full text-[#6B7280] dark:text-[#8B95A5] flex-shrink-0"
          style={{ fontSize: '0.7rem', fontWeight: 600 }}
        >
          {project.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[#111827] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#4F8CFF] transition-colors duration-300"
        style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.35 }}
      >
        {project.title}
      </h3>

      {/* Bullet points */}
      <ul className="flex flex-col gap-2.5">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#4F8CFF] flex-shrink-0 opacity-50" />
            <span
              className="text-[#4B5563] dark:text-[#8B95A5]"
              style={{ fontSize: '0.875rem', lineHeight: 1.72 }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="h-px bg-[#F3F4F6] dark:bg-white/[0.05]" />

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {project.techs.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-auto pt-1">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('github_click', { project: project.title })}
          className="flex items-center gap-1.5 text-[#4B5563] dark:text-[#8B95A5] hover:text-[#111827] dark:hover:text-[#4F8CFF] transition-colors duration-200"
          style={{ fontSize: '0.85rem', fontWeight: 500 }}
        >
          <Github size={15} />
          View on GitHub
        </a>
        {project.demo && (
          <>
            <div className="w-px h-4 bg-[#E5E7EB] dark:bg-white/[0.08]" />
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('project_click', { project: project.title, link_type: 'demo' })}
              className="flex items-center gap-1.5 text-[#2563EB] dark:text-[#4F8CFF] hover:text-[#1D4ED8] dark:hover:text-[#76A9FF] transition-colors duration-200"
              style={{ fontSize: '0.85rem', fontWeight: 500 }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </>
        )}
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <p
            className="text-[#2563EB] dark:text-[#4F8CFF] uppercase tracking-widest mb-3"
            style={{ fontSize: '0.72rem', fontWeight: 700 }}
          >
            Projects
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
            <h2
              className="text-[#111827] dark:text-[#F3F4F6]"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}
            >
              Featured work
            </h2>
            <a
              href="https://github.com/Oreki1107"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('github_click', { location: 'projects_header' })}
              className="flex items-center gap-1.5 text-[#4B5563] dark:text-[#8B95A5] hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors duration-200 self-start sm:self-auto"
              style={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
              <Github size={15} />
              View all on GitHub
            </a>
          </div>
          <p
            className="text-[#6B7280] dark:text-[#8B95A5] max-w-2xl"
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          >
            End-to-end projects across machine learning, computer vision and full-stack
            web development — each solving a real problem using real data.
          </p>
        </motion.div>

        <div className="h-8" />

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
