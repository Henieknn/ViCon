import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/ViconLandingPage';
import TariffsPage from './pages/TariffsPage';
import DashboardPage from './pages/DashboardPage';
import Header from './Header';
import OrderModal from './OrderModal';
import './OrderModal.css';

function App() {
  const tariffs = [
    { name: 'Безлимит X', price: '29,80' },
    { name: 'Быстрый 10', price: '17,80' },
    { name: 'Близкий', price: '7,90' },
    { name: 'Безлимит', price: '19,99' },
    { name: 'Быстрый 20', price: '23,50' },
    { name: 'Детский', price: '5,00' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState('');

  const openOrderModal = (tariffName = '') => {
    setSelectedTariff(tariffName);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
    setSelectedTariff('');
  };

  return (
    <Router>
      <Header onOrderClick={() => openOrderModal()} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tariffs" element={
          <TariffsPage onOrderClick={openOrderModal} />
        } />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeOrderModal}
        tariffs={tariffs}
        selectedTariff={selectedTariff}
      />
    </Router>
  );
}

export default App;
