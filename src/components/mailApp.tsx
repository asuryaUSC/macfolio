'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MdInbox, MdSend, MdDrafts, MdReport, MdArchive, MdPerson, MdPhone, MdEmail, MdNotes } from 'react-icons/md';

interface Email {
  sender: string;
  subject: string;
  preview: string;
}

const fakeEmails: Email[] = [
    { sender: 'Send me a message', subject: 'Want to say hi!!', preview: 'Use the form on the right to send me a message!' },
    { sender: 'Mom', subject: 'Call me back!!!', preview: 'You left your charger here. Again.' },
    { sender: 'ChatGPT', subject: 'Your brain dump is ready', preview: 'Click here to download your 3AM existential notes.' },
    { sender: 'USC CS Dept.', subject: 'HW #4 has been assigned', preview: 'Please submit AVL trees, BST trees, and Hash Tables before the end of the week.' },
    { sender: 'Varun', subject: 'Bro you up?', preview: 'Trying to decide between shawarma or pizza.' },
    { sender: 'LinkedIn', subject: 'Someone viewed your profile', preview: "Their name rhymes with 'recruiter'. 👀" },
    { sender: 'Old Portfolio', subject: 'You replaced me.', preview: 'And I was just starting to feel pretty.' },
];

interface MailAppProps {
  onClose: () => void;
}

const MailApp: React.FC<MailAppProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const dragControls = useDragControls();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      <motion.div
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
          top: '15%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          height: 600,
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
          zIndex: 10000,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '8px 12px',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
          }}
        >
          {/* Traffic Lights */}
          <div style={{ position: 'absolute', left: 12, display: 'flex', gap: 8 }}>
            <div
              onClick={onClose}
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#ff5f57',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'filter 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.8)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
            />
            <div style={{ width: 12, height: 12, backgroundColor: '#febc2e', borderRadius: '50%' }} />
            <div style={{ width: 12, height: 12, backgroundColor: '#28c840', borderRadius: '50%' }} />
          </div>

          {/* Title */}
          <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Mail</div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <div
            style={{
              width: 180,
              borderRight: '1px solid #eee',
              backgroundColor: '#fff',
              padding: '12px 8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {[
              { name: 'Inbox', icon: MdInbox },
              { name: 'Sent', icon: MdSend },
              { name: 'Drafts', icon: MdDrafts },
              { name: 'Junk', icon: MdReport },
              { name: 'Archive', icon: MdArchive }
            ].map(({ name, icon: Icon }) => (
              <motion.div
                key={name}
                whileHover={{ backgroundColor: '#EFEFF4' }}
                style={{
                  cursor: 'pointer',
                  fontWeight: name === 'Inbox' ? 600 : 400,
                  color: '#000',
                  padding: '8px 10px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderBottom: '1px solid #e0e0e0'
                }}
              >
                <Icon size={18} color="#888" />
                {name}
              </motion.div>
            ))}
          </div>

          {/* Email List */}
          <div
            style={{
              width: 300,
              borderRight: '1px solid #eee',
              backgroundColor: '#fff',
              padding: '12px 8px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {fakeEmails.map((email, index) => (
              <React.Fragment key={email.subject}>
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                  style={{
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#000' }}>{email.sender}</div>
                  <div style={{ color: '#333' }}>{email.subject}</div>
                  <div style={{ color: '#666', fontSize: 12 }}>{email.preview}</div>
                </motion.div>
                {index < fakeEmails.length - 1 && (
                  <div style={{ height: 1, backgroundColor: '#eee', marginTop: 8 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Contact Form Pane */}
          <div
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >

            {submitted ? (
              <div
                style={{
                  marginTop: 80,
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#333',
                }}
              >
                🎉 Your message was sent!
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { name: 'firstName', placeholder: 'First Name', icon: MdPerson },
                  { name: 'lastName', placeholder: 'Last Name', icon: MdPerson },
                  { name: 'phone', placeholder: 'Phone', icon: MdPhone },
                  { name: 'email', placeholder: 'Email', icon: MdEmail },
                ].map(({ name, placeholder, icon: Icon }) => (
                  <div key={name} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Icon size={18} color="#888" style={{ position: 'absolute', left: 12, zIndex: 1 }} />
                    <input
                      name={name}
                      placeholder={placeholder}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        borderRadius: 8,
                        border: 'none',
                        backgroundColor: '#f2f2f7',
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
                      }}
                    />
                  </div>
                ))}

                <div style={{ position: 'relative' }}>
                  <MdNotes size={18} color="#888" style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }} />
                  <textarea
                    name="message"
                    placeholder="Notes"
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      borderRadius: 8,
                      border: 'none',
                      backgroundColor: '#f2f2f7',
                      color: '#000',
                      fontSize: 14,
                      fontFamily: 'inherit',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    backgroundColor: '#007aff',
                    color: '#fff',
                    padding: '10px 28px',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 15,
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Send
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MailApp;
