import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [phone, setPhone] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [idInstance, setIdInstance] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ phone, apiUrl, idInstance, token });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="phone">Номер телефона</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 900 000-00-00"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="apiUrl">API URL</label>
        <input
          id="apiUrl"
          type="url"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="https://api.example.com"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="idInstance">ID Instance</label>
        <input
          id="idInstance"
          type="number"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="1234567890"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="token">Токен</label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Введите токен"
          required
        />
      </div>

      <button type="submit" className="login-button">
        Login in
      </button>
    </form>
  );
}