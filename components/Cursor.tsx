"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
export const Cursor = () => {
  const mouseMove = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const smoothMouseMove = {
    x: useSpring(mouseMove.x, { stiffness: 500, damping: 40, mass: 0.5 }),
    y: useSpring(mouseMove.y, { stiffness: 500, damping: 40, mass: 0.5 }),
  };
  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      mouseMove.x.set(e.clientX);
      mouseMove.y.set(e.clientY);
      if (!document.body.classList.contains("video-cursor-active")) {
        document.querySelector(".elem-cursor")?.classList.remove("hidden");
      }
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  });
  return (
    <motion.div
      className="pointer-events-none hidden bg-white max-sm:hidden  translate -translate-x-1/2 -translate-y-1/2 fixed mix-blend-exclusion z-50 h-10 w-10 rounded-full elem-cursor"
      style={{
        left: smoothMouseMove.x,
        top: smoothMouseMove.y,
      }}
    ></motion.div>
  );
};
