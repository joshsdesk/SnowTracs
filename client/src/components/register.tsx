// register.tsx
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import '../styles/register.css';

// ===== GraphQL Mutation =====
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

// ===== Props Passed from Modal =====
interface RegisterProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function Register({ onSuccess }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Snowboarder');
  const [profileImage, setProfileImage] = useState('/assets/images/profileIMGs/avatar1.webp');
  const [bio, setBio] = useState('');

  const [register] = useMutation(REGISTER_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({
        variables: { username, email, password, userType, profileImage, bio },
      });

      // ✅ Clear any existing data and set the new user
      localStorage.removeItem('user');
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.register.user.username,
          description: data.register.user.bio,
          profileImage: data.register.user.profileImage,
          userType: data.register.user.userType,
        })
      );

      localStorage.setItem('token', data.register.token);

      // ✅ Stay on the homepage — no redirect
      onSuccess();
    } catch (err: any) {
      console.error('Registration error:', err);
      alert(err.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-modal">
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

      <div className="form-group">
        <label htmlFor="userType" className="form-title">Select your style</label>
        <select
          id="userType"
          value={userType}
          onChange={e => setUserType(e.target.value)}
        >
          <option value="Snowboarder">Snowboarder</option>
          <option value="Skier">Skier</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="profileImage" className="form-title">Select an Avatar</label>
        <select
          id="profileImage"
          value={profileImage}
          onChange={e => setProfileImage(e.target.value)}
        >
          {Array.from({ length: 9 }, (_, i) => {
            const url = `/assets/images/profileIMGs/avatar${i + 1}.webp`;
            return (
              <option key={i} value={url}>
                Avatar {i + 1}
              </option>
            );
          })}
        </select>
      </div>

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
        className="form-control"
      />

      <button type="submit" className="register-submit">Submit</button>
    </form>
  );
}

// ✅ This will be read automatically by modal.tsx
Register.modalTitle = 'Register';
