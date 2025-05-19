'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DockItem {
  type: 'icon' | 'divider';
  src?: string;
  alt?: string;
}

interface DockProps {
  onFinderClick: () => void;
  onSpotifyClick: () => void;
  onPhotoClick: () => void;
  onContactClick: () => void;
  onMessagesClick: () => void;
  onSafariClick: () => void;
  onMailClick: () => void;
  onTerminalClick: () => void;
  onTrashClick: () => void; // ✅ Include trash click handler
}

const dockItems: DockItem[] = [
  { type: 'icon', src: 'finder.png', alt: 'Finder' },
  { type: 'icon', src: 'safari.png', alt: 'Safari' },
  { type: 'icon', src: 'messages.png', alt: 'Messages' },
  { type: 'icon', src: 'mail.png', alt: 'Mail' },
  { type: 'icon', src: 'photos.png', alt: 'Photos' },
  { type: 'icon', src: 'terminal.png', alt: 'Terminal' },
  { type: 'icon', src: 'contacts.png', alt: 'Contacts' },
  { type: 'icon', src: 'linkedin.png', alt: 'LinkedIn' },
  { type: 'icon', src: 'github.png', alt: 'GitHub' },
  { type: 'icon', src: 'scholar.png', alt: 'Scholar' },
  { type: 'divider' },
  { type: 'icon', src: 'spotify.png', alt: 'Spotify' },
  { type: 'divider' },
  { type: 'icon', src: 'folder.png', alt: 'Folder' },
  { type: 'icon', src: 'trash.png', alt: 'Trash' },
];

const Dock: React.FC<DockProps> = ({
  onFinderClick,
  onSpotifyClick,
  onPhotoClick,
  onContactClick,
  onMessagesClick,
  onSafariClick,
  onMailClick,
  onTerminalClick,
  onTrashClick, // ✅ Include in props
}) => {
  const handleClick = (alt?: string) => {
    switch (alt) {
      case 'Finder':
        onFinderClick();
        break;
      case 'Safari':
        onSafariClick();
        break;
      case 'Messages':
        onMessagesClick();
        break;
      case 'Mail':
        onMailClick();
        break;
      case 'Photos':
        onPhotoClick();
        break;
      case 'Contacts':
        onContactClick();
        break;
      case 'Spotify':
        onSpotifyClick();
        break;
      case 'Terminal':
        onTerminalClick();
        break;
      case 'Trash':
        onTrashClick(); // ✅ Trigger TrashApp open
        break;
      case 'LinkedIn':
        window.open('https://www.linkedin.com/in/aadityasurya', '_blank');
        break;
      case 'GitHub':
        window.open('https://github.com/asuryaUSC/', '_blank');
        break;
      case 'Scholar':
        window.open(
          'https://scholar.google.com/citations?user=o7O9KIQAAAAJ&hl=en&oi=sra',
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#9D9D9D',
        borderRadius: 18,
        padding: '6px 12px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        position: 'absolute',
        bottom: 25,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {dockItems.map((item, idx) =>
        item.type === 'divider' ? (
          <div
            key={`divider-${idx}`}
            style={{
              width: 1,
              height: 36,
              backgroundColor: 'rgba(0,0,0,0.3)',
              margin: '0 10px',
            }}
          />
        ) : (
          <motion.img
            key={item.alt}
            src={`/finalKit/${item.src}`}
            alt={item.alt}
            onClick={() => handleClick(item.alt)}
            style={{
              width: 44,
              height: 44,
              objectFit: 'contain',
              margin: '0 4px',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.4, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        )
      )}
    </div>
  );
};

export default Dock;
