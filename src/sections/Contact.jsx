import { useState, useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaCheck, FaRocket } from 'react-icons/fa'
import RevealTitle from '../components/RevealTitle'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/usman4116', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/usman4116/', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/usmanfarhan', label: 'Twitter' },
  { icon: FaEnvelope, href: 'mailto:roxenusman@gmail.com', label: 'Email' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

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
    setFormData({ name: '', email: '', message: '' })
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-cta',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-ctas', start: 'top 88%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" aria-labelledby="contact-heading" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 z-10">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
        aria-hidden="true"
      >
        CONTACT
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <RevealTitle id="contact-heading" title="Let's build something" accent="extraordinary." className="text-center" />

          <div className="contact-ctas flex flex-wrap items-center justify-center gap-4 mb-8">
            <motion.a
              href="mailto:roxenusman@gmail.com"
              className="contact-cta bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-slate-200 transition-all flex items-center gap-3 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hover
            >
              Get in touch <FaRocket className="text-xs" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/usman4116/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2 text-sm md:text-base"
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
                {...(social.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
                className="contact-cta px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all text-xs font-medium"
                whileHover={{ y: -2 }}
                data-hover
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </div>

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
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck size={24} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-white/20'} py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors`}
                    />
                    {errors.name && <p id="contact-name-error" className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Your email address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white/20'} py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors`}
                    />
                    {errors.email && <p id="contact-email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Your message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project..."
                    className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-white/20'} py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors resize-none`}
                  />
                  {errors.message && <p id="contact-message-error" className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover
                >
                  <FaPaperPlane aria-hidden="true" />
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
