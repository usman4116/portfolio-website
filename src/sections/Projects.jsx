import { useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaExternalLinkAlt, FaCode, FaPython, FaReact } from 'react-icons/fa'
import RevealTitle from '../components/RevealTitle'
import Tilt3D from '../components/Tilt3D'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'AcctPro SaaS',
    description: 'Production-grade, multi-tenant accounting and inventory system with atomic transactions and historical cost snapshotting.',
    tech: ['React 18', 'Node.js', 'Prisma', 'PostgreSQL'],
    tag: 'Full-Stack',
    github: 'https://github.com/usman4116',
    icon: FaReact,
  },
  {
    title: 'UMT Student Portal',
    description: 'UI/UX modernization and responsive dashboard redesign for 25,000+ active users at UMT.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    tag: 'UI / UX',
    github: 'https://github.com/usman4116',
    icon: FaCode,
  },
  {
    title: 'Harvest-Max-Ai',
    description: 'Predictive analytics engine using ML for precision agriculture, crop yield optimization, and resource management.',
    tech: ['Python', 'Machine Learning', 'Pandas'],
    tag: 'AI / ML',
    github: 'https://github.com/usman4116',
    icon: FaPython,
  },
  {
    title: 'ChainReaction',
    description: 'Blockchain ledger simulation implementing Merkle Trees, Queue-based mempool, and a reverse-chain validation system.',
    tech: ['C++', 'DSA', 'Cryptography'],
    tag: 'Systems',
    github: 'https://github.com/usman4116',
    icon: FaCode,
  },
  {
    title: 'Python EDA CLI Tool',
    description: 'Open-source CLI tool that accelerates Exploratory Data Analysis by 5x for data professionals.',
    tech: ['Python', 'CLI', 'Data Science'],
    tag: 'Data',
    github: 'https://github.com/usman4116',
    icon: FaPython,
  },
]

function ProjectCard({ project, index }) {
  return (
    <Tilt3D
      as="article"
      max={6}
      scale={1.015}
      className="proj-card glass relative flex flex-col shrink-0 w-full md:w-[min(520px,42vw)] p-6 sm:p-8 md:p-10 md:min-h-[480px] overflow-hidden"
    >
      {/* Oversized index watermark */}
      <span
        className="absolute -top-6 right-2 text-[7rem] md:text-[9rem] font-black text-white/[0.04] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <project.icon className="text-xl text-white" aria-hidden="true" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 border border-white/10 rounded-full px-3 py-1.5 mt-1">
          {project.tag}
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((tech) => (
          <span key={tech} className="px-3 py-1.5 text-xs bg-white/5 border border-white/5 rounded-md text-slate-400">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            data-hover
          >
            <FaGithub aria-hidden="true" />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site`}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            data-hover
          >
            <FaExternalLinkAlt size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </Tilt3D>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const bgY = useTransform(smoothProgress, [0, 1], ['-20%', '20%'])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop: pin the section, page scroll drives the gallery sideways
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const scrollTween = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDist()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })

      // Cards lean away and straighten as they cross the viewport
      gsap.utils.toArray('.proj-card').forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: 10, scale: 0.94 },
          {
            rotateY: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 90%',
              end: 'left 45%',
              scrub: true,
            },
          }
        )
      })
    })

    // Mobile: simple stacked rise-in
    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray('.proj-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      ref={sectionRef}
      className="relative md:min-h-screen md:h-screen flex flex-col justify-center overflow-hidden py-20 md:py-0 z-10"
    >
      {/* Massive Background Text */}
      <motion.div style={{ y: bgY }} className="bg-word will-change-transform transform-gpu" aria-hidden="true">
        PROJECTS
      </motion.div>

      <div className="container relative z-10 mb-8 md:mb-12">
        <p className="section-subtitle">My Work</p>
        <RevealTitle id="projects-heading" title="Selected" accent="Projects." br={false} className="!mb-2" />
        <p className="hidden md:block text-xs uppercase tracking-[0.25em] text-slate-500 mt-4">
          Scroll to explore →
        </p>
      </div>

      {/* Gallery track — horizontal on desktop, stacked on mobile */}
      <div className="relative z-10 [perspective:1400px]">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 px-[clamp(16px,4vw,24px)] md:px-[max(calc((100vw-1280px)/2+24px),24px)] w-full md:w-max will-change-transform"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
          {/* End card: call to action */}
          <div className="proj-card glass hidden md:flex flex-col items-center justify-center shrink-0 w-[min(400px,32vw)] min-h-[480px] p-10 text-center">
            <p className="text-slate-400 text-sm mb-6 uppercase tracking-[0.2em]">More on GitHub</p>
            <a
              href="https://github.com/usman4116"
              target="_blank"
              rel="me noopener noreferrer"
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Muhammad Usman Farhan on GitHub"
              data-hover
            >
              <FaGithub size={26} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Scrub progress rail (desktop) */}
        <div className="hidden md:block container mt-10">
          <div className="h-px bg-white/10 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-white origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
