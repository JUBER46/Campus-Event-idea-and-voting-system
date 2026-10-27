import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campus_event_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campus_event_token') || '';
  });

  const [votedIdeaIds, setVotedIdeaIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('campus_event_user', JSON.stringify(currentUser));
      localStorage.setItem('campus_event_token', token);
      fetchUserVotes();
    } else {
      localStorage.removeItem('campus_event_user');
      localStorage.removeItem('campus_event_token');
      setVotedIdeaIds([]);
    }
  }, [currentUser, token]);

  const fetchUserVotes = async () => {
    try {
      if (!token) return;
      const votes = await api.getUserVotes(token);
      setVotedIdeaIds(votes);
    } catch (err) {
      console.error('Failed to fetch user votes:', err);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setCurrentUser(data.user);
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = await api.register(userData);
      setCurrentUser(newUser);
      setToken(`mock_token_${newUser.userId}`);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken('');
    setVotedIdeaIds([]);
    localStorage.removeItem('campus_event_user');
    localStorage.removeItem('campus_event_token');
  };

  const addVotedIdea = (ideaId) => {
    setVotedIdeaIds(prev => [...prev, ideaId]);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        login,
        register,
        logout,
        votedIdeaIds,
        addVotedIdea,
        refreshVotes: fetchUserVotes,
        isAdmin: currentUser?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
