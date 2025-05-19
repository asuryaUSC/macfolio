'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Space_Grotesk, Playfair_Display, Roboto_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto-mono',
});

const IntroText: React.FC = () => {
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);

  const line1 = "hello, i'm aaditya.";
  const line2 = "this is my macfolio,";
  const line3 = "crafted pixel by pixel.";

  const typeSpeed = 75;
  const delayAfterLine = 500;

  useEffect(() => {
    const totalTime1 = line1.length * typeSpeed + delayAfterLine;
    const totalTime2 = line2.length * typeSpeed + delayAfterLine;

    const timer1 = setTimeout(() => {
      setShowCursor1(false);
      setShowLine2(true);
    }, totalTime1);

    const timer2 = setTimeout(() => {
      setShowCursor2(false);
      setShowLine3(true);
    }, totalTime1 + totalTime2);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${robotoMono.variable}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <motion.div
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '28px',
          fontWeight: 700,
          color: '#000000',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Typewriter
          words={[line1]}
          loop={1}
          cursor={showCursor1}
          cursorStyle="|"
          typeSpeed={typeSpeed}
          delaySpeed={delayAfterLine}
        />
      </motion.div>

      {showLine2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '40px',
            fontStyle: 'italic',
            color: '#000000',
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Typewriter
            words={[line2]}
            loop={1}
            cursor={showCursor2}
            cursorStyle="|"
            typeSpeed={typeSpeed}
            delaySpeed={delayAfterLine}
          />
        </motion.div>
      )}

      {showLine3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontSize: '18px',
            color: '#000000',
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Typewriter
            words={[line3]}
            loop={1}
            cursor={false}
            typeSpeed={typeSpeed}
            delaySpeed={delayAfterLine}
          />
        </motion.div>
      )}
    </div>
  );
};

export default IntroText;
