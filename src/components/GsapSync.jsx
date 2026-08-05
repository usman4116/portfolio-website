import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Keeps GSAP ScrollTrigger in sync with Lenis smooth scrolling.
 * Renders nothing.
 */
export default function GsapSync() {
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    // Recalculate trigger positions after fonts/images/preloader settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 1500)
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => clearTimeout(t)
  }, [])

  return null
}
