import React from 'react';
import '../OrderModal.css';

const TariffModal = ({ tariffName, onClose, description }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{tariffName}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TariffModal;
