export interface Photo {
  src: string;
  caption: string;
}

export interface CoverFlowProps {
  photos: Photo[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  zoom?: number; 
}
