import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    navigate('/home');
  };

  // ✅ Generate 300 flakes, every 7th flake glows
  const snowflakes = Array.from({ length: 400 }, (_, i) => (
    <div key={i} className={`flake ${i % 8 === 0 ? 'glow' : ''}`}></div>
  ));

  return (
    <div className="login-page">
      {/* ✅ Snowfall Animation with Glow */}
      <div className="snow">
        {snowflakes}
      </div>

      {/* ✅ Logo and Tagline */}
      <div className="app-logo">
        <h1>SnowTracs❄</h1>
        <p>Every Peak. Every Run. Every Moment.</p>
      </div>

      <div className="login-container">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleLogin}>Login</button>

        <p onClick={() => setShowModal(true)}>Register</p>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register</h2>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Submit</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
