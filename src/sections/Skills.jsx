import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa'

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
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
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

  return (
    <section id="skills" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 z-10">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
      >
        SKILLS
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
          className="text-center mb-24"
        >
          <p className="section-subtitle justify-center">What I Know</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
            Technical <br className="hidden md:block" />
            <span className="text-slate-400">Arsenal.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] mb-4 relative z-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`glass p-8 md:p-10 flex flex-col group ${category.span}`}
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
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass p-8 md:p-10 md:col-span-4"
          >
            <h3 className="text-lg font-medium text-slate-300 mb-8">Additional Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-5 py-2.5 bg-white/5 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 cursor-default font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
