import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaRocket, FaHome, FaUser, FaCode, FaProjectDiagram, FaBriefcase, FaEnvelope } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#hero', icon: FaHome },
  { name: 'About', href: '#about', icon: FaUser },
  { name: 'Skills', href: '#skills', icon: FaCode },
  { name: 'Projects', href: '#projects', icon: FaProjectDiagram },
  { name: 'Experience', href: '#experience', icon: FaBriefcase },
  { name: 'Contact', href: '#contact', icon: FaEnvelope },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = navLinks.map(link => link.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#020617]/40 backdrop-blur-md border-b border-white/5' : ''
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#hero"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            data-hover
          >
            <motion.div
              className="w-11 h-11 rounded-full overflow-hidden border border-white/20 shadow-lg"
              transition={{ duration: 0.6 }}
            >
              <img src="/profile.jpg" alt="Usman Farhan" className="w-full h-full object-cover" />
            </motion.div>
            <span className="font-bold text-xl text-white font-sans tracking-tight">
              Usman <span className="text-slate-400">Farhan</span>
            </span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeSection === link.href.substring(1)
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  data-hover
                >
                  <Icon size={16} />
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          <motion.a
            href="#contact"
            className="hidden lg:block neon-button px-6 py-2.5 rounded-xl text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            Hire Me
          </motion.a>

          <button
            className="lg:hidden p-2 text-slate-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020617]/60 backdrop-blur-md border-t border-white/5"
          >
            <div className="container py-4 space-y-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    data-hover
                  >
                    <Icon size={20} />
                    {link.name}
                  </motion.a>
                )
              })}
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 px-4 py-4 mt-4 neon-button rounded-xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
