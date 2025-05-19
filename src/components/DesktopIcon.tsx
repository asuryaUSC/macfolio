'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DesktopIconProps {
  icon: string;
  label: string;
  href?: string;
  onOpen?: () => void;
  style?: React.CSSProperties;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  href,
  onOpen,
  style
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (onOpen) {
      onOpen();
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDoubleClick={handleClick}
      style={{
        position: 'absolute',
        top: 100,
        left: 100,
        zIndex: 10,
        cursor: 'pointer',
        ...style, // override top/left with passed-in style
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          backgroundColor: 'rgba(0,122,255,0.15)',
          borderRadius: 6,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '120px',
          userSelect: 'none',
          padding: '4px',
        }}
      >
        <Image
          src={`/finalKit/${icon}`}
          alt={label}
          width={64}
          height={64}
          style={{
            marginBottom: '4px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'visible',
            textOverflow: 'unset',
            width: '120px',
            fontFamily: 'SF Compact, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '13px',
            color: '#000000',
            backgroundColor: 'transparent',
          }}
        >
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DesktopIcon;
