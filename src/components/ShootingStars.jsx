import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ShootingStars() {
  const [stars, setStars] = useState([])

  const createStar = () => {
    const newStar = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.5,
      angle: Math.random() * 30 + 15,
    }
    setStars(prev => [...prev, newStar])
    
    setTimeout(() => {
      setStars(prev => prev.filter(s => s.id !== newStar.id))
    }, 1500)
  }

  useEffect(() => {
    const interval = setInterval(createStar, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.x,
            top: star.y,
            transform: `rotate(${star.angle}deg)`
          }}
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, x: 300, y: 200 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}
