export interface MobilePopupProps {
    isOpen: boolean;
    onClose: () => void;
    header: string;
    finishReading: () => void;
    mintNFT: () => void;
    content: {
      type: 'page' | 'link';
      url: string;
    };
  }
  