// API Service interacting with FastAPI Backend endpoints

const API_BASE = '/api';

const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth & Users
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Registration failed');
    }
    return res.json();
  },

  getMe: async (token) => {
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return res.json();
  },

  // Event Ideas
  getIdeas: async (status = '', category = '') => {
    let url = `${API_BASE}/ideas?`;
    if (status) url += `status=${encodeURIComponent(status)}&`;
    if (category) url += `category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch event ideas');
    return res.json();
  },

  getIdeaById: async (ideaId) => {
    const res = await fetch(`${API_BASE}/ideas/${ideaId}`);
    if (!res.ok) throw new Error('Idea not found');
    return res.json();
  },

  createIdea: async (ideaData, token) => {
    const res = await fetch(`${API_BASE}/ideas`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(ideaData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to submit idea');
    }
    return res.json();
  },

  updateIdea: async (ideaId, updateData, token) => {
    const res = await fetch(`${API_BASE}/ideas/${ideaId}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error('Failed to update idea');
    return res.json();
  },

  deleteIdea: async (ideaId, token) => {
    const res = await fetch(`${API_BASE}/ideas/${ideaId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to delete idea');
    return res.json();
  },

  // Voting
  voteIdea: async (ideaId, token) => {
    const res = await fetch(`${API_BASE}/ideas/${ideaId}/vote`, {
      method: 'POST',
      headers: getHeaders(token),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Voting failed');
    }
    return res.json();
  },

  getUserVotes: async (token) => {
    const res = await fetch(`${API_BASE}/ideas/user/my-votes`, {
      headers: getHeaders(token),
    });
    if (!res.ok) return [];
    return res.json();
  },

  // Comments
  getComments: async (ideaId) => {
    const res = await fetch(`${API_BASE}/ideas/${ideaId}/comments`);
    if (!res.ok) throw new Error('Failed to load comments');
    return res.json();
  },

  addComment: async (ideaId, commentText, token) => {
    const res = await fetch(`${API_BASE}/ideas/${ideaId}/comments`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ comment: commentText }),
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return res.json();
  },

  deleteComment: async (commentId, token) => {
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to delete comment');
    return res.json();
  },

  // Admin Moderation & Dashboard
  getAdminIdeas: async (token) => {
    const res = await fetch(`${API_BASE}/admin/ideas`, {
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Admin authorization required');
    return res.json();
  },

  approveIdea: async (ideaId, token) => {
    const res = await fetch(`${API_BASE}/admin/ideas/${ideaId}/approve`, {
      method: 'PUT',
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to approve idea');
    return res.json();
  },

  rejectIdea: async (ideaId, token) => {
    const res = await fetch(`${API_BASE}/admin/ideas/${ideaId}/reject`, {
      method: 'PUT',
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to reject idea');
    return res.json();
  },

  getAdminStats: async (token) => {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error('Failed to load dashboard metrics');
    return res.json();
  },

  // Results
  getResults: async () => {
    const res = await fetch(`${API_BASE}/results`);
    if (!res.ok) throw new Error('Failed to fetch results');
    return res.json();
  },

  publishResult: async (ideaId, title, token) => {
    const res = await fetch(`${API_BASE}/admin/results`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ ideaId, title }),
    });
    if (!res.ok) throw new Error('Failed to publish result');
    return res.json();
  },
};
