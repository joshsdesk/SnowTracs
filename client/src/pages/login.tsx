// login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import '../styles/login.css';
import Modal from '../components/modal';
import Register from '../components/register';

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

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_USER);
  const [showModal, setShowModal] = useState(false);

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

  const snowflakes = Array.from({ length: 400 }, (_, i) => (
    <div key={i} className={`flake ${i % 8 === 0 ? 'glow' : ''}`}></div>
  ));

  return (
    <>
      <div className="login-page">
        <div className="snow">{snowflakes}</div>

        <div className="app-logo">
          <img
            src="/assets/images/UI/logoWtxt.png"
            alt="SnowTracs Logo"
            className="logo-image"
          />
          <p className="slogan">Every Peak. Every Run. Every Moment.</p>
        </div>

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
