import React from 'react';
import './NftDetailModal.css';

interface NftDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  story: string;
}

const NftDetailModal: React.FC<NftDetailModalProps> = ({ isOpen, onClose, imageUrl, story }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content futuristic-style">
        <img src={imageUrl} alt="NFT" className="nft-image" />
        <p className="nft-story">{story}</p>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default NftDetailModal;
