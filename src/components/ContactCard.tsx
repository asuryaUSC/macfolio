'use client';

import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import Image from 'next/image';

interface ContactCardProps {
  onClose: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ onClose }) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 30 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      style={{
        position: 'fixed',
        top: '35%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        width: 'min(90vw, 400px)',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
        zIndex: 9999,
      }}
    >
      {/* Header */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'move',
          position: 'relative',
        }}
      >
        {/* Traffic Lights */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#febc2e',
              border: 'none',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#28c840',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* Centered Title */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '14px',
            fontWeight: 500,
            color: '#333',
            pointerEvents: 'none',
          }}
        >
          Contact Me
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px' }}>
        {/* Top Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 24,
          }}
        >
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: 4, color: '#000' }}>
              Aaditya Surya
            </h1>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              🎓 USC Senior — CS and Business
            </p>
          </div>
          <Image
            src="/profile.png"
            alt="Profile"
            width={80}
            height={80}
            style={{
              borderRadius: 12,
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}
        >
          {/* Phone */}
          <div>
            <label style={{ fontSize: '12px', color: '#666', marginBottom: 4, display: 'block' }}>
              PHONE
            </label>
            <a
              href="tel:+1 (213) 783-8000"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000',
                textDecoration: 'none',
              }}
            >
              +1 (213) 783 8000
            </a>
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: '12px', color: '#666', marginBottom: 4, display: 'block' }}>
              EMAIL
            </label>
            <a
              href="mailto:asurya@usc.edu"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000',
                textDecoration: 'none',
              }}
            >
              asurya@usc.edu
            </a>
          </div>

          {/* LinkedIn */}
          <div>
            <label style={{ fontSize: '12px', color: '#666', marginBottom: 4, display: 'block' }}>
              LINKEDIN
            </label>
            <a
              href="https://www.linkedin.com/in/aadityasurya"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000',
                textDecoration: 'none',
              }}
            >
              aadityasurya
            </a>
          </div>

          {/* GitHub */}
          <div>
            <label style={{ fontSize: '12px', color: '#666', marginBottom: 4, display: 'block' }}>
              GITHUB
            </label>
            <a
              href="https://github.com/asuryaUSC"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000',
                textDecoration: 'none',
              }}
            >
              asuryaUSC
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
