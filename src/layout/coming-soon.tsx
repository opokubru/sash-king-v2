/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Card, CardBody } from '@nextui-org/react';
import Countdown from 'react-countdown';
import Waitlist from './waitlist';
import { LogoComponent } from '@/components/logo-componanent';

// Custom renderer for countdown
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return <span className="text-green-400 font-semibold">🎉 We’re live!</span>;
  } else {
    return (
      <div className="flex gap-4 justify-center text-xl md:text-2xl font-semibold text-white">
        <div>
          <span className="block text-3xl">{days}</span>
          <span className="text-sm text-gray-400">Days</span>
        </div>
        <div>
          <span className="block text-3xl">{hours}</span>
          <span className="text-sm text-gray-400">Hours</span>
        </div>
        <div>
          <span className="block text-3xl">{minutes}</span>
          <span className="text-sm text-gray-400">Mins</span>
        </div>
        <div>
          <span className="block text-3xl">{seconds}</span>
          <span className="text-sm text-gray-400">Secs</span>
        </div>
      </div>
    );
  }
};

export default function ComingSoon() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
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
            {/* Title */}
            <motion.h1
              className="text-2xl md:text-6xl font-bold text-center text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              🚀 Our Store Launches September 21
            </motion.h1>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Countdown
                date={new Date('2025-09-21T00:00:00')}
                renderer={renderer}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-center text-gray-300 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              We’re counting down to liftoff! Be among the first to shop
              exclusive deals, fresh collections, and launch-day offers.
            </motion.p>

            {/* Waitlist Component */}
            <Waitlist />
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
