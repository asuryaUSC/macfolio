'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import NextImage from 'next/image';            // renamed import
import { CoverFlowProps } from './types';

const CoverFlow: React.FC<CoverFlowProps> = ({
  photos,
  currentIndex,
  onPrev,
  onNext,
  onSelect,
  zoom = 1,
}) => {
  const [loaded, setLoaded] = useState<Set<string>>(new Set());

  useEffect(() => {
    photos.forEach((p) => {
      const img = new globalThis.Image();      // use native constructor
      img.src = p.src;
      img.onload = () => setLoaded((s) => new Set(s).add(p.src));
    });
  }, [photos]);

  const visible = photos
    .map((p, i) => ({ photo: p, idx: i }))
    .filter(({ idx }) => Math.abs(idx - currentIndex) <= 2);

  return (
    <div
      style={{
        perspective: 1200,
        height: 400,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        <AnimatePresence initial={false}>
          {visible.map(({ photo, idx }) => {
            const offset = idx - currentIndex;
            const isCenter = offset === 0;

            const baseStyle = {
              rotateY: offset * 25,
              x: offset * 150,
              z: isCenter ? 0 : -Math.abs(offset) * 100,
              scale: isCenter ? zoom : 0.8,
              opacity: isCenter ? 1 : 0.3,
              filter: isCenter ? 'none' : 'brightness(0.5) blur(2px)',
            };

            return (
              <motion.div
                key={photo.src}
                initial={{ ...baseStyle, opacity: 0 }}
                animate={baseStyle}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  mass: 1,
                }}
                style={{
                  position: 'absolute',
                  width: 300,
                  height: 300,
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
                onClick={() => onSelect(idx)}
                whileHover={
                  isCenter
                    ? {
                        scale: zoom + 0.02,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                      }
                    : {}
                }
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  {loaded.has(photo.src) ? (
                    <NextImage
                      src={photo.src}
                      alt={photo.caption}
                      width={300}
                      height={300}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                      }}
                    >
                      Loading…
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ← */}
      <motion.button
        onClick={onPrev}
        disabled={currentIndex === 0}
        style={{
          position: 'absolute',
          left: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#666',
          padding: 16,
          opacity: currentIndex === 0 ? 0.3 : 1,
        }}
        whileHover={{ scale: 1.1, color: '#000' }}
        whileTap={{ scale: 0.9 }}
      >
        <MdOutlineKeyboardArrowLeft size={32} />
      </motion.button>

      {/* → */}
      <motion.button
        onClick={onNext}
        disabled={currentIndex === photos.length - 1}
        style={{
          position: 'absolute',
          right: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#666',
          padding: 16,
          opacity: currentIndex === photos.length - 1 ? 0.3 : 1,
        }}
        whileHover={{ scale: 1.1, color: '#000' }}
        whileTap={{ scale: 0.9 }}
      >
        <MdOutlineKeyboardArrowRight size={32} />
      </motion.button>
    </div>
  );
};

export default CoverFlow;
