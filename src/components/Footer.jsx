import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa'

// rel="me" marks these as the same person's verified profiles, mirroring the
// sameAs entries in the Person JSON-LD.
const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/usman4116', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/usman4116/', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/usmanfarhan', label: 'Twitter' },
  { icon: FaEnvelope, href: 'mailto:roxenusman@gmail.com', label: 'Email' },
]

const footerNav = [
  { href: '#about', label: 'About Usman Farhan' },
  { href: '#skills', label: 'Technical skills' },
  { href: '#projects', label: 'Software projects' },
  { href: '#experience', label: 'Experience & education' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />

      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.h2
              className="text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              Muhammad Usman Farhan
            </motion.h2>
            <p className="text-slate-500 mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              Full-stack web, AI-assisted tooling &amp; data science — built with
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <FaHeart className="text-red-500 text-xs" aria-hidden="true" />
              </motion.span>
              in Lahore, Pakistan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                {...(social.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'me noopener noreferrer' })}
                aria-label={social.label}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                <social.icon size={20} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Descriptive internal links — the only crawlable path to each
            section other than the icon-led primary nav. */}
        <nav aria-label="Footer" className="mt-12 pt-8 border-t border-white/5">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {footerNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-slate-500 hover:text-white text-sm transition-colors"
                  data-hover
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Muhammad Usman Farhan. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs mt-2">
            Built with React, Three.js, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
