// app/components/modal.tsx

'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="relative w-1/3 rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            {/* <X size={24} /> */}x
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
