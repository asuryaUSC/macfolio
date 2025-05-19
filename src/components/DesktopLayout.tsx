'use client';

import React, { useState, CSSProperties } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DesktopProvider } from '@/context/DesktopContext';
import Navbar from './Navbar';
import Dock from './Dock';
import Desktop from './Desktop';
import FinderWindow from './FinderWindow';
import SpotifyWidget from './SpotifyWidget';
import DocumentPopup from './DocumentPopup';
import ImagePopup from './ImagePopup';
import PhotoApp from './PhotoApp';
import ContactCard from './ContactCard';
import MessagesApp from './messages/MessagesApp';
import SafariWindow from './safari/safariWindow';
import MailApp from './mailApp'; 
import TerminalApp from './terminal/TerminalApp';
import TrashApp from './TrashApp';

const DesktopLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showFinder, setShowFinder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<
    'projects' | 'certifications' | 'publications' | null
  >(null);

  const [showSpotify, setShowSpotify] = useState(false);
  const [showPhotoApp, setShowPhotoApp] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showSafari, setShowSafari] = useState(false);
  const [showMailApp, setShowMailApp] = useState(false); 
  const [showTerminalApp, setShowTerminalApp] = useState(false);
  const [showTrashApp, setShowTrashApp] = useState(false);
  const [aboutImages, setAboutImages] = useState<boolean[]>([]);
  const [showAboutDoc, setShowAboutDoc] = useState(false);

  const gridBackground = `
    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
  `;

  const styles: Record<string, CSSProperties> = {
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      backgroundImage: gridBackground,
      backgroundSize: '20px 20px',
    },
    navbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 40,
      zIndex: 1000,
    },
    desktop: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      bottom: 60,
      zIndex: 1,
    },
    dock: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      zIndex: 1000,
    },
  };

  const openFinder = (folder: 'projects' | 'certifications' | 'publications') => {
    setSelectedFolder(folder);
    setShowFinder(true);
  };

  const openAbout = () => {
    setAboutImages([true, true, true]);
    setShowAboutDoc(true);
  };

  const closeAllAbout = () => {
    setAboutImages([]);
    setShowAboutDoc(false);
  };

  const imageOffsets = [
    { top: '20%', left: '10%' },
    { top: '30%', left: '65%' },
    { top: '60%', left: '15%' },
  ];

  return (
    <DesktopProvider>
      <div style={styles.container}>
        <div style={styles.navbar}>
          <Navbar />
        </div>

        <div style={styles.desktop}>
          <Desktop 
            onOpenFinder={openFinder} 
            onOpenAbout={openAbout} 
            onOpenTrash={() => setShowTrashApp(true)} // ✅ add this
          />

          {showFinder && selectedFolder && (
            <FinderWindow
              key={`finder-${selectedFolder}-${Date.now()}`}
              initialFolder={selectedFolder}
              onClose={() => {
                setShowFinder(false);
                setSelectedFolder(null);
              }}
            />
          )}

          {showSpotify && <SpotifyWidget />}
          {showPhotoApp && <PhotoApp onClose={() => setShowPhotoApp(false)} />}
          {showContact && <ContactCard onClose={() => setShowContact(false)} />}
          {showMessages && <MessagesApp onClose={() => setShowMessages(false)} />}
          {showSafari && <SafariWindow onClose={() => setShowSafari(false)} />}
          {showMailApp && <MailApp onClose={() => setShowMailApp(false)} />} 
          {showTerminalApp && <TerminalApp onClose={() => setShowTerminalApp(false)} />}
          {showTrashApp && <TrashApp onClose={() => setShowTrashApp(false)} />}

          {children}

          <AnimatePresence>
            {aboutImages.map((show, i) =>
              show ? (
                <ImagePopup
                  key={`about-img-${i}`}
                  src={`/about${i + 1}.png`}
                  title={`about${i + 1}`}
                  initialPosition={imageOffsets[i]}
                  onClose={closeAllAbout}
                />
              ) : null
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showAboutDoc && (
              <DocumentPopup
                title="aboutme.txt"
                description={`Hey there! I’m Aaditya Surya, a senior at the University of Southern California studying Computer Science and Business. \n\nI’ve called seven countries home, from India to Malawi, and each one has shaped how I think, build, and lead. Whether it was creating a breast cancer detection model in Kathmandu, launching a marketing agency in LA, or learning Python to build games in my teens, I’ve always chased one thing: curiosity. \n\nAt USC, you’ll find me switching between code reviews and campus sunsets, sometimes in the same hour. I believe in building tech that travels, connects, and leaves the world a little better than it found it. 🚀🌍`}
                link=""
                onClose={closeAllAbout}
              />
            )}
          </AnimatePresence>
        </div>

        <div style={styles.dock}>
          <Dock
            onFinderClick={() => openFinder('projects')}
            onSpotifyClick={() => setShowSpotify(prev => !prev)}
            onPhotoClick={() => setShowPhotoApp(true)}
            onContactClick={() => setShowContact(true)}
            onMessagesClick={() => setShowMessages(true)}
            onSafariClick={() => setShowSafari(true)}
            onMailClick={() => setShowMailApp(true)} 
            onTerminalClick={() => setShowTerminalApp(true)}
            onTrashClick={() => setShowTrashApp(true)} // ✅ add this
          />
        </div>
      </div>
    </DesktopProvider>
  );
};

export default DesktopLayout;
