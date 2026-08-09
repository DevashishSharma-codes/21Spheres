import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -60, duration: 0.8 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;
