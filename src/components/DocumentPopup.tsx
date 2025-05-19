'use client';

import React from 'react';
import { motion, useDragControls } from 'framer-motion';

interface DocumentPopupProps {
  title: string;
  description: string;
  link: string;
  onClose: () => void;
}

const DocumentPopup: React.FC<DocumentPopupProps> = ({
  title,
  description,
  link,
  onClose,
}) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      style={{
        position: 'fixed',
        top: '30%',
        left: '35%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
        zIndex: 9999,
      }}
    >
      {/* Window Header */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        style={{
          padding: '12px 16px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          cursor: 'move',
        }}
      >
        {/* Traffic Light Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginRight: '12px' }}>
          <button
            onClick={onClose}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#febc2e',
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#28c840',
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
        </div>
        {/* Window Title */}
        <div
          style={{
            fontSize: '14px',
            color: '#333',
            fontWeight: 500,
            flex: 1,
            textAlign: 'center',
            marginRight: '40px',
          }}
        >
          {title}
        </div>
      </div>

      {/* Window Content */}
      <div style={{ padding: '24px' }}>
        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#333',
            marginBottom: link ? '16px' : '0',
            whiteSpace: 'pre-line',
          }}
        >
          {description}
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#0066cc',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-block',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#004499')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0066cc')}
          >
            {link}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default DocumentPopup;
