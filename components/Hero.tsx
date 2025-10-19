"use client"

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedCode, setTypedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [codeSetIndex, setCodeSetIndex] = useState(0);

  // Load JetBrains Mono font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const codeSets = [
    {
      name: 'React + TypeScript',
      lines: [
        "import { useState } from 'react';",
        "import * as THREE from 'three';",
        "",
        "const DavidMoses: React.FC = () => {",
        "  const stack = ['React', 'Next.js', 'TypeScript'];",
        "  return <MagicHappens />;",
        "};",
      ]
    },
    {
      name: 'Three.js Scene',
      lines: [
        "import * as THREE from 'three';",
        "",
        "const scene = new THREE.Scene();",
        "const geometry = new THREE.IcosahedronGeometry(2);",
        "",
        "const material = new THREE.MeshPhysicalMaterial({",
        "  metalness: 0.9, roughness: 0.1",
        "});",
      ]
    },
    {
      name: 'Node.js + TypeScript',
      lines: [
        "// Node.js API Server",
        "",
        "interface Portfolio {",
        "  developer: string;",
        "  skills: string[];",
        "}",
        "",
        "const api = (): Portfolio => ({ ... });",
      ]
    }
  ];

  const codeLines = codeSets[codeSetIndex].lines;

  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let currentText = '';

    const typeInterval = setInterval(() => {
      // Typing forward
      if (lineIndex < codeLines.length) {
        if (charIndex < codeLines[lineIndex].length) {
          currentText += codeLines[lineIndex][charIndex];
          setTypedCode(currentText);
          charIndex++;
        } else {
          currentText += '\n';
          setTypedCode(currentText);
          lineIndex++;
          setCurrentLine(lineIndex);
          charIndex = 0;
        }
      } else {
        // Finished typing, wait then wipe ALL AT ONCE
        clearInterval(typeInterval);
        setTimeout(() => {
          // Instant wipe - all at once in a blink
          setTypedCode('');
          setCurrentLine(0);
          // Move to next code set
          setTimeout(() => {
            setCodeSetIndex((prev) => (prev + 1) % codeSets.length);
          }, 100);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [codeSetIndex, codeSets.length]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;

    // Floating code blocks (removed per user request)
    const codeBlocks = [];

    // Particles for brackets and symbols
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 1.5);
    pointLight3.position.set(0, 0, 8);
    scene.add(pointLight3);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Animate code blocks (removed)

      // Particles animation
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;

      // Mouse parallax
      camera.position.x += (mousePos.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mousePos.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [mousePos]);

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    });
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
      onMouseMove={handleMouseMove}
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* Three.js Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-6 lg:px-16 gap-12 max-w-7xl mx-auto">
        
        {/* Text Content - Centered */}
        <div className="text-center max-w-3xl">
          {/* Top Badge */}
          <div className="mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-5 py-2 inline-flex items-center gap-2 shadow-2xl mx-auto">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium tracking-wide">Available for Projects</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              David Moses
            </span>
          </h1>

          {/* Subheading */}
          <div className="text-2xl md:text-4xl font-semibold text-white mb-6" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Full Stack Developer
          </div>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-8 leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Specializing in modern web technologies. Building clean, efficient,
            and scalable solutions that bring digital visions to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#projects">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
              View My Work
            </button>
            </Link>
            <Link href="https://calendly.com/davidtmoses5/30min" target='_blank'>
            <button className="px-8 py-4 backdrop-blur-xl bg-white/5 text-white font-semibold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Book a call
            </button>
            </Link>
          </div>
        </div>

        {/* Floating Code Editor - Centered */}
        <div className="max-w-5xl w-full relative select-none max-[550px]:hidden">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 border border-indigo-500/30 rounded-3xl shadow-[0_0_80px_rgba(99,102,241,0.4),0_0_40px_rgba(139,92,246,0.3)] overflow-hidden transform hover:scale-[1.02] hover:shadow-[0_0_100px_rgba(99,102,241,0.5),0_0_60px_rgba(139,92,246,0.4)] transition-all duration-500 max-h-96 relative group ring-1 ring-white/10">
            {/* Editor Header */}
            <div className="bg-gradient-to-r from-slate-800/90 via-slate-800/80 to-slate-800/90 px-8 py-5 border-b border-indigo-500/20 flex items-center justify-between backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-all cursor-pointer shadow-lg shadow-red-500/50 hover:shadow-red-400/60"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all cursor-pointer shadow-lg shadow-yellow-500/50 hover:shadow-yellow-400/60"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-all cursor-pointer shadow-lg shadow-green-500/50 hover:shadow-green-400/60"></div>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-700/50 px-4 py-1.5 rounded-lg border border-white/10">
                <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                <div className="text-gray-200 text-sm font-semibold" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  {codeSets[codeSetIndex].name}
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <span className="text-xs text-gray-400 font-medium">TypeScript</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-xs text-emerald-400 font-semibold tracking-wide">LIVE</span>
                </div>
              </div>
            </div>

            {/* Line Numbers & Code */}
            <div className="flex text-sm md:text-base relative" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              {/* Line Numbers */}
              <div className="bg-gradient-to-r from-slate-800/60 to-slate-800/40 px-6 py-8 text-gray-500 select-none border-r border-indigo-500/20 shadow-inner">
                {codeLines.map((_, i) => (
                  <div key={i} className="leading-7 text-right font-medium">{i + 1}</div>
                ))}
              </div>

              {/* Code Content */}
              <div className="flex-1 px-8 py-8 overflow-hidden bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50">
                <pre className="text-gray-300 leading-7">
                  <code>
                    {typedCode.split('\n').map((line, i) => (
                      <div key={i} className="hover:bg-indigo-500/10 -mx-3 px-3 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500/50">
                        {line.split(/(\bimport\b|\bfrom\b|\bconst\b|\blet\b|\bvar\b|\bfunction\b|\btype\b|\breturn\b|\bexport\b|\bdefault\b|\binterface\b|'[^']*'|"[^"]*"|\d+|\/\/.*$)/g).map((part, j) => {
                          if (['import', 'from', 'const', 'let', 'var', 'function', 'type', 'return', 'export', 'default', 'interface'].includes(part)) {
                            return <span key={j} className="text-purple-400 font-bold">{part}</span>;
                          } else if (part.match(/^['"][^'"]*['"]$/)) {
                            return <span key={j} className="text-emerald-400 font-medium">{part}</span>;
                          } else if (part.match(/^\d+$/)) {
                            return <span key={j} className="text-cyan-400 font-semibold">{part}</span>;
                          } else if (part.includes(':') && !part.includes('//')) {
                            return <span key={j} className="text-sky-300">{part}</span>;
                          } else if (part.match(/^\/\/.*/)) {
                            return <span key={j} className="text-gray-500 italic">{part}</span>;
                          } else if (part.match(/^[A-Z][a-zA-Z]*$/)) {
                            return <span key={j} className="text-yellow-300 font-semibold">{part}</span>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                        {i === currentLine && (
                          <span className="inline-block w-2.5 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse ml-1 shadow-lg shadow-indigo-400/50"></span>
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Enhanced blur fade at bottom with glow */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent pointer-events-none"></div>
            
            {/* Animated glow effects on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
              <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-400 to-transparent"></div>
              <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
}