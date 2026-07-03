import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, Phone } from 'lucide-react'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'krishtarry2005@gmail.com',
    href: 'mailto:krishtarry2005@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 78711 47020',
    href: 'tel:+917871147020',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mohan-krishnan-s',
    href: 'https://linkedin.com/in/mohan-krishnan-s/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Oreki1107',
    href: 'https://github.com/Oreki1107',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Chennai, Tamil Nadu · Open to remote & relocation',
    href: undefined,
  },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message.')
      }

      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `
    w-full bg-[#F8FAFC] dark:bg-[#0B0F14] border border-[#E5E7EB] dark:border-white/[0.08]
    rounded-[14px] px-4 py-3 text-[#111827] dark:text-[#F3F4F6]
    placeholder-[#9CA3AF] dark:placeholder-[#8B95A5]
    focus:outline-none focus:border-[#2563EB] dark:focus:border-[#4F8CFF]/[0.5] focus:ring-1 focus:ring-[#2563EB]/[0.2] dark:focus:ring-[#4F8CFF]/[0.1]
    transition-all duration-200
  `

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
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
            Contact
          </p>
          <h2
            className="text-[#111827] dark:text-[#F3F4F6]"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}
          >
            Let's talk
          </h2>
          <p
            className="text-[#6B7280] dark:text-[#8B95A5] mt-3 max-w-xl"
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          >
            I'm actively looking for Freelancing Developer and Data Analyst opportunities.
            Based in Chennai, Tamil Nadu — open to remote work and relocation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
          {/* Left: Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="flex flex-col gap-3"
          >
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}
                className="flex items-start gap-4 p-4 bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-white/[0.06] rounded-[18px] hover:border-[#BFDBFE] dark:hover:border-white/[0.1] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] dark:bg-[#4F8CFF]/[0.08] flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#2563EB] dark:text-[#4F8CFF]" />
                </div>
                <div>
                  <p
                    className="text-[#9CA3AF] dark:text-[#8B95A5] mb-0.5"
                    style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-[#111827] dark:text-[#B8C1CC] hover:text-[#2563EB] dark:hover:text-[#4F8CFF] transition-colors duration-200 break-all"
                      style={{ fontSize: '0.875rem', fontWeight: 500 }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      className="text-[#111827] dark:text-[#B8C1CC]"
                      style={{ fontSize: '0.875rem', fontWeight: 500 }}
                    >
                      {value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white dark:bg-[#1B2330] border border-[#E5E7EB] dark:border-white/[0.07] rounded-[18px] p-8 dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center justify-center text-center h-full min-h-[320px] gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#DCFCE7] dark:bg-[#052E16] flex items-center justify-center">
                  <CheckCircle size={26} className="text-[#16A34A] dark:text-[#4ADE80]" />
                </div>
                <h3
                  className="text-[#111827] dark:text-[#F3F4F6]"
                  style={{ fontSize: '1.2rem', fontWeight: 700 }}
                >
                  Message sent!
                </h3>
                <p
                  className="text-[#6B7280] dark:text-[#8B95A5] max-w-xs"
                  style={{ fontSize: '0.9rem', lineHeight: 1.65 }}
                >
                  Thank you for reaching out! Your message has been delivered successfully. I'll respond within 24–48 hours.
                </p>
                {error ? (
                  <p className="text-[#DC2626] dark:text-[#F87171]" style={{ fontSize: '0.875rem' }}>
                    {error}
                  </p>
                ) : null}
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-[#2563EB] dark:text-[#4F8CFF] hover:text-[#1D4ED8] dark:hover:text-[#76A9FF] transition-colors mt-2"
                  style={{ fontSize: '0.875rem', fontWeight: 500 }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#374151] dark:text-[#B8C1CC]" style={{ fontSize: '0.825rem', fontWeight: 600 }}>
                      Name
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" required className={inputClass} style={{ fontSize: '0.9rem' }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#374151] dark:text-[#B8C1CC]" style={{ fontSize: '0.825rem', fontWeight: 600 }}>
                      Email
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="you@company.com" required className={inputClass} style={{ fontSize: '0.9rem' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#374151] dark:text-[#B8C1CC]" style={{ fontSize: '0.825rem', fontWeight: 600 }}>
                    Subject
                  </label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="e.g. Data Scientist opportunity at Acme"
                    required className={inputClass} style={{ fontSize: '0.9rem' }} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#374151] dark:text-[#B8C1CC]" style={{ fontSize: '0.825rem', fontWeight: 600 }}>
                    Message
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about the role or what you'd like to discuss..."
                    required rows={5} className={inputClass}
                    style={{ fontSize: '0.9rem', resize: 'vertical', minHeight: 130 }} />
                </div>

                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  style={{ display: 'none' }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-[#111827] dark:bg-[#F9FAFB] text-white dark:text-[#0B0F14] rounded-[14px] py-3.5 hover:bg-[#1F2937] dark:hover:bg-white transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2 hover:scale-[1.01]"
                  style={{ fontSize: '0.9rem', fontWeight: 600 }}
                >
                  {loading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <Send size={15} />
                  )}
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
