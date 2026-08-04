import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

const Lattice = () => {
  const groupRef = useRef()

  // Lattice parameters
  const size = 5 // 5x5x5 grid
  const spacing = 3

  // Precalculate positions and lines
  const { spheres, xLines, yLines, zLines } = useMemo(() => {
    const s = []
    const xl = []
    const yl = []
    const zl = []

    const offset = ((size - 1) * spacing) / 2

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const px = x * spacing - offset
          const py = y * spacing - offset
          const pz = z * spacing - offset

          s.push([px, py, pz])

          if (x < size - 1) {
            xl.push({ pos: [px + spacing / 2, py, pz], rot: [0, 0, Math.PI / 2] })
          }
          if (y < size - 1) {
            yl.push({ pos: [px, py + spacing / 2, pz], rot: [0, 0, 0] })
          }
          if (z < size - 1) {
            zl.push({ pos: [px, py, pz + spacing / 2], rot: [Math.PI / 2, 0, 0] })
          }
        }
      }
    }
    return { spheres: s, xLines: xl, yLines: yl, zLines: zl }
  }, [size, spacing])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Slow, subtle rotation to give life to the grid
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.05
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.5
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
        <sphereGeometry args={[0.2, 12, 12]} />
        {spheres.map((pos, i) => (
          <Instance key={`s-${i}`} position={pos} />
        ))}
      </Instances>

      {/* Connections */}
      <Instances limit={xLines.length + yLines.length + zLines.length} material={material}>
        <cylinderGeometry args={[0.03, 0.03, spacing, 6]} />
        {xLines.map((line, i) => <Instance key={`xl-${i}`} position={line.pos} rotation={line.rot} />)}
        {yLines.map((line, i) => <Instance key={`yl-${i}`} position={line.pos} rotation={line.rot} />)}
        {zLines.map((line, i) => <Instance key={`zl-${i}`} position={line.pos} rotation={line.rot} />)}
      </Instances>
    </group>
  )
}

export default function GridPulse() {
  const [enable3D, setEnable3D] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    // Skip the WebGL scene on touch devices, small screens, and for users
    // who prefer reduced motion — they get the static gradient instead.
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const isSmall = window.innerWidth < 768
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnable3D(!isTouch && !isSmall && !reducedMotion)

    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-[#020202] pointer-events-none">
      {/* Static depth gradient — always present, sole background on mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#101010_0%,#020202_70%)]" />

      {enable3D && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.25]}
          frameloop={pageVisible ? 'always' : 'never'}
          gl={{ powerPreference: 'high-performance', antialias: false, alpha: true, stencil: false, depth: true }}
        >
          <fog attach="fog" args={['#020202', 5, 22]} />
          <Lattice />
        </Canvas>
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#000000_100%)]" />
    </div>
  )
}
