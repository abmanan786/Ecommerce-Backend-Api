// ═══════════════════════════════════════════════════════════════════
// 📌 PURPOSE: Small reusable hooks
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";

// Window Size
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...size,
    isMobile: size.width < 640,
  };
};

// Confetti Timer
export const useConfetti = (duration = 4000) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return show;
};

// Copy to Clipboard
export const useCopyClipboard = (resetTime = 2000) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), resetTime);
  }, [resetTime]);

  return { copied, copy };
};