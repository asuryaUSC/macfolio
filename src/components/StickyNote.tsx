'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StickyNote: React.FC = () => {
  return (
    <motion.div
      drag
      dragConstraints={false}
      whileHover={{
        scale: 1.03,
        rotate: 0.5,
        boxShadow: '4px 8px 20px rgba(0,0,0,0.25)',
      }}
      whileTap={{
        cursor: 'grabbing',
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        position: 'absolute',
        top: '20px',
        left: '40px',
        backgroundColor: '#FEF39C',
        borderRadius: '12px',
        padding: '16px 20px',
        width: '310px', // wider for readability
        boxShadow: '2px 4px 12px rgba(0,0,0,0.2)',
        fontSize: '14px',
        lineHeight: '1.7',
        color: '#1a1a1a',
        fontFamily: 'SF Compact, -apple-system, BlinkMacSystemFont, sans-serif',
        cursor: 'grab',
        userSelect: 'none',
        zIndex: 10,
      }}
    >
      <b style={{ display: 'block', marginBottom: 4 }}>To Do:</b>
      • Drink water<br />
      • Land my dream PM job<br />
      • <s>Move to the US</s><br />
      • Get good at chess<br />
      • Visit a new place each year<br />
      • <s>Build a new portfolio</s><br />
      • Graduate alive<br />

      <div style={{ margin: '14px 0 4px', fontWeight: 'bold' }}>Tips:</div>
      • Double-click folders to explore my work<br />
      • Use dock apps to learn more about me<br />
      • Terminal has ✨easter eggs✨<br />
    </motion.div>
  );
};

export default StickyNote;
