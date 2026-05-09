import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import GridPulse from './components/GridPulse'

function App() {
  return (
    <ReactLenis root>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      
      {/* 3D Background */}
      <GridPulse />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="flex flex-col bg-[#020202]">
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </div>
        </main>
        <div className="bg-[#020202]">
          <Footer />
        </div>
        <AIAssistant />
      </div>
    </ReactLenis>
  )
}

export default App
