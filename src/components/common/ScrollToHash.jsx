import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Ignore route changes for contact modal to preserve background scroll position
    if (pathname === "/contact") return;

    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;
