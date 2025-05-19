'use client';

import React from 'react';
import { motion, DragControls } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface FinderHeaderProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  dragControls: DragControls;
  onBack?: () => void;
  onForward?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

const FinderHeader: React.FC<FinderHeaderProps> = ({
  title,
  subtitle,
  onClose,
  dragControls,
  onBack,
  onForward,
  canGoBack = false,
  canGoForward = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        backgroundColor: '#FDFDFD',
        borderBottom: '1px solid #DCDCDC',
        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
        cursor: 'move',
      }}
      onPointerDown={(e) => dragControls.start(e)}
    >
      {/* Left: Traffic Lights */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { color: '#FF6156', label: 'Close' },
          { color: '#FFC030', label: 'Minimize' },
          { color: '#29CB42', label: 'Maximize' },
        ].map((button, index) => (
          <motion.button
            key={index}
            whileHover={{ filter: 'brightness(85%)' }}
            onClick={onClose}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: button.color,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={button.label}
          />
        ))}
      </div>

      {/* Center: Title & Subtitle */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#4B4B4B',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 400,
            color: '#8F8F8F',
            lineHeight: 1.2,
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Right: Navigation Arrows */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {onBack && (
          <MdOutlineKeyboardArrowLeft
            size={22}
            onClick={canGoBack ? onBack : undefined}
            style={{
              cursor: canGoBack ? 'pointer' : 'default',
              opacity: canGoBack ? 1 : 0.3,
            }}
          />
        )}
        {onForward && (
          <MdOutlineKeyboardArrowRight
            size={22}
            onClick={canGoForward ? onForward : undefined}
            style={{
              cursor: canGoForward ? 'pointer' : 'default',
              opacity: canGoForward ? 1 : 0.3,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FinderHeader;
