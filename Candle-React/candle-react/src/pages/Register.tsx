import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    birthDate: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return 'Introdu o adresa de email valida.';
    }

    if (formData.password.length < 6) {
      return 'Parola trebuie sa aiba minim 6 caractere.';
    }

    if (formData.password !== formData.repeatPassword) {
      return 'Parolele nu coincid.';
    }

    if (!formData.birthDate) {
      return 'Data nasterii este obligatorie.';
    }

    if (new Date(formData.birthDate) > new Date()) {
      return 'Data nasterii nu poate fi in viitor.';
    }

    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await registerUser(formData);
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
      <h1 className="auth-title">Register</h1>

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

        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          required
          value={formData.repeatPassword}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthDate"
          required
          value={formData.birthDate}
          onChange={handleChange}
        />

        {error && <p className="form-error">{error}</p>}

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="auth-footer-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default Register;
