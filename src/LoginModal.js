import React, { useState } from 'react';
import './LoginModal.css'; // создадим стили позже

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

 const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    onLoginSuccess(user); // передаём активного
  } else {
    setError('Неверный логин или пароль');
  }
};

const handleRegister = () => {
  if (!email || !password) {
    setError('Введите email и пароль');
    return;
  }
  if (!emailRegex.test(email)) {
    setError('Введите корректный адрес электронной почты.');
    return;
  }

  if (password.length < 6) {
    setError('Пароль должен быть не менее 6 символов.');
    return;
  }
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.find(user => user.email === email);

  if (exists) {
    setError('Пользователь с таким email уже существует');
    return;
  }

  const newUser = {
  email,
  password,
  role: 'user', // по умолчанию
  phone: '',
  tariff: '',
};
  const updatedUsers = [...users, newUser];
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  onLoginSuccess(newUser);
};

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button
          className="login-button"
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? 'Зарегистрироваться' : 'Войти'}
        </button>

        <p className="toggle-auth" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Уже есть аккаунт? Войти' : 'Еще не зарегистрированы?'}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
