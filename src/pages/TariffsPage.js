import React, { useState, useEffect } from 'react';
import './TarrifsPage.css';
import OrderModal from '../OrderModal';
import TariffModal from './TariffModal';



const TariffsPage = () => {
  useEffect(() => {
    const storedTariffs = JSON.parse(localStorage.getItem('tariffs')) || [];
    setTariffs(storedTariffs);
  }, []);
  const [tariffs, setTariffs] = useState([]);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  const openInfoModal = (tariff) => {
    setSelectedTariff(tariff);
    setInfoModalOpen(true);
  };

  const handleOrderClick = (tariffName) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!currentUser) {
      alert('Пожалуйста, войдите в аккаунт, чтобы заказать тариф.');
      return;
    }

    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex === -1) return;

    const user = users[userIndex];

    if (user.phone && user.phone.trim() !== '') {
  // Есть номер — меняем тариф
  user.tariff = tariffName;
  users[userIndex] = user;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
  alert(`Ваш тариф был успешно изменён на "${tariffName}"`);
} else {
  // Нет номера — открываем модалку
  setSelectedTariff(tariffs.find(t => t.name === tariffName));
  setOrderModalOpen(true);
}
  };

  return (
    <div className="tariffs-page">
      <h1>Тарифы</h1>
      <div className="tariffs-container">
        {tariffs.map((tariff, index) => (
          <div key={index} className="tariff-card">
            <h2>{tariff.name}</h2>
            <ul>
              {tariff.description.map((item, i) => (
                <li key={i}>
                  <img src={item.icon} alt="" className="feature-img" />
                  {item.text}
                </li>
              ))}
            </ul>
            <p><strong>{tariff.price}</strong> руб/мес</p>
            <button
              className='order'
              onClick={() => handleOrderClick(tariff.name)}
            >
              Заказать
            </button>
            <button
              className='info'
              onClick={() => openInfoModal(tariff)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>

      {isInfoModalOpen && selectedTariff && (
        <TariffModal
          onClose={() => setInfoModalOpen(false)}
          tariffName={selectedTariff.name}
          description={selectedTariff.fullDescription}
        />
      )}

      {isOrderModalOpen && selectedTariff && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          tariffs={tariffs}
          selectedTariff={selectedTariff.name}
        />
      )}
    </div>
  );
};

export default TariffsPage;
