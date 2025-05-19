'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DesktopIconProps {
  icon: string;
  label: string;
  href?: string;
  onOpen?: () => void;
}

const occupiedSpots: { x: number; y: number }[] = [];

const generateValidPosition = (): { x: number; y: number } => {
  const ICON_WIDTH = 120;
  const ICON_HEIGHT = 100;
  const MAX_ATTEMPTS = 50;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const x = Math.floor(window.innerWidth * 0.55 + Math.random() * (window.innerWidth * 0.4 - ICON_WIDTH));
    const y = Math.floor(100 + Math.random() * (window.innerHeight - 250)); // avoid top bar & dock

    const isOverlapping = occupiedSpots.some(
      (spot) =>
        Math.abs(spot.x - x) < ICON_WIDTH && Math.abs(spot.y - y) < ICON_HEIGHT
    );

    const isInStickyZone = x < 300 && y < 250;
    const isInCenterTextZone = x > window.innerWidth / 2 - 200 && x < window.innerWidth / 2 + 200 && y > window.innerHeight / 2 - 80 && y < window.innerHeight / 2 + 120;

    if (!isOverlapping && !isInStickyZone && !isInCenterTextZone) {
      occupiedSpots.push({ x, y });
      return { x, y };
    }
  }

  return { x: window.innerWidth - 150, y: 150 };
};

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  href,
  onOpen
}) => {
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });

  useEffect(() => {
    setInitialPosition(generateValidPosition());
  }, []);

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
        position: 'fixed',
        top: initialPosition.y,
        left: initialPosition.x,
        zIndex: 10,
        cursor: 'pointer',
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          backgroundColor: 'rgba(0,122,255,0.15)',
          borderRadius: 6,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
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
