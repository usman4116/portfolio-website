import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsRobot } from 'react-icons/bs'
import { FiX, FiSend } from 'react-icons/fi'
import { FaRocket, FaCode, FaUser, FaEnvelope } from 'react-icons/fa'

const quickResponses = [
  {
    q: 'What projects have you built?',
    a: 'I have built AcctPro SaaS (multi-tenant accounting system), the UMT Student Portal redesign (25K+ users), Harvest-Max-Ai (ML for agriculture), ChainReaction (C++ blockchain simulation), and a Python EDA CLI tool. Check out the Projects section for details!',
    icon: FaRocket
  },
  {
    q: 'What are your skills?',
    a: 'I specialize in JavaScript/TypeScript, Python, C++, React, Next.js, and Node.js, with strong foundations in Data Structures, Algorithms, and Machine Learning. Visit the Skills section for full details!',
    icon: FaCode
  },
  {
    q: 'Tell me about yourself?',
    a: "I'm Muhammad Usman Farhan, a Computer Science student at UMT and Certified Graphic Designer with 2+ years of freelance experience. I'm passionate about coding, problem-solving, and building production-grade software.",
    icon: FaUser
  },
  {
    q: 'How can I contact you?',
    a: 'You can reach me via email (roxenusman@gmail.com), LinkedIn, or use the contact form in the Contact section. I typically respond within 24 hours!',
    icon: FaEnvelope
  },
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{
    text: "Hi! I'm your AI assistant. Click a question below or ask me anything about Muhammad!",
    isBot: true
  }])
  const [input, setInput] = useState('')

  const handleResponse = (response) => {
    setMessages(prev => [...prev, { text: response, isBot: true }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages(prev => [...prev, { text: input, isBot: false }])
    setTimeout(() => {
      handleResponse("Thanks for your message! For detailed responses, please use the contact form or reach out via email. I'd love to hear from you!")
    }, 800)
    setInput('')
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', bounce: 0.4 }}
        data-hover
        aria-label="Open AI assistant"
      >
        <BsRobot className="text-2xl sm:text-3xl" />
        <motion.div
          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm glass rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-white/5 border-b border-white/10 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                  <BsRobot className="text-xl" />
                </div>
                <div>
                  <span className="font-semibold text-white">AI Assistant</span>
                  <p className="text-xs text-emerald-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close AI assistant"
              >
                <FiX />
              </button>
            </div>

            <div className="h-64 sm:h-72 overflow-y-auto p-4 space-y-3 thin-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                    msg.isBot
                      ? 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                      : 'bg-white text-black rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-white/5 space-y-2">
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((qr, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleResponse(qr.a)}
                    className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-hover
                  >
                    <qr.icon size={12} className="text-slate-400" />
                    {qr.q}
                  </motion.button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-white/40 focus:outline-none transition-colors placeholder-slate-600"
                  data-hover
                />
                <motion.button
                  type="submit"
                  className="p-2.5 bg-white text-black rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                  aria-label="Send message"
                >
                  <FiSend />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
