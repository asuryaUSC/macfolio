'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import Image from 'next/image';
import FinderHeader from './FinderHeader';
import FinderSidebar from './FinderSidebar';
import DocumentPopup from './DocumentPopup';

interface FinderWindowProps {
  onClose: () => void;
  initialFolder?: 'projects' | 'certifications' | 'publications';
}

interface FolderFile {
  name: string;
  description: string;
  url: string;
  icon: string;
}

interface FolderItem {
  title: string;
  folder: true;
  contents: FolderFile[];
}

interface FileItem {
  title: string;
  link: string;
  image: string;
}

interface SectionData {
  projects: FolderItem[];
  certifications: FolderItem[];
  publications: FileItem[];
}

type NavigationState = {
  section: keyof SectionData;
  item: string | null;
};

const FinderWindow: React.FC<FinderWindowProps> = ({
  onClose,
  initialFolder,
}) => {
  const dragControls = useDragControls();

  const [sectionData, setSectionData] = useState<SectionData>({
    projects: [],
    certifications: [],
    publications: [],
  });
  const [selectedSection, setSelectedSection] = useState<keyof SectionData>(
    initialFolder || 'projects'
  );
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [popupFile, setPopupFile] = useState<FolderFile | null>(null);

  const [history, setHistory] = useState<NavigationState[]>([
    { section: selectedSection, item: null },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load JSON data
  useEffect(() => {
    async function load() {
      try {
        const [projects, certifications, publications] = await Promise.all([
          fetch('/projects.json').then((r) => r.json()),
          fetch('/certifications.json').then((r) => r.json()),
          fetch('/publications.json').then((r) => r.json()),
        ]);
        setSectionData({ projects, certifications, publications });
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const sections = [
    { title: 'Projects', id: 'projects' as const },
    { title: 'Certifications', id: 'certifications' as const },
    { title: 'Publications', id: 'publications' as const },
  ];

  // Navigation history helpers
  const updateView = (section: keyof SectionData, item: string | null = null) => {
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push({ section, item });
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    setSelectedSection(section);
    setOpenItem(item);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSelectedSection(prev.section);
      setOpenItem(prev.item);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setSelectedSection(next.section);
      setOpenItem(next.item);
    }
  };

  const currentSectionTitle =
    sections.find((s) => s.id === selectedSection)?.title || '';
  const subtitle = openItem
    ? `${currentSectionTitle} > ${openItem}`
    : currentSectionTitle;

  // Render the grid of folders/files
  const renderGrid = () => {
    // Nested folders (projects & certs)
    if (selectedSection === 'projects' || selectedSection === 'certifications') {
      const folders = sectionData[selectedSection] as FolderItem[];
      // top‐level folders
      if (!openItem) {
        return folders.map((folder, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            onClick={() => updateView(selectedSection, folder.title)}
            style={iconContainer}
          >
            <Image
              src="/finalKit/folder.png"
              alt={folder.title}
              width={48}
              height={48}
              style={iconImage}
            />
            <div style={iconLabel}>{folder.title}</div>
          </motion.div>
        ));
      }

      // inside a folder → show its files
      const folder = folders.find((f) => f.title === openItem);
      return folder?.contents.map((file, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (file.name.startsWith('Visit')) {
              window.open(file.url, '_blank');
            } else {
              setPopupFile(file);
            }
          }}
          style={iconContainer}
        >
          <Image
            src={file.icon}
            alt={file.name}
            width={48}
            height={48}
            style={iconImage}
          />
          <div style={iconLabel}>{file.name}</div>
        </motion.div>
      ));
    }

    // Publications (flat list)
    return sectionData.publications.map((pub, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        onClick={() => window.open(pub.link, '_blank')}
        style={iconContainer}
      >
        <Image
          src="/finalKit/safari.png"
          alt={pub.title}
          width={48}
          height={48}
          style={iconImage}
        />
        <div style={iconLabel}>{pub.title}</div>
      </motion.div>
    ));
  };

  return (
    <>
      {/* Finder Window */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          style={{
            position: 'fixed',
            top: '20%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 500,
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999, // lower than popup
          }}
        >
          <FinderHeader
            title="Finder"
            subtitle={subtitle}
            onClose={onClose}
            dragControls={dragControls}
            onBack={goBack}
            onForward={goForward}
            canGoBack={historyIndex > 0}
            canGoForward={historyIndex < history.length - 1}
          />

          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <FinderSidebar
              sections={sections.map((s) => ({
                title: s.title,
                items: [{ id: s.id, label: s.title }],
              }))}
              selectedId={selectedSection}
              onSelect={(id) => updateView(id as keyof SectionData, null)}
            />

            <div style={{ flex: 1, padding: 20, overflow: 'auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: 20,
                  padding: 10,
                }}
              >
                {renderGrid()}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Document Popup */}
      <AnimatePresence>
        {popupFile && (
          <DocumentPopup
            title={popupFile.name}
            description={popupFile.description}
            link={popupFile.url}
            onClose={() => setPopupFile(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// shared styles
const iconContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
};
const iconImage: React.CSSProperties = {
  width: 48,
  height: 48,
};
const iconLabel: React.CSSProperties = {
  fontSize: 12,
  textAlign: 'center',
  color: '#2D2D2D',
  maxWidth: 100,
  wordBreak: 'break-word',
};

export default FinderWindow;
