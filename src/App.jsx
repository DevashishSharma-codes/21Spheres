import { Routes, Route, useLocation } from "react-router-dom";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { HowWeWorkPage } from "./components/features/how-we-work/HowWeWorkPage";
import { ContactModal } from "./components/features/contact/ContactModal";
import { ScrollToHash } from "./components/common/ScrollToHash";

/* ---------------------------------------------------------
   Main App Export with Background Modal Location & Lenis Scroll
--------------------------------------------------------- */
export default function App() {
  useLenisScroll();
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  return (
    <>
      <ScrollToHash />
      <Routes location={backgroundLocation || location}>
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <ContactModal />
    </>
  );
}