import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)

  // Cursor coordinates
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Trailing ring (faster spring to reduce perceived lag)
  const ringX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('[data-hover]')) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    // Only add listeners on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseover', handleMouseOver)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-slate-400 rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderColor: isHovered ? '#ffffff' : '#94a3b8'
        }}
        transition={{ scale: { duration: 0.2 }, backgroundColor: { duration: 0.2 } }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 20px #ffffff, 0 0 40px #ffffff'
        }}
      />
    </>
  )
}

