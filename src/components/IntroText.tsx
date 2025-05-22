'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// parent orchestrates a stagger on hover
const containerVariants = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

// each letter "pops" when hovered
const letterVariants = {
  rest: { scale: 1, fontWeight: 400, textShadow: 'none' },
  hover: {
    scale: 1.3,
    fontWeight: 800,
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: { duration: 0.15 },
  },
};

interface AnimatedLineProps {
  text: string;
  font: string;
  size: string;
  italic?: boolean;
  showCursor?: boolean;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  text,
  font,
  size,
  italic = false,
  showCursor = false,
}) => (
  <motion.div
    variants={containerVariants}
    initial="rest"
    whileHover="hover"
    style={{
      fontFamily: font,
      fontSize: size,
      color: '#000',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      fontStyle: italic ? 'italic' : 'normal',
      cursor: 'default',
      whiteSpace: 'pre',
    }}
  >
    {Array.from(text).map((char, i) => (
      <motion.span
        key={i}
        variants={letterVariants}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ))}
    {showCursor && (
      <motion.span
        style={{
          display: 'inline-block',
          marginLeft: '2px',
          fontWeight: 400, // keep cursor normal weight
        }}
      >
        |
      </motion.span>
    )}
  </motion.div>
);

export default function IntroText() {
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [t3, setT3] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const blinkRef = useRef<NodeJS.Timeout | null>(null);

  const L1 = "hello, i'm aaditya.";
  const L2 = 'this is my macfolio,';
  const L3 = 'crafted pixel by pixel.';

  // blink cursor every 500ms, store interval so we can clear it later
  useEffect(() => {
    blinkRef.current = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(blinkRef.current!);
  }, []);

  // type all three lines in sequence
  useEffect(() => {
    (async () => {
      const speed = 100; // slowed typing
      for (let i = 0; i < L1.length; i++) {
        setT1(L1.slice(0, i + 1));
        await sleep(speed);
      }
      await sleep(300);
      for (let i = 0; i < L2.length; i++) {
        setT2(L2.slice(0, i + 1));
        await sleep(speed);
      }
      await sleep(300);
      for (let i = 0; i < L3.length; i++) {
        setT3(L3.slice(0, i + 1));
        await sleep(speed);
      }
      // finished typing: clear blinking and hide cursor
      clearInterval(blinkRef.current!);
      setCursorOn(false);
    })();
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
        gap: '20px',
        whiteSpace: 'pre-wrap',
      }}
    >
      {/* Line 1 */}
      {t1 && (
        <AnimatedLine
          text={t1}
          font="var(--font-space-grotesk)"
          size="clamp(20px, 2vw + 6px, 32px)"
          showCursor={cursorOn && t2 === ''}
        />
      )}

      {/* Line 2 */}
      {t2 && (
        <AnimatedLine
          text={t2}
          font="var(--font-playfair)"
          size="clamp(30px, 3.2vw + 6px, 60px)"
          italic
          showCursor={cursorOn && t3 === ''}
        />
      )}

      {/* Line 3 */}
      {t3 && (
        <AnimatedLine
          text={t3}
          font="var(--font-roboto-mono)"
          size="clamp(16px, 1.4vw + 4px, 24px)"
          showCursor={cursorOn}
        />
      )}
    </div>
  );
}
