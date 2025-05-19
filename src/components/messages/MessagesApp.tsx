'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { FAQItem, ConversationEntry } from './types';
import MessagesHeader from './MessagesHeader';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickReplies from './QuickReplies';

interface Props {
  onClose: () => void;
}

export default function MessagesApp({ onClose }: Props) {
  const [pending, setPending] = useState<FAQItem[]>([]);
  const [conversation, setConversation] = useState<ConversationEntry[]>([
    { content: 'Here are some FAQs you can ask:', isUser: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    fetch('/faq.json')
      .then(r => r.json())
      .then((data: FAQItem[]) => {
        setPending(data);
      });
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, isTyping]);

  const askFAQ = (question: string) => {
    const faq = pending.find(f => f.question === question)!;
    setConversation(c => [
      ...c,
      { content: question, isUser: true, delivered: true }
    ]);
    setPending(p => p.filter(f => f.question !== question));
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setConversation(c => [
        ...c,
        { content: faq.answer, isUser: false }
      ]);
    }, 1500);
  };

  const addReaction = (idx: number, emoji: string) => {
    setConversation(c => {
      const copy = [...c];
      copy[idx] = { ...copy[idx], reaction: emoji };
      return copy;
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity:0, scale:0.95, y:20 }}
        animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.95, y:20 }}
        transition={{ type:'spring', stiffness:300, damping:30 }}
        drag dragControls={dragControls} dragMomentum={false}
        style={{
          position:'fixed', top:'15%', left:'35%',
          transform:'translate(-50%,-50%)',
          width:'min(90vw,400px)', height:'min(80vh,600px)',
          backgroundColor:'#fff', borderRadius:12,
          boxShadow:'0 8px 32px rgba(0,0,0,0.15)',
          display:'flex', flexDirection:'column',
          overflow:'hidden', fontFamily:'-apple-system,"SF Pro"',
          zIndex:9999
        }}
      >
        <MessagesHeader onClose={onClose} dragControls={dragControls} />

        <div
          ref={chatRef}
          style={{
            flex:1,
            overflowY:'auto',
            padding:16,
            display:'flex',
            flexDirection:'column'
          }}
        >
          {conversation.map((msg, i) => (
            <MessageBubble
              key={i}
              content={msg.content}
              isUser={msg.isUser}
              delivered={msg.delivered}
              reaction={msg.reaction}
              onReact={msg.isUser ? undefined : e => addReaction(i,e)}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {!isTyping && pending.length > 0 && (
            <QuickReplies
              options={pending.map(f => f.question)}
              onSelect={askFAQ}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
