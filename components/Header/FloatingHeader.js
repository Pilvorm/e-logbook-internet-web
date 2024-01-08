import { useEffect, useRef, useState } from "react";

export const useOnScreen = (
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  }
) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const callbackFn = (entries) => {
    const [entry] = entries;
    setIsInView(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return { containerRef, isInView };
};

export function FloatingHeader({ isInView, children, ...props }) {
  return (
    <div
      className={`bg-white rounded ${props.className}`}
      style={{
        padding: isInView ? "1rem 2rem 0 2rem" : "2rem",
        position: isInView ? "relative" : "fixed",
        top: isInView ? "unset" : "90px",
        right: isInView ? "unset" : "40px",
        left: isInView ? "unset" : "120px",
        zIndex: isInView ? "unset" : "997", // the same as navbar
        boxShadow: isInView ? "unset" : "0 .5rem 1rem rgba(0,0,0,.15)",
      }}
    >
      {children}
    </div>
  );
}
