// ===== Imports =====
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import '../styles/login.css';
import Modal from '../components/modal';
import Register from '../components/register';

// ===== GraphQL Mutation =====
const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bio
        profileImage
        userType
      }
    }
  }
`;

// ===== Main Login Component =====
export default function Login() {
  const navigate = useNavigate();

  // ===== State Management =====
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_USER);
  const [showModal, setShowModal] = useState(false);

  // ===== Handle Login Logic =====
  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });

      localStorage.setItem('token', data.login.token);

      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.login.user.username || 'Guest',
          description: data.login.user.bio || '',
          profileImage: data.login.user.profileImage || '/assets/images/profileIMGs/avatar3.webp',
          userType: data.login.user.userType || '',
        })
      );

      navigate('/home');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

// ===== Regular Snowflake Generation =====
const snowflakes = useMemo(() => {
  return Array.from({ length: 2000 }, (_, i) => (
    <div key={`flake-${i}`} className={`flake ${i % 8 === 0 ? 'glow' : ''}`}></div>
  ));
}, []);

// ===== Emoji Snowflake Generation (Fixed Fall) =====
const emojiFlakes = useMemo(() => {
  return Array.from({ length: 20 }, (_, i) => {
    const left = `${Math.random() * 100}vw`;
    const fallDuration = `${Math.random() * 10 + 12}s`;
    const spinDuration = `${Math.random() * 5 + 6}s`;
    const fontSize = `${Math.floor(Math.random() * 10) + 18}px`;

    return (
      <div
        key={`emoji-flake-${i}`}
        className="emoji-flake-wrapper"
        style={{
          left,
          top: '-10px',
          position: 'absolute',
          animation: `fall ${fallDuration} linear infinite`,
        }}
      >
        <div
          className="emoji-flake"
          style={{
            fontSize,
            animation: `spin ${spinDuration} linear infinite`,
          }}
        >
          ❄️
        </div>
      </div>
    );
  });
}, []);

  // ===== Render Component =====
  return (
    <>
      <div className="login-page">
        {/* ===== Snowflakes Background ===== */}
        <div className="snow">
          {snowflakes}
          {emojiFlakes}
        </div>

        {/* ===== App Logo Section ===== */}
        <div className="app-logo">
          <img
            src="/assets/images/UI/logoWtxt.png"
            alt="SnowTracs Logo"
            className="logo-image"
          />
          <p className="small-text muted-text">Every Peak. Every Run. Every Moment.</p>
        </div>

        {/* ===== Login Form ===== */}
        <div className="login-container">
          <input
            type="text"
            placeholder="Email or Username"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>

          <p className="form-text accent-text" onClick={() => setShowModal(true)}>
            Register
          </p>
        </div>
      </div>

      {/* ===== Registration Modal ===== */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Register
          onSuccess={() => {
            setShowModal(false);
            navigate('/home');
          }}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
}
