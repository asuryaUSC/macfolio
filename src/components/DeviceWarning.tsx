'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptop, FaArrowRight } from 'react-icons/fa';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDevices = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
    setIsMobile(mobileDevices.test(userAgent));
  }, []);

  return isMobile;
};

const DeviceWarning: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          key="mobile-warning"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 30%, #fffdfb, #f3f3f3)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
            overflow: 'hidden',
            padding: '0 20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 28,
              padding: '32px 24px',
              maxWidth: 420,
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(200,200,200,0.3)',
            }}
          >
            <motion.div
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                backgroundColor: '#f2f2f5',
                borderRadius: 16,
                padding: 16,
                display: 'inline-flex',
                marginBottom: 20,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
              }}
            >
              <FaLaptop size={28} color="#111" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#111',
                marginBottom: 12,
              }}
            >
              Best Viewed on a Desktop
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 15,
                color: '#444',
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              This portfolio is intentionally designed to replicate a macOS desktop experience.
              For the full vibe, explore it on a larger screen.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 24,
              }}
            >
              Prefer something lighter? Check out the classic version built for all devices.
            </motion.p>

            <motion.a
              href="https://old-portfolio-asuryauscs-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: '#fff',
                color: '#000',
                padding: '10px 20px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                border: '1px solid #d0d0d0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              Open Classic Version <FaArrowRight />
            </motion.a>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
};

export default DeviceWarning;
