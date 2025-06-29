import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/shared/scroll_to_top';
import { motion, useScroll } from 'framer-motion';
import MainLayout from './layout/main_layout';
import NotFound from './components/shared/not_found';
import AdminPage from './pages/admin';
import PrivacyPolicy from './pages/info_pages/privacy';
import TermsOfService from './pages/info_pages/terms-of-service';
import Contact from './pages/info_pages/contact';
import About from './pages/info_pages/about';
import ProductDetail from './pages/product/product[id]';
import Checkout from './pages/checkout/checkout';
const Home = lazy(() => import('./pages/home'));

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-white h-full w-full text-base font-roboto">
      <div>
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 "
        />

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="product/:name" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />

            {/* info pages  */}
            <Route path="about" element={<About />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}

export default App;
