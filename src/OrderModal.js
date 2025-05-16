import React, { useEffect, useState } from 'react';
import './OrderModal.css';

const OrderModal = ({ isOpen, onClose, tariffs, selectedTariff }) => {
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tariff, setTariff] = useState(selectedTariff || '');
  const [error, setError] = useState('');
  const phoneRegex = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
  }, [isOpen]);

  const generatePhoneNumber = () => {
    const getRandomDigits = (n) =>
      Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
    const part1 = getRandomDigits(3);
    const part2 = getRandomDigits(2);
    const part3 = getRandomDigits(2);
    return `+375 (29) ${part1}-${part2}-${part3}`;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setError('');

  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user) {
    setError('Сначала войдите в аккаунт, чтобы заказать SIM-карту.');
    return;
  }

  if (user.phone != "") {
    setError('У вас уже есть SIM-карта. Повторный заказ невозможен.');
    return;
  }

  if (!name.trim() || !address.trim() || !tariff) {
    setError('Пожалуйста, заполните обязательные поля.');
    return;
  }

  const phoneRegex = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
  if (contactPhone && !phoneRegex.test(contactPhone)) {
    setError('Телефон для связи должен быть в формате +375(XX)XXX-XX-XX или оставьте его пустым.');
    return;
  }

  const generatedPhone = generatePhoneNumber();

  const updatedUser = { ...user, phone: generatedPhone, tariff };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.map(u =>
    u.email === user.email ? updatedUser : u
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push({
    id: Date.now().toString(),
    name,
    contactPhone,
    address,
    tariff,
    assignedNumber: generatedPhone,
    email: user.email,
    date: new Date().toISOString(),
  });
  localStorage.setItem('orders', JSON.stringify(orders));

  onClose();
};


  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Заказ SIM-карты</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {(
          <form className="order-form" onSubmit={handleSubmit}>
            <label>
              Имя:
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Телефон (для связи):
              <input
                type="tel"
                placeholder="+375..."
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </label>
            <label>
              Адрес доставки:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            <label>
              Тариф:
              <select
                value={tariff}
                onChange={(e) => setTariff(e.target.value)}
                required
              >
                <option value="">Выберите тариф</option>
                {tariffs.map((tariffItem, index) => (
                  <option key={index} value={tariffItem.name}>
                    {tariffItem.name} — {tariffItem.price} руб.
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="submit-button">Оформить заказ</button>
          </form>
        ) }
      </div>
    </div>
  );
};

export default OrderModal;
