// register.tsx
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import '../styles/register.css';

// ===== GraphQL Mutation (now includes firstName and lastName) =====
const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
    $userType: String!
    $profileImage: String!
    $bio: String
  ) {
    register(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      profileImage: $profileImage
      bio: $bio
    ) {
      token
      user {
        _id
        username
        email
        firstName
        lastName
        userType
        profileImage
        bio
      }
    }
  }
`;

interface RegisterProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function Register({ onSuccess }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
        variables: {
          username,
          email,
          password,
          firstName,
          lastName,
          userType,
          profileImage,
          bio,
        },
      });

      localStorage.removeItem('user');
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.register.user.username,
          description: data.register.user.bio,
          profileImage: data.register.user.profileImage,
          userType: data.register.user.userType,
          firstName: data.register.user.firstName,
          lastName: data.register.user.lastName,
        })
      );
      localStorage.setItem('token', data.register.token);
      onSuccess();
    } catch (err: any) {
      console.error('Registration error:', err);
      alert(err.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-modal">
      <label htmlFor="username" className="form-title">Username</label>
      <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />

      <label htmlFor="firstName" className="form-title">First Name</label>
      <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />

      <label htmlFor="lastName" className="form-title">Last Name</label>
      <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />

      <label htmlFor="email" className="form-title">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label htmlFor="password" className="form-title">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <div className="form-group">
        <label htmlFor="userType" className="form-title">Select your style</label>
        <select id="userType" value={userType} onChange={e => setUserType(e.target.value)}>
          <option value="Snowboarder">Snowboarder</option>
          <option value="Skier">Skier</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="profileImage" className="form-title">Select an Avatar</label>
        <select id="profileImage" value={profileImage} onChange={e => setProfileImage(e.target.value)}>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i} value={`/assets/images/profileIMGs/avatar${i + 1}.webp`}>
              Avatar {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="avatar-preview">
        <div className="avatar-frame">
          <img src={profileImage} alt="Selected avatar" />
        </div>
      </div>

      <label htmlFor="bio" className="form-title">Short Bio (optional)</label>
      <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} className="form-control" />

      <button type="submit" className="register-submit">Submit</button>
    </form>
  );
}

Register.modalTitle = 'Register';
