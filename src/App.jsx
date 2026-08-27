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
import BackToTop from './components/BackToTop'
import GsapSync from './components/GsapSync'
import Background from './components/Background'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true, syncTouch: false }}>
      <GsapSync />
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Static gradient always; the 3D lattice loads only where it renders. */}
      <Background />

      <div className="relative z-10">
        <Navbar />
        <main id="main">
          <Hero />
          {/* Transparent so the 3D tunnel journey stays visible while scrolling.
              NOTE: must not be display:flex — GSAP pin spacing is disabled inside flex parents */}
          <div>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </div>
        </main>
        <Footer />
        <AIAssistant />
        <BackToTop />
      </div>
    </ReactLenis>
  )
}

export default App
