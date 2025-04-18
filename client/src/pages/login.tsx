import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import '../styles/login.css';
import Modal from '../components/modal';
import Register from '../components/register';

// === GraphQL Login Mutation ===
const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();

  // === Login State ===
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_USER);

  // === Modal State ===
  const [showModal, setShowModal] = useState(false);

  // === Login Handler ===
  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      localStorage.setItem('token', data.login.token);
      navigate('/home');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  // ❄️ Snowfall Background
  const snowflakes = Array.from({ length: 400 }, (_, i) => (
    <div key={i} className={`flake ${i % 8 === 0 ? 'glow' : ''}`}></div>
  ));

  return (
    <>
      <div className="login-page">
        {/* ❄ Animated Snow Background */}
        <div className="snow">{snowflakes}</div>

        {/* App Logo and Tagline */}
        <div className="app-logo">
          <h1>SnowTracs❄</h1>
          <p>Every Peak. Every Run. Every Moment.</p>
        </div>

        {/* Login Box */}
        <div className="login-container">
          <input
            type="text"
            placeholder="Email or Username"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>

          <p className="register-link" onClick={() => setShowModal(true)}>
            Register
          </p>
        </div>
      </div>

      {/* 🔄 Reusable Modal with Register Component */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Register
          onSuccess={() => {
            setShowModal(false);
            navigate('/home');
          }}
        />
      </Modal>
    </>
  );
}
