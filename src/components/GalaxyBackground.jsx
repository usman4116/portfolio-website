import { useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function StarField({ count = 3000, mouse }) {
  const ref = useRef()
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
      
      if (mouse.current) {
        ref.current.rotation.x += mouse.current.y * 0.0005
        ref.current.rotation.y += mouse.current.x * 0.0005
      }
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingOrbs() {
  const mesh1 = useRef()
  const mesh2 = useRef()
  const mesh3 = useRef()

  useFrame((state) => {
    if (mesh1.current) {
      mesh1.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 15
      mesh1.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 10
    }
    if (mesh2.current) {
      mesh2.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 12
      mesh2.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 8
    }
    if (mesh3.current) {
      mesh3.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 18
      mesh3.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 12
    }
  })

  return (
    <>
      <mesh ref={mesh1} position={[10, 5, -20]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </mesh>
      <mesh ref={mesh2} position={[-12, -5, -15]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
      </mesh>
      <mesh ref={mesh3} position={[5, -8, -25]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.1} />
      </mesh>
      <pointLight position={[10, 5, -20]} color="#3b82f6" intensity={2} distance={30} />
      <pointLight position={[-12, -5, -15]} color="#06b6d4" intensity={2} distance={25} />
    </>
  )
}

export default function GalaxyBackground() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <Suspense fallback={null}>
          <StarField count={4000} mouse={mouse} />
          <FloatingOrbs />
          <ambientLight intensity={0.3} />
        </Suspense>
      </Canvas>
    </div>
  )
}
