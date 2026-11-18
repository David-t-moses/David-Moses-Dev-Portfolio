"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Tracks whether an element is on screen and the tab is visible, plus reduced
 * motion, without triggering React renders. Decorative loops read `.current`
 * and `subscribe` to start or stop themselves.
 */
export function useActive(target: RefObject<Element>) {
  const state = useRef({ onScreen: true, tabVisible: true, reduced: false });
  const listeners = useRef(new Set<() => void>());

  useEffect(() => {
    const el = target.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const s = state.current;
    const notify = () => listeners.current.forEach((fn) => fn());

    s.tabVisible = !document.hidden;
    s.reduced = mq.matches;

    const io = new IntersectionObserver(([entry]) => {
      s.onScreen = entry.isIntersecting;
      notify();
    });
    if (el) io.observe(el);

    const onVis = () => { s.tabVisible = !document.hidden; notify(); };
    const onMq = () => { s.reduced = mq.matches; notify(); };
    document.addEventListener("visibilitychange", onVis);
    mq.addEventListener("change", onMq);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMq);
    };
  }, [target]);

  return {
    state,
    subscribe: (fn: () => void) => {
      listeners.current.add(fn);
      return () => { listeners.current.delete(fn); };
    },
  };
}
