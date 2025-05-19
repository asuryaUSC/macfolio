'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  onOpenFinder: (folder: 'projects' | 'certifications' | 'publications') => void;
  onOpenAbout: () => void;
  onOpenTrash: () => void;
}

interface IconData {
  key: string;
  icon: string;
  label: string;
  onClick?: () => void;
  href?: string;
}

const IntroText = dynamic(() => import('./IntroText'), { ssr: false });
const StickyNote = dynamic(() => import('./StickyNote'), { ssr: false });

const ICON_SIZE = 80; // approx height + buffer

const Desktop: React.FC<DesktopProps> = ({ onOpenFinder, onOpenAbout, onOpenTrash }) => {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>([]);

  const icons: IconData[] = [
    { key: 'about', icon: 'folder.png', label: 'About Me', onClick: onOpenAbout },
    { key: 'resume', icon: 'pdf.png', label: 'Resume.pdf', href: '/resume.pdf' },
    { key: 'projects', icon: 'folder.png', label: 'Projects', onClick: () => onOpenFinder('projects') },
    { key: 'publications', icon: 'folder.png', label: 'Publications', onClick: () => onOpenFinder('publications') },
    { key: 'certifications', icon: 'folder.png', label: 'Certifications', onClick: () => onOpenFinder('certifications') },
    { key: 'trash', icon: 'trash.png', label: 'Trash', onClick: onOpenTrash },
  ];

  useEffect(() => {
    const used: { top: number; left: number }[] = [];
    const margin = 20;
    const iconWidth = 80;
    const iconHeight = ICON_SIZE;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight - 100;
  
    // Define zones to avoid (sticky note + center text area)
    const stickyZone = { top: 80, left: 40, width: 240, height: 260 };
    const centerTextZone = {
      top: screenH / 2 - 120,
      left: screenW / 2 - 220,
      width: 440,
      height: 160,
    };
  
    const isInZone = (x: number, y: number, zone: { top: number; left: number; width: number; height: number }) => {
      return (
        x < zone.left + zone.width &&
        x + iconWidth > zone.left &&
        y < zone.top + zone.height &&
        y + iconHeight > zone.top
      );
    };
  
    const newPositions = icons.map(() => {
      let attempts = 0;
      let top = 0;
      let left = 0;
      let safe = false;
  
      while (!safe && attempts < 100) {
        left = Math.floor(Math.random() * (screenW - iconWidth - margin));
        top = Math.floor(Math.random() * (screenH - iconHeight - margin));
  
        const overlapsUsed = used.some(pos =>
          Math.abs(pos.left - left) < iconWidth &&
          Math.abs(pos.top - top) < iconHeight
        );
  
        const overlapsSticky = isInZone(left, top, stickyZone);
        const overlapsText = isInZone(left, top, centerTextZone);
  
        safe = !overlapsUsed && !overlapsSticky && !overlapsText;
        attempts++;
      }
  
      const pos = { top, left };
      used.push(pos);
      return pos;
    });
  
    setPositions(newPositions);
  }, []);  

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <IntroText />
      <StickyNote />

      {icons.map((icon, i) => (
        <DesktopIcon
          key={icon.key}
          icon={icon.icon}
          label={icon.label}
          onOpen={icon.onClick}
          href={icon.href}
          style={{
            position: 'absolute',
            top: positions[i]?.top || 0,
            left: positions[i]?.left || 0,
          }}
        />
      ))}
    </div>
  );
};

export default Desktop;
