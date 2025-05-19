'use client';

import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { FiZoomIn, FiZoomOut, FiShare2 } from 'react-icons/fi';
import Image from 'next/image';

interface ImagePopupProps {
  src: string;
  title: string;
  alt?: string;
  onClose: () => void;
  initialPosition?: { top: string; left: string };
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  src,
  title,
  alt = '',
  onClose,
  initialPosition,
}) => {
  const dragControls = useDragControls();
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 0.5));

  const circleStyle: React.CSSProperties = {
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'filter 0.2s',
  };

  const top = initialPosition?.top ?? '50%';
  const left = initialPosition?.left ?? '50%';

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
        top,
        left,
        transform: 'translate(-50%, -50%)',
        width: '400px',
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
        zIndex: 9999,
      }}
    >
      {/* Header */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          cursor: 'move',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onClose}
            style={{ ...circleStyle, backgroundColor: '#ff5f57' }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <button
            onClick={() => {}}
            style={{ ...circleStyle, backgroundColor: '#febc2e' }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <button
            onClick={() => {}}
            style={{ ...circleStyle, backgroundColor: '#28c840' }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            color: '#333',
            userSelect: 'none',
          }}
        >
          {title}.HEIC
        </div>

        {/* Zoom & Share */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <FiZoomOut
            size={18}
            color="#909193"
            style={{ cursor: 'pointer', transition: 'filter 0.2s' }}
            onClick={handleZoomOut}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <FiZoomIn
            size={18}
            color="#909193"
            style={{ cursor: 'pointer', transition: 'filter 0.2s' }}
            onClick={handleZoomIn}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <FiShare2
            size={18}
            color="#909193"
            style={{ cursor: 'pointer', transition: 'filter 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
        </div>
      </div>

      {/* Image */}
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s',
          }}
        />
      </div>
    </motion.div>
  );
};

export default ImagePopup;
