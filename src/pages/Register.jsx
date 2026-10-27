import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ShieldCheck, CheckCircle2, Sparkles, User, GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science',
    year: '3rd Year',
    role: 'student',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newUser = await register(formData);
      if (formData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto 80px', padding: '0 24px' }} className="responsive-container">
      <div className="responsive-grid-split" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Left Side: Feature Intro */}
        <div style={{
          background: 'var(--accent-primary)',
          padding: '48px 36px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '6px 14px',
              borderRadius: '30px',
              fontSize: '0.82rem',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              <Sparkles style={{ width: '15px', height: '15px' }} /> Join Campus Event Idea & Voting System
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px' }}>
              Your Campus. Your Events. Your Voice.
            </h2>

            <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Create your verified student profile to pitch event proposals, upvote fellow ideas, and collaborate with student council.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#fff' }} />
                <span>Upvote your favorite event proposals</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#fff' }} />
                <span>Submit pitch decks & budget requests</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#fff' }} />
                <span>Faculty & Council direct moderation</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', fontSize: '0.85rem', opacity: 0.8 }}>
            Campus Event Voting System • Secure Account Creation
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div style={{ padding: '48px 40px', background: 'var(--bg-card)' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>Create Student Profile</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
              Fill in your campus details to get started.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              fontSize: '0.88rem',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
                <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Campus Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="alex.rivera@student.campus.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
                <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Academic Department</label>
                <select name="department" value={formData.department} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics & Comm">Electronics & Comm</option>
                  <option value="Mechanical Eng">Mechanical Eng</option>
                  <option value="Business Admin">Business Admin</option>
                  <option value="Arts & Design">Arts & Design</option>
                  <option value="Faculty & Administration">Faculty & Administration</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Account Type / Role</label>
                <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <option value="student">Student Account</option>
                  <option value="admin">Faculty Admin Account</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
                <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '13px', marginTop: '8px', fontSize: '1rem', background: formData.role === 'admin' ? 'var(--accent-secondary)' : 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
            >
              {loading ? 'Creating Profile...' : (formData.role === 'admin' ? 'Create Faculty Admin Profile' : 'Create Student Profile')} <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '24px' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
