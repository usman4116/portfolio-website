import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Reusable 3D tilt wrapper.
 * - Tilts toward the cursor with springed rotateX/rotateY
 * - Adds a moving light "glare" that follows the pointer
 * - Disabled automatically on touch devices (no pointer: fine)
 */
export default function Tilt3D({
  children,
  className = '',
  max = 8,          // max tilt in degrees
  glare = true,
  scale = 1.02,
  style = {},
  ...motionProps
}) {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springCfg = { stiffness: 260, damping: 25, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [`${max}deg`, `-${max}deg`]), springCfg)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [`-${max}deg`, `${max}deg`]), springCfg)

  const glareX = useTransform(x, [-0.5, 0.5], ['20%', '80%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['20%', '80%'])
  const glareOpacity = useMotionValue(0)

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const handleMouseMove = (e) => {
    if (!ref.current || !enabled) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
    glareOpacity.set(1)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      {...motionProps}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={enabled ? { scale } : undefined}
      style={{
        ...style,
        ...(enabled ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}),
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{ opacity: glareOpacity, transform: 'translateZ(1px)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: glareX,
              top: glareY,
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 45%)',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
