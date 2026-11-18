"use client"

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HeroEditor from '../HeroEditor';
import { useActive } from '../useActive';

const MAX_PIXEL_RATIO = 1.5;
const FRAME_MS = 1000 / 30; // decorative drift does not need more than 30fps

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { state, subscribe } = useActive(sectionRef);

  // One renderer, one loop per mounted effect. Pointer data lives in a ref.
  //
  // The canvas is created here, not in JSX, so every effect run (including React Strict
  // Mode's development replay) owns a fresh canvas. Reusing one canvas after
  // `forceContextLoss()` hands the next renderer an already lost context, which crashed
  // Three.js with "Cannot read properties of null (reading 'precision')".
  // If WebGL is unavailable, fails to initialise or is lost, only this decorative canvas is
  // omitted: the CSS background, content, editor and buttons are unaffected. No retries.
  useEffect(() => {
    const host = canvasHostRef.current;
    const section = sectionRef.current;
    if (!host || !section) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);

    let renderer: THREE.WebGLRenderer | null = null;
    let particlesGeometry: THREE.BufferGeometry | null = null;
    let particlesMaterial: THREE.PointsMaterial | null = null;
    let scene: THREE.Scene | null = null;
    let particles: THREE.Points | null = null;
    let unsubscribe: (() => void) | null = null;
    let frame = 0;
    let resizeRaf = 0;
    let running = false;
    let dead = false; // set once the effect is torn down or WebGL has failed
    let onResize: (() => void) | null = null;
    let onLost: ((e: Event) => void) | null = null;

    // Releases whatever was created so far. Safe to call at any point, and more than once.
    const teardown = () => {
      dead = true;
      running = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeRaf);
      unsubscribe?.();
      unsubscribe = null;
      if (onResize) window.removeEventListener('resize', onResize);
      if (onLost) canvas.removeEventListener('webglcontextlost', onLost);
      if (scene && particles) scene.remove(particles);
      particlesGeometry?.dispose();
      particlesMaterial?.dispose();
      try { renderer?.dispose(); } catch { /* the context may already be gone */ }
      // The canvas is discarded below, so releasing its context cannot affect a later effect run.
      try { renderer?.forceContextLoss(); } catch { /* already lost */ }
      renderer = null;
      canvas.remove();
    };

    try {
      const probe = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer = probe;
      // A context can be created and already be lost (GPU reset, blocklist). Treat it as unavailable.
      if (probe.getContext().isContextLost()) throw new Error('WebGL context is lost');

      probe.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
      const sc = new THREE.Scene();
      scene = sc;
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 8;

      const geometry = new THREE.BufferGeometry();
      particlesGeometry = geometry;
      const particlesCount = 800;
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 25;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      // PointsMaterial is unlit, so the previous ambient and point lights had no effect and were removed.
      const material = new THREE.PointsMaterial({
        color: 0x06b6d4, size: 0.03, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
      });
      particlesMaterial = material;
      const points = new THREE.Points(geometry, material);
      particles = points;
      sc.add(points);

      const resize = () => {
        const w = section.clientWidth;
        const h = section.clientHeight;
        probe.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      let time = 0;
      let last = 0;

      const draw = () => {
        points.rotation.y = time * 0.05;
        points.rotation.x = time * 0.02;
        camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseRef.current.y * 2 - camera.position.y) * 0.05;
        camera.lookAt(sc.position);
        probe.render(sc, camera);
      };

      // A render error must not escape a frame callback: stop and drop the canvas instead.
      const fail = () => { if (!dead) teardown(); };

      const tick = (now: number) => {
        if (dead) return;
        frame = requestAnimationFrame(tick);
        if (now - last < FRAME_MS) return;
        last = now;
        time += 0.005 * 2; // 30fps: keep drift speed the same as 60fps
        try { draw(); } catch { fail(); }
      };

      const sync = () => {
        if (dead) return;
        const s = state.current;
        const shouldRun = s.onScreen && s.tabVisible && !s.reduced;
        if (shouldRun && !running) { running = true; frame = requestAnimationFrame(tick); }
        else if (!shouldRun && running) { running = false; cancelAnimationFrame(frame); }
        if (!shouldRun && s.reduced && s.onScreen) { try { draw(); } catch { fail(); } } // single static frame
      };

      // Context loss at runtime: stop drawing and omit the canvas. No re-creation, no retry loop.
      onLost = (e: Event) => { e.preventDefault(); fail(); };
      canvas.addEventListener('webglcontextlost', onLost);

      unsubscribe = subscribe(sync);
      sync();

      onResize = () => {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          if (dead) return;
          try { resize(); if (!running) draw(); } catch { fail(); }
        });
      };
      window.addEventListener('resize', onResize);
    } catch {
      // WebGL unavailable or failed to initialise: clean up what was created and carry on.
      teardown();
    }

    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
      onMouseMove={handleMouseMove}
    >
      <div ref={canvasHostRef} aria-hidden="true" className="absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-6 lg:px-16 gap-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
            <span className="text-xs text-slate-300 font-medium tracking-wide">Open to new projects</span>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
            <span className="text-white">Hi, I&apos;m </span>
            <span className="text-indigo-300">David Moses</span>
          </h1>

          <div className="font-heading text-2xl md:text-4xl text-white mb-6 text-balance">
            Full Stack Developer <br className="sm:hidden" />&amp; AI Engineer
          </div>

          <p className="text-lg text-gray-400 mb-8 leading-relaxed mx-auto max-w-3xl text-pretty">
            I help turn your idea into a product people enjoy using, built to grow with your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/#projects" className="btn-compact btn-compact-primary px-6 w-full max-w-xs sm:w-auto">
              View My Work
            </Link>
            <Link
              href="https://calendly.com/davidtmoses5/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-compact btn-compact-ghost px-6 w-full max-w-xs sm:w-auto"
            >
              Book a call
            </Link>
          </div>
        </div>

        <HeroEditor />
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
}
