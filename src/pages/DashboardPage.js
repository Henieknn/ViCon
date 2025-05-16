import React, { useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [balance, setBalance] = useState(0); // Состояние для хранения баланса
  const [topupAmount, setTopupAmount] = useState(''); // Состояние для хранения суммы пополнения

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  const handleCloseSupport = () => {
    setShowSupport(false);
  };

  const toggleSettings = () => {
    setShowSettings(true);
  };

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (!isNaN(amount) && amount > 0) {
      setBalance(balance + amount); // Обновляем баланс
      setTopupAmount(''); // Очищаем поле ввода
    } else {
      alert("Введите корректную сумму для пополнения."); // Сообщение об ошибке
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <nav className="dashboard-sidebar">
          <ul>
            <a onClick={() => setShowSettings(false)}>
              <li>Личный кабинет</li>
            </a>
            <a onClick={handleSupportClick}>
              <li>Поддержка</li>
            </a>
          </ul>
          <ul>
            <a onClick={toggleSettings}>
              <li>Настройки</li>
            </a>
          </ul>
        </nav>

        <div className="dashboard-content">
          {showSettings ? (
            <SettingsSection />
          ) : (
            <>
              <div className="dashboard-top-blocks">
                <div className="balance-block">
                  <h2>Баланс</h2>
                  <p>{balance.toFixed(2)} <span>руб.</span></p> {/* Отображаем баланс */}
                </div>
                <div className="topup-block">
                  <h2>Пополнить</h2>
                  <div className="topup-form">
                    <input 
                      type="number" 
                      placeholder="Сумма" 
                      value={topupAmount} 
                      onChange={(e) => setTopupAmount(e.target.value)} 
                    />
                    <button onClick={handleTopup}>Оплатить</button> {/* Кнопка пополнения */}
                  </div>
                </div>
              </div>

              <div className="expenses-block">
                <h2>Мои расходы</h2>
                <table className="expenses-table">
                  <thead>
                    <tr>
                      <th className="category-column">Категория</th>
                      <th className="amount-column">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" className="empty-row">Нет записей</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {showSupport && (
        <div className="support-modal" onClick={handleCloseSupport}>
          <div className="support-content" onClick={(e) => e.stopPropagation()}>
            <h2>Контакты поддержки</h2>
            <p>Почта: support@example.com</p>
            <p>Телефон горячей линии: +375 (123) 456-78-90</p>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsSection = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const [security, setSecurity] = useState({
    password: '',
    twoFactorAuth: false,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handlePasswordChange = () => {
    // Логика для изменения пароля
    console.log("Пароль изменен:", security.password);
  };

  return (
    <div className="settings-container">
      <h2>Настройки</h2>

      <div className="settings-section">
        <h3>Управление профилем</h3>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={profile.name}
          onChange={handleProfileChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={profile.email}
          onChange={handleProfileChange}
        />
      </div>

      <div className="settings-section">
        <h3>Настройки безопасности</h3>
        <input
          type="password"
          name="password"
          placeholder="Новый пароль"
          value={security.password}
          onChange={handleSecurityChange}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="twoFactorAuth"
            checked={security.twoFactorAuth}
            onChange={(e) => setSecurity({ ...security, twoFactorAuth: e.target.checked })}
          />
          Включить двухфакторную аутентификацию
        </label>
        <button className="confirm-button" onClick={handlePasswordChange}>
          Подтвердить
        </button>
      </div>

      <div className="settings-section">
        <h3>Управление уведомлениями</h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={notifications.emailNotifications}
            onChange={handleNotificationChange}
          />
          Получать уведомления по электронной почте
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={notifications.smsNotifications}
            onChange={handleNotificationChange}
          />
          Получать SMS-уведомления
        </label>
      </div>
    </div>
  );
};

export default DashboardPage;
