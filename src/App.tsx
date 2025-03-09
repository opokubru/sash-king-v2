import { lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/shared/scroll_to_top";
import { motion, useScroll } from "framer-motion";
import MainLayout from "./layout/main_layout";
import NotFound from "./components/shared/not_found";
const Home = lazy(() => import("./pages/home"));

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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}

export default App;
