import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit,
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.12,
      ...options,
    });
    return () => observerRef.current?.disconnect();
  }, [callback, options]);

  return observerRef;
}

export function useAnimateOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const el of Array.from(elements)) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}
