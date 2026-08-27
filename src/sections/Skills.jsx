import { useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa'
import RevealTitle from '../components/RevealTitle'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Core Languages',
    icon: FaCode,
    span: 'md:col-span-2 md:row-span-2',
    skills: [
      { name: 'JavaScript / TypeScript', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'C++', level: 85 },
      { name: 'Dart', level: 80 },
    ]
  },
  {
    title: 'Frontend & Mobile',
    icon: FaLayerGroup,
    span: 'md:col-span-2 md:row-span-1',
    skills: [
      { name: 'React 18 & Next.js', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Responsive Design', level: 90 },
    ]
  },
  {
    title: 'Backend & Data',
    icon: FaTools,
    span: 'md:col-span-2 md:row-span-1',
    skills: [
      { name: 'Node.js & Express', level: 85 },
      { name: 'PostgreSQL & Prisma', level: 85 },
      { name: 'Machine Learning & Pandas', level: 80 },
    ]
  }
]

const otherSkills = [
  'Vibe Coding', 'EDA Automation', 'SQLite', 'Hive (NoSQL)',
  'Git', 'Docker', 'VS Code', 'Figma', 'Adobe Suite',
  'Clean Architecture', 'BLoC Pattern', 'Atomic Transactions'
]

function SkillBar({ name, level }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-sm text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="skill-fill h-full bg-white rounded-full origin-left"
          data-level={level}
          style={{ width: `${level}%`, transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
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
      // Cards surface from depth with a stagger
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 80, rotateX: 16, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', once: true },
        }
      )

      // Bars grow with a scrubbed sweep once cards are up
      gsap.utils.toArray('.skill-fill').forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: bar, start: 'top 88%', once: true },
          }
        )
      })

      // Chips cascade in
      gsap.fromTo(
        '.skill-chip',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.skill-chips', start: 'top 88%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" aria-labelledby="skills-heading" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 z-10">
      {/* Massive Background Text */}
      <motion.div
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
        aria-hidden="true"
      >
        SKILLS
      </motion.div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-24">
          <p className="section-subtitle justify-center">What I Know</p>
          <RevealTitle id="skills-heading" title="Technical" accent="Arsenal." className="text-center" />
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] mb-4 relative z-10 [perspective:1400px]">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={`skill-card glass p-6 sm:p-8 md:p-10 flex flex-col group will-change-transform ${category.span}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <category.icon className="text-xl text-white" />
                </div>
                <h3 className="text-xl font-medium text-white">{category.title}</h3>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                {category.skills.map(skill => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}

          <div className="skill-card glass p-6 sm:p-8 md:p-10 md:col-span-4 will-change-transform">
            <h3 className="text-lg font-medium text-slate-300 mb-8">Additional Technologies</h3>
            <div className="skill-chips flex flex-wrap gap-3">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip px-5 py-2.5 bg-white/5 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
