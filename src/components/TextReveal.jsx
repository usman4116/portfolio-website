import { motion } from 'framer-motion'

export default function TextReveal({ text, className = "", as: Component = "h2" }) {
  // We can also allow mixing html inside by passing children instead, but for simple stagger, 
  // splitting text by spaces is easiest.
  const words = typeof text === 'string' ? text.split(" ") : []

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Handle the case where we might pass mixed elements (e.g. italics) directly as children
  // For Solutionave-style mixed fonts, we might need a more robust solution, 
  // but let's stick to simple strings or arrays of objects.
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="overflow-hidden inline-block mr-[0.25em]"
        >
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
