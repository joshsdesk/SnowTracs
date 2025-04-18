// app.tsx – Main Application Wrapper
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

import Login from './pages/login';
import Home from './pages/home';
import User from './pages/user';
import Settings from './pages/settings';
import Stats from './pages/stats';
import Resorts from './pages/resorts';
import Friends from './pages/friends';
import Nav from './components/nav';
import './index.css';

function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>

      {!isLoginPage && <Nav />}
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppWrapper />
      </Router>
    </ApolloProvider>
  );
}
