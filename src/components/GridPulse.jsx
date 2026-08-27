import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Shared scroll + mouse refs — updated outside React render cycle   */
/* ------------------------------------------------------------------ */
function useScrollProgressRef() {
  const progress = useRef(0)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress.current = max > 0 ? window.scrollY / max : 0
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function useMouseRef() {
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return mouse
}

/* ------------------------------------------------------------------ */
/*  Camera rig — flies THROUGH the lattice as the page scrolls        */
/* ------------------------------------------------------------------ */
function CameraRig({ scrollRef, mouseRef }) {
  useFrame((state, delta) => {
    const p = scrollRef.current
    const cam = state.camera
    const ease = Math.min(1, delta * 3)

    // Journey: start in front of the tunnel, fly deep into it
    const targetZ = 11 - p * 28                     // 11 → -17
    const targetY = Math.sin(p * Math.PI * 2) * 1.2 + mouseRef.current.y * 0.6
    const targetX = Math.sin(p * Math.PI) * 1.5 + mouseRef.current.x * 0.9

    cam.position.z += (targetZ - cam.position.z) * ease
    cam.position.y += (targetY - cam.position.y) * ease
    cam.position.x += (targetX - cam.position.x) * ease

    // Gentle banking as we travel
    cam.rotation.z += (Math.sin(p * Math.PI * 2) * 0.06 - cam.rotation.z) * ease
    cam.rotation.y += (mouseRef.current.x * -0.05 - cam.rotation.y) * ease
    cam.rotation.x += (mouseRef.current.y * 0.04 - cam.rotation.x) * ease
  })
  return null
}

/* ------------------------------------------------------------------ */
/*  Lattice — elongated 5x5x9 tunnel of nodes + connectors            */
/* ------------------------------------------------------------------ */
const Lattice = ({ scrollRef }) => {
  const groupRef = useRef()

  const sizeXY = 5
  const sizeZ = 9
  const spacing = 3

  const { spheres, xLines, yLines, zLines } = useMemo(() => {
    const s = []
    const xl = []
    const yl = []
    const zl = []

    const offXY = ((sizeXY - 1) * spacing) / 2
    const offZ = ((sizeZ - 1) * spacing) / 2

    for (let x = 0; x < sizeXY; x++) {
      for (let y = 0; y < sizeXY; y++) {
        for (let z = 0; z < sizeZ; z++) {
          const px = x * spacing - offXY
          const py = y * spacing - offXY
          const pz = z * spacing - offZ

          s.push([px, py, pz])

          if (x < sizeXY - 1) xl.push({ pos: [px + spacing / 2, py, pz], rot: [0, 0, Math.PI / 2] })
          if (y < sizeXY - 1) yl.push({ pos: [px, py + spacing / 2, pz], rot: [0, 0, 0] })
          if (z < sizeZ - 1) zl.push({ pos: [px, py, pz + spacing / 2], rot: [Math.PI / 2, 0, 0] })
        }
      }
    }
    return { spheres: s, xLines: xl, yLines: yl, zLines: zl }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const p = scrollRef.current
    if (groupRef.current) {
      // Lattice slowly rotates around the flight axis as you scroll deeper
      groupRef.current.rotation.z = p * Math.PI * 0.5 + Math.sin(t * 0.1) * 0.05
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.08
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.4
    }
  })

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.3 }),
    []
  )

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <Instances limit={spheres.length} material={material}>
        <sphereGeometry args={[0.18, 10, 10]} />
        {spheres.map((pos, i) => (
          <Instance key={`s-${i}`} position={pos} />
        ))}
      </Instances>

      {/* Connections */}
      <Instances limit={xLines.length + yLines.length + zLines.length} material={material}>
        <cylinderGeometry args={[0.025, 0.025, spacing, 5]} />
        {xLines.map((line, i) => <Instance key={`xl-${i}`} position={line.pos} rotation={line.rot} />)}
        {yLines.map((line, i) => <Instance key={`yl-${i}`} position={line.pos} rotation={line.rot} />)}
        {zLines.map((line, i) => <Instance key={`zl-${i}`} position={line.pos} rotation={line.rot} />)}
      </Instances>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Star dust — cheap single-draw-call particle field for depth       */
/* ------------------------------------------------------------------ */
function StarDust({ count = 300 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    let seed = 42
    const rand = () => {
      // deterministic LCG so SSR/HMR stay stable
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 44
      arr[i * 3 + 1] = (rand() - 0.5) * 30
      arr[i * 3 + 2] = (rand() - 0.5) * 70 - 5
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#ffffff" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Root — canvas only.                                                */
/*                                                                     */
/*  The wrapper element, static gradient, vignette, and the device      */
/*  capability gating all live in Background.jsx so that this module    */
/*  (and three.js with it) is only ever downloaded when it will render. */
/* ------------------------------------------------------------------ */
export default function GridPulse() {
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const scrollRef = useScrollProgressRef()
  const mouseRef = useMouseRef()

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 1.25]}
      frameloop={pageVisible ? 'always' : 'never'}
      gl={{ powerPreference: 'high-performance', antialias: false, alpha: true, stencil: false, depth: true }}
    >
      <fog attach="fog" args={['#020202', 4, 24]} />
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
      <Lattice scrollRef={scrollRef} />
      <StarDust />
    </Canvas>
  )
}
