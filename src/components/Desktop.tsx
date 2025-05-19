'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  onOpenFinder: (folder: 'projects' | 'certifications' | 'publications') => void;
  onOpenAbout: () => void;
  onOpenTrash: () => void;
}

const IntroText = dynamic(() => import('./IntroText'), { ssr: false });
const StickyNote = dynamic(() => import('./StickyNote'), { ssr: false });

const Desktop: React.FC<DesktopProps> = ({ onOpenFinder, onOpenAbout, onOpenTrash }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <IntroText />
      <StickyNote />

      <DesktopIcon
        icon="folder.png"
        label="About Me"
        onOpen={onOpenAbout}
      />
      <DesktopIcon
        icon="pdf.png"
        label="Resume.pdf"
        href="/resume.pdf"
      />
      <DesktopIcon
        icon="folder.png"
        label="Projects"
        onOpen={() => onOpenFinder('projects')}
      />
      <DesktopIcon
        icon="folder.png"
        label="Publications"
        onOpen={() => onOpenFinder('publications')}
      />
      <DesktopIcon
        icon="folder.png"
        label="Certifications"
        onOpen={() => onOpenFinder('certifications')}
      />
      <DesktopIcon
        icon="trash.png"
        label="Trash"
        onOpen={onOpenTrash}
      />
    </div>
  );
};

export default Desktop;
