import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode, FaPython, FaReact } from 'react-icons/fa'

const projects = [
  {
    title: 'AcctPro SaaS',
    description: 'Production-grade, multi-tenant accounting and inventory system with atomic transactions and historical cost snapshotting.',
    tech: ['React 18', 'Node.js', 'Prisma', 'PostgreSQL'],
    category: 'fullstack',
    github: 'https://github.com/usman4116',
    icon: FaReact,
    span: 'md:col-span-2'
  },
  {
    title: 'UMT Student Portal',
    description: 'UI/UX modernization and responsive dashboard redesign for 25,000+ active users at UMT.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'fullstack',
    github: 'https://github.com/usman4116',
    live: 'https://usmanfarhan.netlify.app',
    icon: FaCode,
    span: 'md:col-span-1'
  },
  {
    title: 'Harvest-Max-Ai',
    description: 'Predictive analytics engine using ML for precision agriculture, crop yield optimization, and resource management.',
    tech: ['Python', 'Machine Learning', 'Pandas'],
    category: 'ai',
    github: 'https://github.com/usman4116',
    icon: FaPython,
    span: 'md:col-span-1'
  },
  {
    title: 'ChainReaction',
    description: 'Blockchain ledger simulation implementing Merkle Trees, Queue-based mempool, and a reverse-chain validation system.',
    tech: ['C++', 'DSA', 'Cryptography'],
    category: 'cpp',
    github: 'https://github.com/usman4116',
    icon: FaCode,
    span: 'md:col-span-2'
  },
  {
    title: 'Python EDA CLI Tool',
    description: 'Open-source CLI tool that accelerates Exploratory Data Analysis by 5x for data professionals.',
    tech: ['Python', 'CLI', 'Data Science'],
    category: 'ai',
    github: 'https://github.com/usman4116',
    icon: FaPython,
    span: 'md:col-span-3 lg:col-span-1'
  }
]

const categories = [
  { name: 'All', filter: 'all' },
  { name: 'Full-Stack', filter: 'fullstack' },
  { name: 'AI/Python', filter: 'ai' },
  { name: 'C++/DSA', filter: 'cpp' },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass p-8 flex flex-col group ${project.span}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <project.icon className="text-xl text-white" />
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <FaGithub />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-medium text-white mb-3">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm mb-6 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 text-xs bg-white/5 border border-white/5 rounded-md text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
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

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 z-10">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center text-[15rem] md:text-[25rem] font-black text-white/[0.04] select-none tracking-tighter pointer-events-none z-0 leading-none whitespace-nowrap will-change-transform transform-gpu"
      >
        PROJECTS
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="container relative z-10 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle justify-center">My Work</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
            Selected <br className="hidden md:block" />
            <span className="text-slate-400">Projects.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.filter}
              onClick={() => setActiveFilter(cat.filter)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                activeFilter === cat.filter
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)] relative z-10">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

