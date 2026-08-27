import { useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCertificate, FaReact, FaHtml5 } from 'react-icons/fa'
import { SiNextdotjs } from 'react-icons/si'
import RevealTitle from '../components/RevealTitle'

gsap.registerPlugin(ScrollTrigger)

const graphNodes = [
  { icon: FaHtml5, title: 'Web Fundamentals', desc: 'HTML, CSS, JS DOM', delay: 0 },
  { icon: FaReact, title: 'React Core', desc: 'Components & State', delay: 0.5 },
  { icon: FaReact, title: 'Advanced React', desc: 'Hooks, Context, Performance', delay: 1 },
  { icon: SiNextdotjs, title: 'Full Stack Framework', desc: 'Next.js, SSR, API Routes', delay: 1.5 }
]

function MemoryGraph() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="relative py-10" ref={containerRef}>
      {/* SVG Path connecting nodes */}
      <div className="absolute left-[31px] sm:left-[39px] top-0 bottom-0 w-1">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 400">
          <line x1="2" y1="0" x2="2" y2="400" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <motion.line 
            x1="2" y1="0" x2="2" y2="400" 
            stroke="#ffffff" 
            strokeWidth="2" 
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="space-y-16">
        {graphNodes.map((node, i) => (
          <motion.div 
            key={i}
            className="flex items-center gap-5 sm:gap-8 relative z-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass flex items-center justify-center shrink-0 border-white/20 relative">
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-white"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: node.delay, duration: 0.5 }}
              />
              <node.icon className="text-2xl sm:text-3xl text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">{node.title}</h4>
              <p className="text-sm text-slate-400">{node.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
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
      // Cards rise from depth
      gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          }
        )
      })

      // Columns drift apart subtly while scrolling through (desktop only)
      gsap.matchMedia().add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('.about-col-left', {
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: '.about-grid', start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
        gsap.to('.about-col-right', {
          y: 40,
          ease: 'none',
          scrollTrigger: { trigger: '.about-grid', start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" aria-labelledby="about-heading" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 z-10">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
        aria-hidden="true"
      >
        JOURNEY
      </motion.div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-24">
          <p className="section-subtitle justify-center">Get to Know</p>
          <RevealTitle id="about-heading" title="The" accent="Journey." br={false} className="text-center" />
        </div>

        <div className="about-grid grid lg:grid-cols-2 gap-8 md:gap-12 relative z-10 [perspective:1400px]">
          {/* Left Column: Traditional About */}
          <div className="about-col-left space-y-8">
            <div className="about-card glass p-6 sm:p-8 md:p-12 will-change-transform">
              <h3 className="text-2xl font-serif text-white mb-6">Background</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Computer Science student at the University of Management and Technology (UMT) and a Certified Graphic Designer with 2+ years of professional freelance experience on Fiverr (since Jan 2022). Specializes in Vibe Coding — leveraging AI-assisted workflows to rapidly architect and ship production-grade systems across Mobile, Web, and Data Science domains. Proficient in Full-Stack Web (React/Node), Python data science, and C++ systems programming, with a strong track record of deploying complex, scalable solutions independently.
              </p>
            </div>

            <div className="about-card glass p-6 sm:p-8 md:p-12 will-change-transform">
              <div className="flex items-center gap-4 mb-8">
                <FaCertificate className="text-2xl text-white" />
                <h3 className="text-2xl font-medium text-white">Certifications</h3>
              </div>
              <ul className="space-y-5 max-h-[350px] overflow-y-auto pr-4 thin-scrollbar">
                {[
                  { name: 'Crash Course on Python', issuer: 'Google', url: 'https://coursera.org/verify/3XSN75G9EQKR' },
                  { name: 'Python for Data Science, AI & Development', issuer: 'IBM', url: 'https://coursera.org/verify/7FVVR3JMQ9HS' },
                  { name: 'Software Engineering Specialization', issuer: 'HKUST', url: 'https://coursera.org/verify/specialization/FUNRR2SPC9JS' },
                  { name: 'Software Engineering: Implementation and Testing', issuer: 'HKUST', url: 'https://coursera.org/verify/PVBUHCK5TAP8' },
                  { name: 'Software Engineering: Software Design and Project Management', issuer: 'HKUST', url: 'https://coursera.org/verify/4B5DCRZTPU9' },
                  { name: 'Software Engineering: Modeling Software Systems using UML', issuer: 'HKUST', url: 'https://coursera.org/verify/2MVSUDFDS2GN' },
                  { name: 'GenAI Basics - How LLMs Work', issuer: 'Duke University', url: 'https://coursera.org/verify/L982QNDAZHJ2' },
                  { name: 'Finding Your Professional Voice', issuer: 'University of London', url: 'https://coursera.org/verify/RFVV9D6TV8WC' },
                  { name: 'Introduction to DevOps', issuer: 'IBM', url: 'https://coursera.org/verify/3CJ795M458VW' },
                  { name: 'Remote Work Professional', issuer: 'CertiProf', url: 'https://certiprof.com/pages/verify-certificate' },
                  { name: 'Career Essentials in Software Development', issuer: 'Microsoft & LinkedIn', url: '#' },
                  { name: 'Python Data Structures and Algorithms', issuer: 'LinkedIn Learning', url: '#' },
                ].map((cert, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm group">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors shrink-0" aria-hidden="true" />
                    <div className="flex flex-col">
                      {cert.url && cert.url !== '#' ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-white hover:text-slate-300 transition-colors font-medium"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        <span className="text-white font-medium">{cert.name}</span>
                      )}
                      <span className="text-xs text-slate-500 mt-1">{cert.issuer}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Memory Graph */}
          <div className="about-col-right">
            <div className="about-card glass p-8 md:p-12 flex flex-col justify-center h-full will-change-transform">
              <h3 className="text-2xl font-serif text-white mb-10">React Ecosystem Mastery</h3>
              <MemoryGraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

