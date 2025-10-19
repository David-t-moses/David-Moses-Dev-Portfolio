'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ff6b6b'),
    uColorEnd: new THREE.Color('#64ffda'),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      float wave = sin(pos.x * 4.0 + uTime) * 0.1;
      wave += sin(pos.y * 6.0 + uTime * 0.8) * 0.05;
      
      pos.z += wave;
      vWave = wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform float uTime;
    
    void main() {
      float mixStrength = (vWave + 0.1) / 0.2;
      mixStrength = smoothstep(0.0, 1.0, mixStrength);
      
      vec3 color = mix(uColorStart, uColorEnd, mixStrength);
      color += sin(vUv.x * 10.0 + uTime) * 0.1;
      
      gl_FragColor = vec4(color, 0.8);
    }
  `
)

export function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uTime = state.clock.elapsedTime
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <waveShaderMaterial transparent />
    </mesh>
  )
}

export default WaveShaderMaterial