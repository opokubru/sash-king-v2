import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody } from '@nextui-org/react';
import { LogoComponent } from '@/components/logo-componanent';

interface CountdownOverlayProps {
  onComplete: () => void;
}

const CountdownOverlay = ({ onComplete }: CountdownOverlayProps) => {
  const [countdown, setCountdown] = useState(20);
  const [showLiveMessage, setShowLiveMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowLiveMessage(true);
          // Show live message for 2 seconds before completing
          setTimeout(() => {
            onComplete();
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col gap-4 items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white"
      >
        <div className="flex items-center justify-center w-full mx-auto text-center snap-center self-center content-center place-content-center ml-[25vw] md:ml-0">
          <LogoComponent />
        </div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="p-8 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
            <CardBody className="flex flex-col items-center gap-6">
              {!showLiveMessage ? (
                <>
                  {/* Title */}
                  <motion.h1
                    className="text-2xl md:text-6xl font-bold text-center text-white"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    🚀 Welcome to Sneakz
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    className="text-lg md:text-xl text-center text-gray-300 max-w-md leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    Sneakz official launches in...
                  </motion.p>

                  {/* Countdown Timer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex gap-4 justify-center text-xl md:text-2xl font-semibold text-white"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 relative">
                        {/* Circular progress background */}
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#3b82f6"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{
                              strokeDasharray: '283',
                              strokeDashoffset: '283',
                            }}
                            animate={{
                              strokeDashoffset: `${
                                283 - (283 * (20 - countdown)) / 20
                              }`,
                            }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                          />
                        </svg>

                        {/* Countdown number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            key={countdown}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl md:text-4xl font-bold text-white"
                          >
                            {countdown}
                          </motion.span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 text-center block">
                        Seconds
                      </span>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Live Message */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center"
                  >
                    <motion.h1
                      className="text-3xl md:text-7xl font-bold text-center text-white mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      🚀 Sneakz Official is Live! 🚀
                    </motion.h1>

                    {/* <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="text-6xl md:text-8xl"
                      >
                        🎉
                      </motion.div>
                    </motion.div> */}
                  </motion.div>
                </>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountdownOverlay;
