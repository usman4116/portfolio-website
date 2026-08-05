import { motion, useScroll, useTransform } from 'framer-motion'

function HeroStat({ icon: Icon, value, label, subtext }) {
  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
      <div className="flex items-center gap-2 text-white">
        {Icon && <Icon className="text-slate-400 text-sm" />}
        <span className="text-2xl font-bold font-sans">{value}</span>
      </div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest">{label}</div>
      {subtext && <div className="text-[10px] text-slate-600 mt-0.5">{subtext}</div>}
    </div>
  )
}

const StatIcon1 = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
const StatIcon2 = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
const StatIcon3 = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
const StatIcon4 = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
const StatIcon5 = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

// Variants for staggered children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: 'easeOut' } }
}

export default function Hero() {
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 500], [1, 0.75])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  // 3D: card tips backwards into space and sinks as you scroll away
  const rotateX = useTransform(scrollY, [0, 500], ['0deg', '18deg'])
  const cardY = useTransform(scrollY, [0, 500], [0, 80])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-12">

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center pt-24 lg:pt-20 [perspective:1200px]">
        <motion.div
          className="glass rounded-[2rem] p-6 sm:p-8 md:p-12 w-full bg-black/50 border border-white/10 shadow-2xl origin-center will-change-transform"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ scale, opacity, rotateX, y: cardY, transformStyle: 'preserve-3d' }}
        >
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Typography */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div variants={item} className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">Available for Work</span>
                </div>
              </motion.div>

              <motion.h2 variants={item} className="text-xl md:text-3xl font-medium text-white mb-2 tracking-tight">
                Software Engineer
              </motion.h2>

              <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold leading-[0.95] tracking-tighter mb-6 text-white">
                <span className="block text-slate-300">Muhammad</span>
                <span className="block">Usman Farhan</span>
              </motion.h1>

              <motion.p variants={item} className="text-sm md:text-base text-slate-400 max-w-md mb-12 font-medium tracking-wide">
                Full-Stack Engineer • AI-Driven Developer • Certified Graphic Designer
              </motion.p>

              <motion.div variants={item} className="flex flex-col items-center lg:items-start gap-2 text-slate-500">
                <span className="text-[10px] uppercase tracking-widest font-medium ml-1">Scroll</span>
                <div className="flex flex-col gap-1 mt-1 ml-4 lg:ml-5">
                  <div className="w-1 h-1 rounded-full bg-slate-500" />
                  <div className="w-1 h-1 rounded-full bg-slate-600" />
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                </div>
              </motion.div>
            </div>

            {/* Right Side: Profile Picture */}
            <motion.div
              variants={item}
              className="relative w-full max-w-[280px] lg:max-w-xs mx-auto aspect-square rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
              style={{ transform: 'translateZ(45px)' }}
              whileHover={{ rotateY: 6, rotateX: -4, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <img src="/profile.jpg" alt="Muhammad Usman Farhan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Stats Row — in normal flow on mobile, pinned to the bottom on desktop */}
      <motion.div
        className="hero-stats w-full z-20 px-4 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-8 border-t border-white/10 pt-8">
          <HeroStat icon={StatIcon1} value="2+ Years" label="Freelance Exp" />
          <HeroStat icon={StatIcon2} value="25K+" label="Active Users" subtext="UMT Portal" />
          <HeroStat icon={StatIcon3} value="5x" label="Faster EDA" subtext="CLI Tool" />
          <HeroStat icon={StatIcon4} value="100%" label="Accuracy" subtext="AcctPro P&L" />
          <HeroStat icon={StatIcon5} value="Vibe Coding" label="Workflow" />
        </div>
      </motion.div>

    </section>
  )
}
