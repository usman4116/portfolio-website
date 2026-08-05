import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaCheck, FaRocket } from 'react-icons/fa'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/usman4116', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/usman4116/', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/usmanfarhan', label: 'Twitter' },
  { icon: FaEnvelope, href: 'mailto:roxenusman@gmail.com', label: 'Email' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"])

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 z-10">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
      >
        CONTACT
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
            Let's build something <br className="hidden md:block" />
            <span className="text-slate-400">extraordinary.</span>
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <motion.a
              href="mailto:roxenusman@gmail.com"
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-slate-200 transition-all flex items-center gap-3 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hover
            >
              Get in touch <FaRocket className="text-xs" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/usman4116/"
              target="_blank"
              className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hover
            >
              Connect on LinkedIn
            </motion.a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all text-xs font-medium"
                whileHover={{ y: -2 }}
                data-hover
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Minimal Form */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 14 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.15 }}
          className="w-full max-w-2xl [perspective:1200px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="glass p-6 sm:p-8 md:p-12 rounded-[2rem]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-white/20'} py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white/20'} py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project..."
                    className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-white/20'} py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover
                >
                  <FaPaperPlane />
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
