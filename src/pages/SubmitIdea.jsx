import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Send, ArrowLeft, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const SubmitIdea = () => {
  const { token, currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technical');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please sign in to submit event ideas.');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.createIdea({
        title,
        category,
        description
      }, token);

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1800);
    } catch (err) {
      setError(err.message || 'Failed to submit event idea');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto 80px', padding: '0 24px' }} className="responsive-container animate-slide-up">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary"
        style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.88rem' }}
      >
        <ArrowLeft style={{ width: '16px', height: '16px' }} /> Back
      </button>

      <div className="responsive-grid-split" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px'
      }}>
        {/* Left Side: Submission Form */}
        <div style={{ padding: '40px 36px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-primary)'
            }}>
              <Lightbulb style={{ width: '28px', height: '28px' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Submit Event Proposal</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', margin: 0 }}>
                Pitch your concept to the student body and faculty committee.
              </p>
            </div>
          </div>

          {success ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--success-color)',
              borderRadius: 'var(--radius-md)'
            }}>
              <CheckCircle2 style={{ width: '48px', height: '48px', color: 'var(--success-color)', margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--success-color)', fontWeight: '600', margin: '0 0 8px 0' }}>
                Proposal Submitted Successfully!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                Status set to <strong>Pending Admin Review</strong>. Redirecting to student portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  color: '#ef4444',
                  marginBottom: '20px',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Event Proposal Title</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  placeholder="e.g. AI & Robotics Hackathon 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Event Category</label>
                <select
                  className="form-select"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Technical">Technical (Hackathons, AI Jam, Robotics)</option>
                  <option value="Cultural">Cultural (Music Fest, Open Mic, Dance)</option>
                  <option value="Sports">Sports & E-Sports (Valorant, Football)</option>
                  <option value="Workshop">Workshop & Career Teardown</option>
                  <option value="Entrepreneurship">Entrepreneurship & Startup Pitch</option>
                  <option value="Social">Social & Community Drive</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Detailed Event Concept & Description</label>
                <textarea
                  className="form-textarea"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
                  rows="6"
                  placeholder="Describe your event goals, target audience, schedule, required venue, and expected outcomes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                marginTop: '24px',
                marginBottom: '24px',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5'
              }}>
                <span style={{ color: 'var(--accent-primary)', marginRight: '6px' }}>💡</span>
                <strong>Review Notice:</strong> Submissions are verified by faculty admins to ensure campus policy compliance before public upvoting opens.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '1rem', justifyContent: 'center' }}
              >
                {loading ? 'Submitting Proposal...' : 'Submit Proposal for Moderation'}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Live Card Preview */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-secondary)',
            color: 'var(--accent-primary)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <Sparkles style={{ width: '15px', height: '15px' }} /> Live Card Preview
          </div>

          <div style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-primary)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-category">{category || 'Category'}</span>
              <span className="badge badge-pending">Pending Review</span>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              {title || 'Your Event Title Will Appear Here'}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', wordBreak: 'break-word' }}>
              {description || 'As you type your detailed description in the form, a live preview will update here in real time...'}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              <div>
                Pitch by <strong style={{ color: 'var(--text-primary)' }}>{currentUser ? currentUser.name : 'Student Pitcher'}</strong>
              </div>
              <span className="badge badge-approved">0 Upvotes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdea;
