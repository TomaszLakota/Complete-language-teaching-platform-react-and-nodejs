import React, { useState } from 'react';
import { Form, useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import './Login.scss';

function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const data = await authService.login(userData.email, userData.password);

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Dispatch custom event to notify Header component
      window.dispatchEvent(new Event('authChange'));

      // Redirect to home page or dashboard
      navigate('/');
    } catch (err: any) {
      // Consider more specific error typing if possible
      setError(err.message || 'Wystąpił nieznany błąd logowania.');
    }
  };

  return (
    <div className="login-container page-container-narrow">
      <Form onSubmit={handleSubmit} className="login-form">
        <h1>Logowanie</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Adres email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="forgot-password">
          <Link to="/zresetuj-haslo">Nie pamiętasz hasła?</Link>
        </div>
        <button type="submit" className="submit-button">
          Logowanie
        </button>
      </Form>
    </div>
  );
}

export default Login;
