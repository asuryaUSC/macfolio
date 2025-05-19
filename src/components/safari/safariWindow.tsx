'use client';

import React, { useRef, useState } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import {
  MdArrowBack,
  MdArrowForward,
  MdRefresh,
  MdShare,
  MdAdd,
} from 'react-icons/md';

interface SafariWindowProps {
  onClose: () => void;
}

const SafariWindow: React.FC<SafariWindowProps> = ({ onClose }) => {
  const dragControls = useDragControls();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    if (!iframeRef.current) return;
    setLoading(true);
    iframeRef.current.src = iframeRef.current.src;
  };

  const onIFrameLoad = () => setLoading(false);

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          top: '10%',
          left: '28%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 700,
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
        }}
      >
        {/* Toolbar */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f9f9f9',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Traffic lights + title */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <motion.div
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#ff5f57',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#febc2e',
                  borderRadius: '50%',
                }}
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#28c840',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 14,
                fontWeight: 500,
                color: '#333',
                pointerEvents: 'none',
              }}
            >
              Safari
            </div>
          </div>

          {/* Address Bar + Buttons */}
          <div
            style={{
              marginTop: 12,
              backgroundColor: '#f2f2f2',
              padding: '4px 12px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 8, color: '#555' }}>
              <motion.div whileHover={{ scale: 1.2 }} style={{ cursor: 'pointer' }}>
                <MdArrowBack size={18} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} style={{ cursor: 'pointer' }}>
                <MdArrowForward size={18} />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onClick={handleRefresh}
                style={{ cursor: 'pointer' }}
              >
                <MdRefresh size={18} />
              </motion.div>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: '#fff',
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid #ddd',
                fontSize: 13,
                color: '#555',
              }}
            >
              <span style={{ fontSize: 12 }}>🔒</span>
              <span>https://aaditya-old-portfolio.vercel.app</span>
            </div>

            <div style={{ display: 'flex', gap: 8, color: '#555' }}>
              <motion.div whileHover={{ scale: 1.2 }} style={{ cursor: 'pointer' }}>
                <MdShare size={18} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} style={{ cursor: 'pointer' }}>
                <MdAdd size={18} />
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ height: 2, backgroundColor: '#ddd', marginTop: 4 }}>
            <motion.div
              key={loading ? 'loading' : 'done'}
              initial={{ width: loading ? 0 : '100%' }}
              animate={{ width: loading ? '100%' : '0%' }}
              transition={{ duration: loading ? 1.5 : 0.5, ease: 'easeInOut' }}
              style={{ height: '100%', backgroundColor: '#3aa8fc' }}
            />
          </div>
        </div>

        {/* Iframe Container */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f2f2f2',
            padding: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <iframe
            ref={iframeRef}
            src="https://new-portfolio-project-asuryauscs-projects.vercel.app/"
            onLoad={onIFrameLoad}
            style={{
              width: '100%',
              maxWidth: 840,
              border: 'none',
              borderRadius: 6,
              background: '#fff',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SafariWindow;
