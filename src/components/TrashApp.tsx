'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MdVisibility, MdVisibilityOff, MdLightbulb } from 'react-icons/md';
import Image from 'next/image';
import DocumentPopup from './DocumentPopup';
import ImagePopup from './ImagePopup';

interface Riddle {
  riddle: string;
  answer: string;
  hint: string;
}

interface TrashItem {
  name: string;
  icon: string;
  action: 'openLink' | 'imagePopup' | 'documentPopup' | 'none';
  link?: string;
  image?: string;
  title?: string;
  content?: string;
}

const trashItems: TrashItem[] = [
  {
    name: "final_resume_final_final_ACTUAL.pdf",
    icon: "/finalKit/document.png",
    action: "openLink",
    link: "/resume-old.pdf"
  },
  {
    name: "delete_me_please.png",
    icon: "/finalKit/image.png",
    action: "imagePopup",
    image: "/deleteme.png"
  },
  {
    name: "dont_open_this.txt",
    icon: "/finalKit/document.png",
    action: "documentPopup",
    title: "dont_open_this.txt",
    content: "Seriously? You opened it? Now you're cursed with 1000 CSS bugs."
  },
  {
    name: "Untitled Folder 22",
    icon: "/finalKit/folder.png",
    action: "none"
  },
  {
    name: "Old Portfolio",
    icon: "/finalKit/safari.png",
    action: "openLink",
    link: "https://portoflio-apple.vercel.app/"
  }
];

interface TrashAppProps {
  onClose: () => void;
}

const TrashApp: React.FC<TrashAppProps> = ({ onClose }) => {
  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [answer, setAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shake, setShake] = useState(false);
  const [showDocumentPopup, setShowDocumentPopup] = useState<{ title: string; content: string } | null>(null);
  const [showImagePopup, setShowImagePopup] = useState<string | null>(null);
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  // Load riddles and select random one
  useEffect(() => {
    fetch('/trashRiddles.json')
      .then(res => res.json())
      .then((data: Riddle[]) => {
        setCurrentRiddle(data[Math.floor(Math.random() * data.length)]);
      })
      .catch(console.error);
  }, []);

  // Auto-scroll when unlocked
  useEffect(() => {
    if (isUnlocked && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [isUnlocked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRiddle && answer.trim().toLowerCase() === currentRiddle.answer.toLowerCase()) {
      setIsUnlocked(true);
    } else {
      // wrong → shake + red flash
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setAnswer('');
    }
  };

  const handleItemClick = (item: TrashItem) => {
    switch (item.action) {
      case 'openLink':
        if (item.link) {
          window.open(item.link, '_blank');
        }
        break;
      case 'imagePopup':
        if (item.image) {
          setShowImagePopup(item.image);
        }
        break;
      case 'documentPopup':
        if (item.title && item.content) {
          setShowDocumentPopup({ title: item.title, content: item.content });
        }
        break;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={currentRiddle?.riddle} 
        drag
        dragControls={dragControls}
        dragMomentum={false}
        onPointerDown={e => dragControls.start(e)}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          top: '16%',
          left: '27%',
          width: 800,
          height: 600,
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '8px 12px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
        }}>
          <div style={{ position: 'absolute', left: 12, display: 'flex', gap: 8 }}>
            <div
              onClick={onClose}
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#ff5f57',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.8)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
            />
            <div style={{ width: 12, height: 12, backgroundColor: '#febc2e', borderRadius: '50%' }} />
            <div style={{ width: 12, height: 12, backgroundColor: '#28c840', borderRadius: '50%' }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Trash</div>
        </div>

        {/* Body */}
        <div ref={containerRef} style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>
          {!isUnlocked ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={shake
                ? { x: [-10, 10, -10, 10, 0] }
                : { opacity: 1 }
              }
              transition={shake
                ? { duration: 0.6 }
                : { delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }
              }
              style={{
                position: 'absolute',
                top: 0, bottom: 0, left: 0, right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, color: '#333', maxWidth: 600 }}>
                {currentRiddle?.riddle}
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: 24, width: '100%', maxWidth: 400 }}>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      borderRadius: 8,
                      border: shake ? '1px solid #ff3b30' : '1px solid #ddd',
                      backgroundColor: '#f2f2f7',
                      fontSize: 14,
                      color: '#000',
                      outline: 'none',
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666',
                    }}
                  >
                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#007aff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    Submit
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowHint(!showHint)}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#f2f2f7',
                      color: '#666',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <MdLightbulb size={18} />
                    Hint
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        marginTop: 12,
                        padding: '12px 20px',
                        backgroundColor: '#f2f2f7',
                        borderRadius: 8,
                        color: '#666',
                        fontSize: 14,
                      }}
                    >
                      {currentRiddle?.hint}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                padding: 20,
              }}
            >
              {trashItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.03)' }}
                  onClick={() => handleItemClick(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: 12,
                    borderRadius: 8,
                    cursor: item.action === 'none' ? 'default' : 'pointer',
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={48}
                    height={48}
                    style={{ objectFit: 'contain' }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      color: '#333',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {item.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Popups */}
        <AnimatePresence>
          {showDocumentPopup && (
            <DocumentPopup
              title={showDocumentPopup.title}
              description={showDocumentPopup.content}
              link=""
              onClose={() => setShowDocumentPopup(null)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showImagePopup && (
            <ImagePopup
              src={showImagePopup}
              title="Trash Image"
              onClose={() => setShowImagePopup(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default TrashApp;
