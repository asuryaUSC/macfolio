'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpotifyWidget: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed',
          bottom: '100px', // lifted above dock
          right: '40px',
          width: '300px',
          height: '352px',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
          zIndex: 9999,
          overflow: 'hidden',
          backgroundColor: '#000',
          cursor: 'move',
        }}
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/1g8iPinXpvyXAOdb8kZffN?utm_source=generator&autoplay=1"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ border: 'none' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SpotifyWidget;
