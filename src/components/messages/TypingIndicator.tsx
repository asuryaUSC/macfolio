'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      style={{
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5ea',
        padding: '6px 12px',
        borderRadius: 18,
        display: 'flex',
        gap: 4,
        marginBottom: 12,
      }}
    >
      {[0,1,2].map(i => (
        <motion.div
          key={i}
          animate={{ y: ['0%','-50%','0%'] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          style={{
            width: 6, height: 6,
            backgroundColor: '#666',
            borderRadius: '50%',
          }}
        />
      ))}
    </motion.div>
  );
}
