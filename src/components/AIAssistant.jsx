import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsRobot } from 'react-icons/bs'
import { FiX, FiSend } from 'react-icons/fi'
import { FaRocket, FaCode, FaUser, FaEnvelope } from 'react-icons/fa'

const quickResponses = [
  { 
    q: 'What projects have you built?', 
    a: 'I have built several projects including Library Management System, Student Management System, AI Code Assistant, and Personal Finance Tracker. Check out the Projects section for details!',
    icon: FaRocket
  },
  { 
    q: 'What are your skills?', 
    a: 'I specialize in C++, Python, JavaScript, React, and have strong foundations in Data Structures, Algorithms, and OOP. Visit the Skills section for full details!',
    icon: FaCode
  },
  { 
    q: 'Tell me about yourself?', 
    a: "I'm Muhammad Usman Farhan, a Computer Science student at UMT. I'm passionate about coding, problem-solving, and building innovative software solutions.",
    icon: FaUser
  },
  { 
    q: 'How can I contact you?', 
    a: 'You can reach me via email, LinkedIn, or use the contact form in the Contact section. I typically respond within 24 hours!',
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
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.4)',
            '0 0 40px rgba(59, 130, 246, 0.6)',
            '0 0 20px rgba(59, 130, 246, 0.4)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        data-hover
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <BsRobot className="text-3xl text-white" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-8 z-50 w-96 glass rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BsRobot className="text-xl text-white" />
                </motion.div>
                <div>
                  <span className="font-semibold text-white">AI Assistant</span>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <FiX />
              </button>
            </div>

            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-white/5 border border-white/10 rounded-tl-none' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none'
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
                    className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-hover
                  >
                    <qr.icon size={12} className="text-blue-400" />
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
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 transition-colors placeholder-slate-600"
                  data-hover
                />
                <motion.button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
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
