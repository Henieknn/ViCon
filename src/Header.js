import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ onOrderClick, onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentUser = localStorage.getItem('currentUser');
  const isLoggedIn = !!currentUser;

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="vicon-header">
      <div className="vicon-logo">
        <a href="/"><img className="vicon-logo-img" src="./icons/logo.png" alt="logo" /></a>
        <div className="burger-menu-icon" onClick={toggleMenu}>
          <div className="burger-line" />
          <div className="burger-line" />
          <div className="burger-line" />
        </div>
      </div>

      <nav className="vicon-nav desktop-nav">
        <a href="/tariffs"><button className="vicon-button">Выбрать тариф</button></a>
        <button className="vicon-button order-sim-button" onClick={onOrderClick}>Заказать SIM</button>
        {isLoggedIn ? (
          <a href="/dashboard"><button className="vicon-button">Личный кабинет</button></a>
        ) : (
          <button className="vicon-button" onClick={onLoginClick}>Вход</button>
        )}
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/tariffs" onClick={closeMenu}>Выбрать тариф</a>
          <button className="vicon-button" onClick={() => { onOrderClick(); closeMenu(); }}>
            Заказать SIM
          </button>
          {isLoggedIn ? (
            <a href="/dashboard" onClick={closeMenu}>Личный кабинет</a>
          ) : (
            <button onClick={() => { onLoginClick(); closeMenu(); }}>Вход</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
