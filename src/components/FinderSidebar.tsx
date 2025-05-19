'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FinderSidebarProps {
  sections: {
    title: string;
    items: { id: string; label: string }[];
  }[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const FinderSidebar: React.FC<FinderSidebarProps> = ({
  sections,
  selectedId,
  onSelect,
}) => {
  return (
    <div
      style={{
        width: '180px',
        backgroundColor: '#EBEBEB',
        padding: '16px 12px',
        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {sections.map((section, sectionIndex) => (
        <div key={section.title}>
          {/* Section Header */}
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9A9A9A',
              marginTop: sectionIndex === 0 ? 0 : '12px',
              marginBottom: '4px',
              paddingLeft: '10px',
            }}
          >
            {section.title}
          </div>

          {/* Section Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {section.items.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => onSelect(item.id)}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedId === item.id ? '#D0D0D0' : 'transparent',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <span style={{ fontSize: '14px' }}>📁</span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2D2D2D',
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinderSidebar; 