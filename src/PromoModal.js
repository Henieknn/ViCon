import React from 'react';
import './PromoModal.css';

const PromoModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="promo-modal-overlay" onClick={onClose}>
      <div className="promo-modal-content" onClick={e => e.stopPropagation()}>
        <button className="promo-modal-close" onClick={onClose}>×</button>
        <div className="promo-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PromoModal;
