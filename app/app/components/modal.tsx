// app/components/modal.tsx

'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  theme?: 'dark';
}

const Modal = ({ isOpen, onClose, children, title, theme }: ModalProps) => {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div
        className={`relative w-3/4 rounded-lg p-6 shadow-lg md:w-2/3 lg:w-2/5 ${theme ? 'bg-gray-700 text-white' : 'bg-white'}`}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-lg font-bold md:text-xl">{title}</h2>}
          <button onClick={onClose} className="hidden text-gray-500 hover:text-gray-700 md:block">
            {/* <X size={24} /> */}X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
