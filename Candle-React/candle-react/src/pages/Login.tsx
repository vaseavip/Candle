import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email si parola sunt obligatorii.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await loginUser(formData);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1 className="auth-title">Login</h1>

      <form className="checkout-form auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="form-error">{error}</p>}

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="auth-footer-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
}

export default Login;
