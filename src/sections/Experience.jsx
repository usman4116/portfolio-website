import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'

const timelineData = [
  {
    type: 'work',
    title: 'Certified Graphic Designer',
    organization: 'Fiverr (Freelance)',
    period: 'Jan 2022 - Present',
    description: 'Delivering professional graphic design work for international clients. Services include brand identity, UI mockups, social media design, and print-ready assets. Applying design expertise across software projects for high-quality UX.',
    skills: ['UI/UX Design', 'Branding', 'Adobe Suite', 'Figma']
  },
  {
    type: 'work',
    title: 'Discord Manager & Deputy Leader',
    organization: 'Magician Esports',
    period: '2022 - Present',
    description: 'Managing and moderating the official Discord server, organising clan tournaments, and leading the esports team. Overseeing player rosters, strategy, and serving as Deputy Leader for day-to-day operations.',
    skills: ['Community Management', 'Leadership', 'Event Organization']
  },
  {
    type: 'education',
    title: 'B.Sc. Computer Science',
    organization: 'University of Management and Technology (UMT)',
    period: '2020 - Present',
    description: 'Coursework: Data Structures & Algorithms, Software Engineering, Database Systems, OOP, Discrete Mathematics.',
    skills: ['Computer Science', 'DSA', 'Software Engineering', 'Databases']
  },
  {
    type: 'work',
    title: 'Owner & Operations Manager',
    organization: 'Reliance Water Services',
    period: '2021 - 2023',
    description: 'Founded and managed a water services business. Handled day-to-day operations, financial planning, vendor coordination, and team supervision to ensure consistent service quality and profitability.',
    skills: ['Operations Management', 'Leadership', 'Client Acquisition']
  },
  {
    type: 'education',
    title: 'High School Diploma, Pre-Engineering',
    organization: 'Forman Christian College',
    period: '2022 - 2024',
    description: 'Completed Pre-Engineering stream with focus on Mathematics, Physics, and Computer Science fundamentals.',
    skills: ['Mathematics', 'Physics', 'Analytical Thinking']
  }
]

export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 z-10">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
      >
        EXPERIENCE
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="container relative z-10 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24"
        >
          <p className="section-subtitle justify-center">My Path</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
            Experience & <br className="hidden md:block" />
            <span className="text-slate-400">Education.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {timelineData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className={`relative pl-12 md:pl-0 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
              }`}
            >
              <motion.div
                className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 -translate-x-1/2 bg-black border border-white/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.5, delay: 0.1 }}
              >
                {item.type === 'education' ? (
                  <FaGraduationCap className="text-xs text-white" />
                ) : (
                  <FaBriefcase className="text-xs text-white" />
                )}
              </motion.div>

              <motion.div
                className={`glass p-6 sm:p-8 ${index % 2 === 0 ? 'ml-4 md:ml-0 md:mr-8' : 'ml-4 md:ml-8'}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white capitalize">
                    {item.type}
                  </span>
                  <span className="text-sm text-slate-500">{item.period}</span>
                </div>

                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{item.organization}</p>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-white/5 border border-white/5 rounded text-slate-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
