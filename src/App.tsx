import { lazy, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/shared/scroll_to_top';
import CountdownOverlay from './components/shared/countdown-overlay';
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
import AllCategoriesPage from './pages/product/categories';
import AdminSignInPage from './pages/admin/auth/signin';
import SelectedCategoryPage from './pages/product/categories[id]';
import TopDealsPage from './pages/product/top-deals-page';
import NewArrivalsPage from './pages/product/new-arrival-page';
import TopSellingPage from './pages/product/top-selling-page';
import SearchPage from './pages/product/search-page';
import OrderViewPage from './pages/admin/orders[id]';
// import ComingSoon from './layout/coming-soon';
const Home = lazy(() => import('./pages/home'));

function App() {
  const { scrollYProgress } = useScroll();
  const [showCountdown, setShowCountdown] = useState(true);

  const handleCountdownComplete = () => {
    setShowCountdown(false);
  };

  return (
    <main className="bg-white h-full w-full text-base font-roboto">
      {showCountdown && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      <div>
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 "
        />

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* <Route path="" element={<ComingSoon />} /> */}
            <Route path="" element={<Home />} />
            <Route path="signin" element={<AdminSignInPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/orders/:id" element={<OrderViewPage />} />
            <Route path="product/:name" element={<ProductDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/products/deals" element={<TopDealsPage />} />
            <Route path="/products/top-ranking" element={<TopSellingPage />} />
            <Route path="/products/new" element={<NewArrivalsPage />} />

            <Route path="categories/:name" element={<SelectedCategoryPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="categories" element={<AllCategoriesPage />} />

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
