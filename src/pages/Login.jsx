import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Key, Mail, ShieldAlert, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
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
      if (data?.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email address or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '60px auto 80px', padding: '0 24px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div style={{ padding: '40px 32px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            background: 'var(--accent-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <LogIn style={{ width: '26px', height: '26px', color: '#fff' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: '800', color: 'var(--text-primary)' }}>Student Sign In</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Access campus event proposal voting & submission
          </p>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            <ShieldAlert style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Campus Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="student@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
              />
              <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
              />
              <Key style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '13px', fontSize: '1rem', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
          >
            {loading ? 'Signing In...' : 'Sign In to Student Portal'} <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>
        </form>

        <div style={{ marginTop: '28px', paddingTop: '22px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
          </p>

          <Link to="/admin/login" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}>
            <ShieldCheck style={{ width: '15px', height: '15px' }} /> Faculty & Administrator Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
