import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ 
    isOpen, 
    onClose, 
    children 
}: ModalProps) {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
    };

    if (!isOpen) return  null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
        <div className = "absolute w-[375px] shadow-[0px 3px 16px rgba(71, 80, 123, 0.12)] rounded bg-white p-[20px]" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  );
};