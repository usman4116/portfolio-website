import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Section heading with a GSAP split-word 3D reveal.
 * Each word rises out of an overflow mask and un-tilts as it enters view.
 */
export default function RevealTitle({ title, accent, br = true, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rt-word',
        { yPercent: 120, rotateX: -55, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const words = (str, cls) =>
    str.split(' ').map((w, i) => (
      <span
        key={`${cls}-${i}`}
        className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] [perspective:600px]"
      >
        <span className={`rt-word inline-block will-change-transform ${cls}`}>{w}&nbsp;</span>
      </span>
    ))

  return (
    <h2
      ref={ref}
      className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8 ${className}`}
    >
      {words(title, 'rt-a')}
      {accent && br && <br className="hidden md:block" />}
      {accent && words(accent, 'rt-b text-slate-400')}
    </h2>
  )
}
