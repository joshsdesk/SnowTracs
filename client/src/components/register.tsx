// === Register.tsx ===
// Registration modal for new user sign-up
// Collects user info: username, email, password, user type, avatar, and optional bio

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import '../styles/register.css';  // ✅ Use its own CSS now

// === GraphQL Mutation: Register a New User ===
const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $userType: String!
    $profileImage: String!
    $bio: String
  ) {
    register(
      username: $username
      email: $email
      password: $password
      userType: $userType
      profileImage: $profileImage
      bio: $bio
    ) {
      token
      user {
        _id
        username
        email
        userType
        profileImage
        bio
      }
    }
  }
`;

interface RegisterProps {
  onSuccess: () => void;
}

export default function Register({ onSuccess }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Snowboarder');
  const [profileImage, setProfileImage] = useState('/assets/images/profileIMGs/avatar1.png');
  const [bio, setBio] = useState('');

  const [register] = useMutation(REGISTER_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({
        variables: { username, email, password, userType, profileImage, bio },
      });
      localStorage.setItem('token', data.register.token);
      onSuccess();
    } catch (err: any) {
      console.error('Registration error:', err);
      alert(err.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-modal">
      <h2 className="modal-title">Register</h2>

      <label htmlFor="username" className="form-title">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      <label htmlFor="email" className="form-title">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password" className="form-title">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <label htmlFor="userType" className="form-title">Select your style</label>
      <select
        id="userType"
        value={userType}
        onChange={e => setUserType(e.target.value)}
      >
        <option value="Snowboarder">Snowboarder</option>
        <option value="Skier">Skier</option>
      </select>

      <label htmlFor="profileImage" className="form-title">Select an Avatar</label>
      <select
        id="profileImage"
        value={profileImage}
        onChange={e => setProfileImage(e.target.value)}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const url = `/assets/images/profileIMGs/avatar${i + 1}.png`;
          return (
            <option key={i} value={url}>
              Avatar {i + 1}
            </option>
          );
        })}
      </select>

      <div className="avatar-preview">
        <div className="avatar-frame">
          <img src={profileImage} alt="Selected avatar" />
        </div>  
      </div>

      <label htmlFor="bio" className="form-title">Short Bio (optional)</label>
      <textarea
        id="bio"
        placeholder="Tell us a little about yourself..."
        value={bio}
        onChange={e => setBio(e.target.value)}
      />

      <button type="submit" className="register-submit">Submit</button>
    </form>
  );
}
