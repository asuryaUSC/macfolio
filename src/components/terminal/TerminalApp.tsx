// components/terminal/TerminalApp.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import DocumentPopup from '../DocumentPopup';

interface StaticCommand {
  command: string;
  output: string[];
}

interface TerminalHistory {
  prompt: string;
  output: string[];
}

interface ProjectItem {
  title: string;
  folder?: boolean;
  contents?: {
    name: string;
    description?: string;
    url?: string;
  }[];
}

interface TerminalAppProps {
  onClose: () => void;
}

const USER = 'aadityasurya';
const HOST = 'macfolio';

const TerminalApp: React.FC<TerminalAppProps> = ({ onClose }) => {
  const dragControls = useDragControls();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentPath, setCurrentPath] = useState('~/');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [staticCommands, setStaticCommands] = useState<Record<string, StaticCommand>>({});
  const [initialHelp, setInitialHelp] = useState<TerminalHistory | null>(null);
  const [showPopup, setShowPopup] = useState<{ title: string; description: string } | null>(null);

  // 1) Load static commands + initial help
  useEffect(() => {
    fetch('/terminalCommands.json')
      .then(res => res.json())
      .then((cmds: StaticCommand[]) => {
        const map: Record<string, StaticCommand> = {};
        cmds.forEach((c: StaticCommand) => {
          map[c.command.toLowerCase()] = c;
        });
        setStaticCommands(map);

        // auto-run help
        if (map.help) {
          const helpEntry: TerminalHistory = { prompt: '', output: map.help.output };
          setInitialHelp(helpEntry);
          setHistory([helpEntry]);
        }
      })
      .catch(err => console.error('Failed to load commands:', err));
  }, []);

  // 2) Scroll & focus whenever history changes
  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [history]);

  // Build the prompt string
  const makePrompt = (cmd: string) =>
    `${USER}@${HOST}:${currentPath}$ ${cmd}`;

  // Tab‐completion on the INPUT only
  const handleTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();

    const trimmed = input.trim();
    const lower = trimmed.toLowerCase();
    const suggestions: string[] = [];

    // 1) No space yet: complete commands
    if (!trimmed.includes(' ')) {
      Object.keys(staticCommands).forEach(cmd => {
        if (cmd.startsWith(lower)) suggestions.push(staticCommands[cmd].command);
      });
      ['cd','ls','cat','open'].forEach(v => {
        if (v.startsWith(lower) && !suggestions.includes(v)) suggestions.push(v);
      });
      if (suggestions.length) {
        setInput(suggestions[0]);
      }
    } else {
      // 2) After a space: complete the argument only
      const [verbRaw, argRaw] = trimmed.split(/\s+/);
      const verb = verbRaw.toLowerCase();
      const argLower = argRaw.toLowerCase();
      const parts = currentPath.slice(2).split('/').filter(Boolean);

      if (['cd','ls','cat','open'].includes(verb)) {
        // top-level folders
        if (parts.length === 0) {
          ['projects','certifications','publications']
            .filter(d => d.toLowerCase().startsWith(argLower))
            .forEach(d => suggestions.push(d));
          if (suggestions.length) {
            setInput(`${verb} ${suggestions[0]}`);
          }
        }
        // one‐level deep: project titles
        else if (parts.length === 1) {
          const folder = parts[0];
          fetch(`/${folder}.json`)
            .then(r => r.json())
            .then((data: ProjectItem[]) => {
              data.forEach(item => {
                if (item.title.toLowerCase().startsWith(argLower)) {
                  suggestions.push(item.title);
                }
              });
              if (suggestions.length) setInput(`${verb} ${suggestions[0]}`);
            })
            .catch(() => {});
        }
        // two‐level deep: file names
        else if (parts.length === 2) {
          const [folder, project] = parts;
          fetch(`/${folder}.json`)
            .then(r => r.json())
            .then((data: ProjectItem[]) => {
              const f = data.find(i => i.title.toLowerCase() === project.toLowerCase());
              f?.contents?.forEach(c => {
                if (c.name.toLowerCase().startsWith(argLower)) {
                  suggestions.push(c.name);
                }
              });
              if (suggestions.length) setInput(`${verb} ${suggestions[0]}`);
            })
            .catch(() => {});
        }
      }
    }
  };

  // Core command handler
  const handleCommand = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    const promptLine = makePrompt(cmd);
    let outputLines: string[] = [];

    // cd
    if (lower.startsWith('cd ')) {
      const target = cmd.slice(3).trim();
      const tLower = target.toLowerCase();
      if (tLower === '..') {
        setCurrentPath('~/');
      } else if (
        currentPath === '~/' &&
        ['projects','certifications','publications'].includes(tLower)
      ) {
        setCurrentPath(`~/${tLower}`);
      } else {
        // deeper cd
        const folder = currentPath.slice(2);
        const data = await fetch(`/${folder}.json`).then(r => r.json()) as ProjectItem[];
        const found = data.find(i =>
          i.title.toLowerCase() === tLower && i.folder
        );
        if (found) {
          setCurrentPath(`${currentPath}/${found.title}`);
        } else {
          outputLines = [`cd: no such directory: ${target}`];
        }
      }
    }

    // ls
    else if (lower === 'ls') {
      if (currentPath === '~/') {
        outputLines = ['projects','certifications','publications'];
      } else {
        const parts = currentPath.slice(2).split('/');
        const data = await fetch(`/${parts[0]}.json`).then(r => r.json()) as ProjectItem[];
        if (parts.length === 1) {
          outputLines = data.map(i => i.title);
        } else {
          const f = data.find(i =>
            i.title.toLowerCase() === parts[1].toLowerCase()
          );
          outputLines = f?.contents?.map(c => c.name)
                      || [`ls: cannot access`];
        }
      }
    }

    // cat
    else if (lower.startsWith('cat ')) {
      const name = cmd.slice(4).trim();
      const nLower = name.toLowerCase();
      const parts = currentPath.slice(2).split('/');
      if (parts.length === 2) {
        const data = await fetch(`/${parts[0]}.json`).then(r => r.json()) as ProjectItem[];
        const f = data.find(i =>
          i.title.toLowerCase() === parts[1].toLowerCase()
        );
        const file = f?.contents?.find(c => c.name.toLowerCase() === nLower);
        outputLines = file?.description
          ? [file.description]
          : [`cat: ${name}: No such file`];
      } else {
        outputLines = [`cat: ${name}: No such file`];
      }
    }

    // open
    else if (lower.startsWith('open ')) {
      const name = cmd.slice(5).trim();
      const nLower = name.toLowerCase();
      const parts = currentPath.slice(2).split('/');
      if (parts.length === 2) {
        const data = await fetch(`/${parts[0]}.json`).then(r => r.json()) as ProjectItem[];
        const f = data.find(i =>
          i.title.toLowerCase() === parts[1].toLowerCase()
        );
        const item = f?.contents?.find(c => c.name.toLowerCase() === nLower);
        if (item) {
          if (item.url) {
            window.open(item.url, '_blank');
            outputLines = [`Opening ${name} in browser...`];
          } else {
            setShowPopup({ title: item.name, description: item.description || '' });
            outputLines = [`Opening ${name}...`];
          }
        } else {
          outputLines = [`open: ${name}: No such file`];
        }
      } else {
        outputLines = [`open: ${name}: No such file`];
      }
    }

    // clear
    else if (lower === 'clear') {
      if (initialHelp) {
        setHistory([initialHelp]);
      } else {
        setHistory([]);
      }
      return;
    }

    // static
    else if (staticCommands[lower]) {
      outputLines = staticCommands[lower].output;
    }

    // fallback
    else {
      outputLines = [`${cmd}: command not found`];
    }

    setHistory(h => [...h, { prompt: promptLine, output: outputLines }]);
  };

  // form submit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

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
          left: '30%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 500,
          backgroundColor: '#000',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Inconsolata', monospace",
          color: '#fff',
          zIndex: 10000,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: 32,
            backgroundColor: '#111',
            borderBottom: '1px solid #333',
          }}
        >
          <div style={{ position: 'absolute', left: 12, display: 'flex', gap: 6 }}>
            <div
              onClick={onClose}
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#ff5f57',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
            <div style={{ width: 12, height: 12, backgroundColor: '#febc2e', borderRadius: '50%' }} />
            <div style={{ width: 12, height: 12, backgroundColor: '#28c840', borderRadius: '50%' }} />
          </div>
          <span style={{ color: '#eee', fontSize: 13 }}>Terminal</span>
        </div>

        {/* History */}
        <div
          ref={terminalRef}
          style={{
            flex: 1,
            padding: 12,
            overflowY: 'auto',
            lineHeight: 1.4,
            fontSize: 14,
          }}
        >
          {history.map((hEntry, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{hEntry.prompt}</div>
              {hEntry.output.map((line, jdx) => (
                <div key={jdx} style={{ paddingLeft: 16, whiteSpace: 'pre-wrap' }}>
                  {line}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          style={{
            borderTop: '1px solid #333',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ color: '#0f0', fontSize: 14, whiteSpace: 'pre' }}>
            {USER}@{HOST}:{currentPath}$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleTab}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontFamily: "'Inconsolata', monospace",
              fontSize: 14,
            }}
          />
        </form>

        {/* Document Popup */}
        <AnimatePresence>
          {showPopup && (
            <DocumentPopup
              title={showPopup.title}
              description={showPopup.description}
              link=""
              onClose={() => setShowPopup(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalApp;
