'use client';

import React from 'react';

interface Props {
  options: string[];
  onSelect: (q: string) => void;
}

export default function QuickReplies({ options, onSelect }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const display = expanded ? options : options.slice(0, 4);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignSelf: 'flex-end',
      marginBottom: 12,
    }}>
      {display.map(q => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          style={{
            backgroundColor: '#3aa8fc',
            color: '#fff',
            border: 'none',
            borderRadius: 18,
            padding: '8px 14px',
            cursor: 'pointer',
            textAlign: 'right',
            fontSize: 14,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {q}
        </button>
      ))}

      {options.length > 4 && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            alignSelf: 'center',
            background: 'none',
            border: 'none',
            color: '#007aff',
            fontSize: 14,
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {expanded ? 'Show fewer' : 'More FAQs…'}
        </button>
      )}
    </div>
  );
}
