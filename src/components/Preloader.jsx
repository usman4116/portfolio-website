import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Anyone who has asked for reduced motion gets the content immediately.
function wantsPreloader() {
  if (typeof window === 'undefined') return true
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Preloader() {
  // Lazy initialiser rather than an effect, so reduced-motion visitors never
  // see a frame of the overlay at all.
  const [loading, setLoading] = useState(wantsPreloader)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!loading) return

    let value = 0
    let hideTimeout

    // The overlay used to be dismissed on a hard-coded 1100ms timer, which
    // left the bar sitting at 100% for up to ~680ms of dead time while the
    // real content — and the LCP element with it — stayed hidden. Same
    // animation, now dismissed the moment it finishes.
    const interval = setInterval(() => {
      value = Math.min(value + Math.random() * 22 + 8, 100)
      setProgress(value)
      if (value >= 100) {
        clearInterval(interval)
        hideTimeout = setTimeout(() => setLoading(false), 150)
      }
    }, 80)

    return () => {
      clearInterval(interval)
      clearTimeout(hideTimeout)
    }
    // Runs once: `loading` only ever transitions true -> false, which unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-[#000000] z-[99999] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="relative w-32 h-32 mb-8">
            <motion.div
              className="absolute inset-0 border-4 border-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 border-4 border-white/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src="/profile.jpg"
                alt=""
                width="64"
                height="64"
                className="w-16 h-16 rounded-full object-cover border border-white/20"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              style={{ width: `${Math.min(progress, 100)}%` }}
              initial={{ width: 0 }}
            />
          </div>
          <motion.p
            className="mt-4 text-slate-400 text-sm font-mono tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing... {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
