'use client';

import React from 'react';
import { DragControls } from 'framer-motion';

interface Props {
  onClose: () => void;
  dragControls: DragControls;
}

export default function MessagesHeader({ onClose, dragControls }: Props) {
  return (
    <div
      onPointerDown={e => dragControls.start(e)}
      style={{
        height: 32,
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'move',
        padding: '0 12px',
      }}
    >
      <div style={{ position: 'absolute', left: 12, display: 'flex', gap: 8 }}>
        <button
          onClick={onClose}
          style={{
            width:12, height:12, borderRadius:'50%',
            backgroundColor:'#ff5f57', border:'none',
            cursor:'pointer', transition:'filter .2s'
          }}
          onMouseEnter={e => e.currentTarget.style.filter='brightness(.8)'}
          onMouseLeave={e => e.currentTarget.style.filter='brightness(1)'}
        />
        <div style={{
          width:12, height:12, borderRadius:'50%',
          backgroundColor:'#febc2e', cursor:'default'
        }}/>
        <div style={{
          width:12, height:12, borderRadius:'50%',
          backgroundColor:'#28c840', cursor:'default'
        }}/>
      </div>
      <div style={{
        fontSize:14,
        fontWeight:500,
        color:'#333',
        userSelect:'none'
      }}>
        Messages
      </div>
    </div>
  );
}
