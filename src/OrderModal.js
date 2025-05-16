import React from 'react';
import './OrderModal.css';

const OrderModal = ({ isOpen, onClose, tariffs, selectedTariff }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Заказ SIM-карты</h2>
        <form className="order-form">
          <label>
            Имя:
            <input type="text" placeholder="Введите ваше имя" />
          </label>
          <label>
            Телефон:
            <input type="tel" placeholder="+375..." />
          </label>
          <label>
            Адрес доставки:
            <textarea placeholder="Город, улица, дом..." />
          </label>
          <label>
            Тариф:
            <select defaultValue={selectedTariff || ''}>
              <option value="">Выберите тариф</option>
              {tariffs.map((tariff, index) => (
                <option key={index} value={tariff.name}>
                  {tariff.name} — {tariff.price} руб.
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="submit-button">Оформить заказ</button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
