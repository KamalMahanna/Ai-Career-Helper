import { useCallback, useEffect, useRef } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  delay?: number;
}

export const useSmoothScroll = () => {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToElement = useCallback((element: HTMLElement | null, options: SmoothScrollOptions = {}) => {
    if (!element) return;

    const {
      offset = 0,
      delay = 100
    } = options;

    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Add a small delay to ensure DOM is updated
    timeoutRef.current = window.setTimeout(() => {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const targetPosition = absoluteElementTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, delay);
  }, []);

  return { scrollToElement };
};
