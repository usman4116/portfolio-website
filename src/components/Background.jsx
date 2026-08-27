import { lazy, Suspense, useEffect, useState } from 'react'

/**
 * The 3D lattice scene pulls in three.js + @react-three/fiber (~880 kB raw).
 * It is purely decorative and is skipped entirely on touch devices, narrow
 * viewports, and for prefers-reduced-motion — so the import must be gated
 * here rather than inside the scene, otherwise the chunk is downloaded even
 * when it will never render.
 *
 * On eligible devices the import is deferred until the browser is idle so it
 * never competes with the hero for LCP.
 */
const Lattice3D = lazy(() => import('./GridPulse'))

function prefers3D() {
  if (typeof window === 'undefined') return false
  // Same condition the scene used to evaluate internally: skip it on touch
  // devices, narrow viewports, and for prefers-reduced-motion. Deliberately
  // `!coarse` rather than `fine` — a device that reports neither (some
  // desktop browsers do) kept the scene before and must keep it now.
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  const isSmall = window.innerWidth < 768
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return !isTouch && !isSmall && !reducedMotion
}

export default function Background() {
  // Evaluated lazily during the first render: no extra commit, and no
  // setState-inside-effect.
  const [eligible] = useState(prefers3D)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!eligible) return

    let idleId
    let timeoutId

    const start = () => setReady(true)

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(start, { timeout: 2000 })
    } else {
      timeoutId = window.setTimeout(start, 1200)
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [eligible])

  return (
    <div className="fixed inset-0 z-0 bg-[#020202] pointer-events-none" aria-hidden="true">
      {/* Static depth gradient — always present, and the sole background
          on mobile / reduced-motion. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#101010_0%,#020202_70%)]" />

      {eligible && ready && (
        <Suspense fallback={null}>
          <Lattice3D />
        </Suspense>
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#000000_100%)]" />
    </div>
  )
}
