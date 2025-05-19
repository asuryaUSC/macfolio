'use client';

import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  delivered?: boolean;
  reaction?: string;
  onReact?: (emoji: string) => void;
}

const bubbleStyle = (isUser: boolean): CSSProperties => ({
  maxWidth: '70%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  marginBottom: 12,
  position: 'relative',
});

const innerStyle = (isUser: boolean): CSSProperties => ({
  backgroundColor: isUser ? '#3aa8fc' : '#e5e5ea',
  color: isUser ? '#fff' : '#000',
  padding: '10px 14px',
  borderRadius: 18,
  borderTopLeftRadius: isUser ? 18 : 4,
  borderTopRightRadius: isUser ? 4 : 18,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  wordBreak: 'break-word',
});

export default function MessageBubble({
  content,
  isUser,
  delivered,
}: MessageBubbleProps) {
  return (
    <div style={bubbleStyle(isUser)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={innerStyle(isUser)}
      >
        {content}
      </motion.div>

      {isUser && delivered && (
        <div style={{
          fontSize: 11,
          color: '#888',
          marginTop: 4,
          textAlign: 'right',
        }}>
          Delivered
        </div>
      )}
    </div>
  );
}
