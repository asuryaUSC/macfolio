'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      setCurrentTime(now.toLocaleString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '28px',
      backgroundColor: '#e5e5e5',
      padding: '0 16px',
      width: '100%',
      boxSizing: 'border-box',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    appleLogo: {
      height: '14px',
      width: 'auto',
    },
    title: {
      fontSize: '13px',
      fontWeight: 'bold',
      color: '#000000',
      margin: 0,
    },
    navLink: {
      fontSize: '13px',
      color: '#000000',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    systemIcons: {
      height: '14px',
      width: 'auto',
    },
    clock: {
      fontSize: '13px',
      color: '#000000',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <Image
          src="/finalKit/apple.png"
          alt="Apple Logo"
          width={14}
          height={14}
          style={styles.appleLogo}
        />
        <span style={styles.title}>Aaditya Surya&apos;s Portfolio</span>
        <a style={styles.navLink}>Contact</a>
        <a style={styles.navLink}>Resume</a>
      </div>
      <div style={styles.rightSection}>
        <Image
          src="/finalKit/navbarRight.png"
          alt="System Icons"
          width={100}
          height={14}
          style={styles.systemIcons}
        />
        <div style={{ fontSize: 14, color: '#666' }}>It&apos;s {currentTime}</div>
      </div>
    </div>
  );
};

export default Navbar; 