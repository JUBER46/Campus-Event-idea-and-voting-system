import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Key, Mail, ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(email, password);
      if (data?.user?.role !== 'admin') {
        setError('Access Denied: This portal is reserved for Faculty & Administrators.');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid administrator email or credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '60px auto 80px', padding: '0 24px' }} className="animate-slide-up">
      <div style={{
        padding: '40px 32px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--accent-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ShieldCheck style={{ width: '28px', height: '28px', color: 'var(--bg-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Faculty & Admin Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
            Authorized Administrator Access Only
          </p>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            fontSize: '0.9rem',
            marginBottom: '24px'
          }}>
            <ShieldAlert style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ color: 'var(--text-primary)', marginBottom: '8px', display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Administrator Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                placeholder="admin@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-md)' }}
              />
              <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ color: 'var(--text-primary)', marginBottom: '8px', display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Security Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-md)' }}
              />
              <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              marginTop: '8px',
              background: 'var(--accent-secondary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '600'
            }}
          >
            {loading ? 'Authenticating Admin...' : 'Login to Admin Dashboard'} <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>
        </form>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Are you a student? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Student Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
