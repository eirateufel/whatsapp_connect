import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    login(credentials);
    navigate('/chat');
  };

  return (
    <div className="login-page">
      <h1>Вход</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}