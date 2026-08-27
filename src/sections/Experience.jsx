import { useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import RevealTitle from '../components/RevealTitle'

gsap.registerPlugin(ScrollTrigger)

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
  const timelineRef = useRef(null)

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
      // Timeline spine draws itself as you scroll through the section
      gsap.fromTo(
        '.tl-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        }
      )

      // Cards swing in from alternating sides in 3D
      gsap.utils.toArray('.tl-card').forEach((card, i) => {
        const fromLeft = i % 2 === 0
        gsap.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -70 : 70, rotateY: fromLeft ? 14 : -14 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          }
        )
      })

      // Node dots pop with a slight overshoot
      gsap.utils.toArray('.tl-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: dot, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" aria-labelledby="experience-heading" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 z-10">
      {/* Massive Background Text */}
      <motion.div
        style={{ y }}
        className="bg-word will-change-transform transform-gpu"
        aria-hidden="true"
      >
        EXPERIENCE
      </motion.div>

      <div className="container relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-24">
          <p className="section-subtitle justify-center">My Path</p>
          <RevealTitle id="experience-heading" title="Experience &" accent="Education." className="text-center" />
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto [perspective:1200px]">
          <div className="tl-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/15 to-white/5" />

          {timelineData.map((item, index) => (
            <div
              key={item.title}
              className={`relative pl-12 md:pl-0 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
              }`}
            >
              <div className="tl-dot absolute left-0 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 -translate-x-1/2 bg-black border border-white/20">
                {item.type === 'education' ? (
                  <FaGraduationCap className="text-xs text-white" />
                ) : (
                  <FaBriefcase className="text-xs text-white" />
                )}
              </div>

              <div
                className={`tl-card glass p-6 sm:p-8 will-change-transform ${index % 2 === 0 ? 'ml-4 md:ml-0 md:mr-8' : 'ml-4 md:ml-8'}`}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
