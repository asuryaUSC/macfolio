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

const DeviceWarning: React.FC = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Blur-only background layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            zIndex: -1,
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            backgroundColor: 'rgba(242,242,242,0.9)',
            borderRadius: 14,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: 420,
            overflow: 'hidden',
            fontFamily: "'SF Pro', 'SF Compact', -apple-system, system-ui, sans-serif",
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              height: 32,
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '0 12px',
            }}
          >
            <div style={{ position: 'absolute', left: 12, display: 'flex', gap: 8 }}>
              <div style={{ width: 12, height: 12, backgroundColor: '#ff5f57', borderRadius: '50%' }} />
              <div style={{ width: 12, height: 12, backgroundColor: '#febc2e', borderRadius: '50%' }} />
              <div style={{ width: 12, height: 12, backgroundColor: '#28c840', borderRadius: '50%' }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Warning</div>
          </div>

          {/* Content */}
          <div style={{ padding: 28, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 16 }}
            >
              <FaLaptop size={36} color="#000" />
            </motion.div>

            <h2
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#000',
                margin: '0 0 8px 0',
              }}
            >
              Mac Only
            </h2>
            <p
              style={{
                fontSize: 15,
                color: '#666',
                margin: '0 0 12px 0',
                lineHeight: 1.4,
              }}
            >
              This site is only optimized for Mac or Desktop devices.
            </p>
            <p
              style={{
                fontSize: 14,
                color: '#333',
                margin: '0 0 24px 0',
                lineHeight: 1.4,
              }}
            >
              Please open on a laptop, or use the old version below.
            </p>

            <motion.a
              href="https://old-portfolio-asuryauscs-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: '#f2f2f7',
                color: '#000',
                padding: '10px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                border: '1px solid #ddd',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e6e6eb')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f2f2f7')}
            >
              Open Old Version <FaArrowRight />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeviceWarning;
