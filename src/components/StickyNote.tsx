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
        boxShadow: '4px 8px 20px rgba(0,0,0,0.25)'
      }}
      whileTap={{
        cursor: 'grabbing',
        scale: 0.98
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{
        position: 'absolute',
        top: '60px',
        left: '40px',
        backgroundColor: '#FEF39C',
        borderRadius: '10px',
        padding: '14px 18px',
        width: '240px',
        boxShadow: '2px 4px 12px rgba(0,0,0,0.2)',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#1a1a1a',
        fontFamily: 'SF Compact, -apple-system, BlinkMacSystemFont, sans-serif',
        cursor: 'grab',
        userSelect: 'none',
        zIndex: 10,
      }}
    >
      <b>To Do:</b><br />
      • Drink Water<br />
      • Land my dream PM job<br />
      • <s>Move to the US</s><br />
      • Get good at chess<br />
      • Travel to a new place every year<br />
      • <s>Build a new portfolio website</s><br />
      • Graduate college without dying<br />
      • Did you like the macfolio joke like portfolio but mac?<br />
    </motion.div>
  );
};

export default StickyNote; 