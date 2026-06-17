import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for buttery smooth trailing (lowered stiffness)
  const outerSpringConfig = { damping: 30, stiffness: 100, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, outerSpringConfig);
  const cursorYSpring = useSpring(cursorY, outerSpringConfig);

  // Ultra-fast spring for the inner dot to smooth out low polling rate mice
  const innerSpringConfig = { damping: 25, stiffness: 600, mass: 0.05 };
  const innerXSpring = useSpring(cursorX, innerSpringConfig);
  const innerYSpring = useSpring(cursorY, innerSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const moveCursor = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 18); // Center the 36x36 outer ring
        cursorY.set(e.clientY - 18);
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('iso-btn')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    }

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  // To hide the default cursor system-wide when this is active
  useEffect(() => {
    document.body.style.cursor = 'none';

    // Also hide default cursor on interactive elements since we handle it
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-white/40 shadow-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 36,
          height: 36,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />
      {/* Inner dot that snaps instantly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          x: useTransform(innerXSpring, (x) => x + 14),
          y: useTransform(innerYSpring, (y) => y + 14),
          width: 8,
          height: 8,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Inner dot disappears on hover to let outer ring shine
        }}
      />
    </>
  );
};

export default CustomCursor;








