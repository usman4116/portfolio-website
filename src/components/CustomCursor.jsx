import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function finePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  // Resolved during the first render rather than in an effect, so touch
  // devices never mount the cursor at all and there is no extra commit.
  const [isFinePointer, setIsFinePointer] = useState(finePointer)

  // Cursor coordinates
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Trailing ring (fast spring to reduce perceived lag)
  const ringX = useSpring(cursorX, { stiffness: 600, damping: 35, mass: 0.4 })
  const ringY = useSpring(cursorY, { stiffness: 600, damping: 35, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = (e) => setIsFinePointer(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      setIsHovered(!!(e.target.closest('a') || e.target.closest('button') || e.target.closest('[data-hover]')))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isFinePointer, cursorX, cursorY])

  if (!isFinePointer) return null

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[99999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(148,163,184,0.7)',
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
