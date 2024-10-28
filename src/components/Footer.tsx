import React from 'react';
import logo from '../assets/images/Logo.svg'; 
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo" className="footer-logo" /> {/* Agregar logo aquí */}
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-discord"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <p>© 2024 NFT Marketplace. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;