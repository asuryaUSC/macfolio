'use client';

import React, { useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { Photo } from './types';
import PhotoHeader from './PhotoHeader';
import CoverFlow from './CoverFlow';

interface PhotoAppProps {
  onClose: () => void;
}

const PhotoApp: React.FC<PhotoAppProps> = ({ onClose }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const dragControls = useDragControls();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/photos.json');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Failed to load photos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(photos.length - 1, prev + 1));
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.1, 0.5));
  };

  if (isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        style={{
          position: 'fixed',
          top: '15%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
          zIndex: 9999,
        }}
      >
        <PhotoHeader
          onClose={onClose}
          dragControls={dragControls}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onShare={() => {}}
        />

        <div style={{ padding: '32px' }}>
          <CoverFlow
            photos={photos}
            currentIndex={currentIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={handleSelect}
            zoom={zoom}
          />

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              style={{
                textAlign: 'center',
                marginTop: '32px',
                fontSize: '14px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
                padding: '0 24px',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {photos[currentIndex]?.caption}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoApp;
