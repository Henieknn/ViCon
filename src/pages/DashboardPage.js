import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [balance, setBalance] = useState(0); // Состояние для хранения баланса
  const [topupAmount, setTopupAmount] = useState(''); // Состояние для хранения суммы пополнения
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminTariffs, setShowAdminTariffs] = useState(false);
  const [showAdminOrders, setShowAdminOrders] = React.useState(false);
const [showAdminUsers, setShowAdminUsers] = React.useState(false);


  useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser?.role === 'admin') {
    setIsAdmin(true);
  }
}, []);

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  const handleCloseSupport = () => {
    setShowSupport(false);
  };

  const toggleSettings = () => {
    setShowSettings(true);
  };
const handleLogout = () => {
  localStorage.removeItem('currentUser');
  window.location.href = '/'; // Или useNavigate() если используешь React Router v6
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
            <a onClick={() => {setShowSettings(false);
                setShowAdminTariffs(false);
                setShowAdminOrders(false);
                setShowAdminUsers(false);}}>
              <li>Личный кабинет</li>
            </a>
            <a onClick={handleSupportClick}>
              <li>Поддержка</li>
            </a>
          </ul>
          <ul>
            <a onClick={()=>{setShowSettings(true); setShowAdminTariffs(false)}}>
              <li>Настройки</li>
            </a>
          </ul>
          {isAdmin && (
            <ul>
              <a onClick={() => {
                setShowSettings(false);
                setShowAdminTariffs(true);
                setShowAdminOrders(false);
                setShowAdminUsers(false);
              }}>
                <li>Тарифы (админ)</li>
              </a>
              <a onClick={() => {
                setShowSettings(false);
                setShowAdminTariffs(false);
                setShowAdminOrders(true);
                setShowAdminUsers(false);
              }}>
                <li>Заказы</li>
              </a>
              <a onClick={() => {
                setShowSettings(false);
                setShowAdminTariffs(false);
                setShowAdminOrders(false);
                setShowAdminUsers(true);
              }}>
                <li>Пользователи</li>
              </a>
            </ul>
          )}
          <ul>
            <a onClick={handleLogout}><li>Выход</li></a>
          </ul>

        </nav>

        <div className="dashboard-content">
          {showSettings ? (
              <SettingsSection />
            ) : showAdminTariffs ? (
              <AdminTariffsSection />
            ) : showAdminOrders ? (
              <AdminOrders />
            ) : showAdminUsers ? (
              <AdminUsers />
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
const AdminTariffsSection = () => {
  const [tariffs, setTariffs] = useState([]);
  const [newTariff, setNewTariff] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    const storedTariffs = JSON.parse(localStorage.getItem('tariffs')) || [];
    setTariffs(storedTariffs);
  }, []);
  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Разрешаем только цифры и одну запятую
    if (/^\d*,?\d*$/.test(value)) {
      setNewTariff({ ...newTariff, price: value });
    }
  };
  const handleInputChange = (e) => {
    setNewTariff({ ...newTariff, [e.target.name]: e.target.value });
  };

  const handleAddTariff = () => {
    if (!newTariff.name || !newTariff.price) return;

    const updatedTariffs = [
      ...tariffs,
      {
        name: newTariff.name,
        price: newTariff.price,
        description: [{ icon: '', text: newTariff.description }],
      },
    ];
    localStorage.setItem('tariffs', JSON.stringify(updatedTariffs));
    setTariffs(updatedTariffs);
    setNewTariff({ name: '', price: '', description: '' });
  };

  const handleDeleteTariff = (index) => {
    const updatedTariffs = tariffs.filter((_, i) => i !== index);
    localStorage.setItem('tariffs', JSON.stringify(updatedTariffs));
    setTariffs(updatedTariffs);
  };

  return (
    <div className="admin-tariffs">
      <h2>Список тарифов</h2>
      <table className="tariff-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена (руб/мес)</th>
            <th>Описание</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((tariff, index) => (
            <tr key={index}>
              <td>{tariff.name}</td>
              <td>{tariff.price}</td>
              <td>
                {tariff.description && tariff.description.length > 0
                  ? tariff.description.map((desc, i) => <div key={i}>{desc.text}</div>)
                  : '—'}
              </td>
              <td>
                <button onClick={() => handleDeleteTariff(index)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Добавить тариф</h2>
      <div className="new-tariff-form">
        <input
          type="text"
          name="name"
          placeholder="Название"
          value={newTariff.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Цена"
          value={newTariff.price}
          onChange={handlePriceChange}
          inputMode="decimal"
        />

        <input
          type="text"
          name="description"
          placeholder="Описание"
          value={newTariff.description}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTariff}>Добавить</button>
      </div>
    </div>
  );
};
const AdminOrders = () => {
  const [orders, setOrders] = React.useState(() => JSON.parse(localStorage.getItem('orders')) || []);

  const handleDeleteOrder = (id) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  if (!orders.length) return <p>Нет заказов</p>;

  return (
    <div className="admin-table-container">
      <h2>Заказы</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Пользователь</th><th>Тариф</th><th>Дата</th><th>Действия</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.tariff}</td>
              <td>{order.date}</td>
              <td><button onClick={() => handleDeleteOrder(order.id)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = React.useState(() => JSON.parse(localStorage.getItem('users')) || []);

  const handleDeleteUser = (email) => {
    const updated = users.filter(u => u.email !== email);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  if (!users.length) return <p>Нет пользователей</p>;

  return (
    <div className="admin-table-container">
      <h2>Пользователи</h2>
      <table>
        <thead>
          <tr><th>Email</th><th>Телефон</th><th>Роль</th><th>Тариф</th><th>Действия</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.phone || '-'}</td>
              <td>{user.role || 'user'}</td>
              <td>{user.tariff || '-'}</td>
              <td>
                {user.role !== 'admin' && (
                  <button onClick={() => handleDeleteUser(user.email)}>Удалить</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const SettingsSection = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
  if (newPassword.trim() === '') return;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const updatedUsers = users.map(user =>
    user.email === currentUser.email
      ? { ...user, password: newPassword }
      : user
  );

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPassword }));

  setNewPassword('');
  alert('Пароль успешно обновлён');
};

  return (
    <div className="settings-container">
      <h2>Настройки</h2>

      <div className="settings-section">
        <div className="user-info-card">
    <h3>Личная информация</h3>
    <p className="user-info-item">
      <strong>Имя:</strong> {currentUser.email}
    </p>
    <p className="user-info-item">
      <strong>Номер:</strong> {currentUser.phone || 'Не зарегистрирован'}
    </p>
    <p className="user-info-item">
      <strong>Тариф:</strong> {currentUser.tariff || 'Не выбран'}
    </p>
  </div>
      </div>

      <div className="settings-section">
        <h3>Настройки безопасности</h3>
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="confirm-button" onClick={handlePasswordChange}>
          Подтвердить
        </button>
      </div>
    </div>
  );
};


export default DashboardPage;
