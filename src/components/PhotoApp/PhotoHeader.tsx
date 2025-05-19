'use client';

import React from 'react';
import { DragControls } from 'framer-motion';
import { MdZoomIn, MdZoomOut, MdShare } from 'react-icons/md';

interface PhotoHeaderProps {
  onClose: () => void;
  dragControls: DragControls;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onShare?: () => void;
}

const PhotoHeader: React.FC<PhotoHeaderProps> = ({
  onClose,
  dragControls,
  onZoomIn,
  onZoomOut,
  onShare,
}) => {
  return (
    <div
      onPointerDown={(e) => dragControls.start(e)}
      style={{
        padding: '12px 16px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        cursor: 'move',
        position: 'relative',
      }}
    >
      {/* Traffic Light Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginRight: '12px', zIndex: 1 }}>
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

      {/* Window Title - Centered */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '14px',
          color: '#333',
          fontWeight: 500,
          pointerEvents: 'none',
        }}
      >
        lifedump.photos
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto', zIndex: 1 }}>
        <button
          onClick={onZoomOut}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <MdZoomOut size={20} />
        </button>
        <button
          onClick={onZoomIn}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <MdZoomIn size={20} />
        </button>
        <button
          onClick={onShare}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <MdShare size={20} />
        </button>
      </div>
    </div>
  );
};

export default PhotoHeader; 