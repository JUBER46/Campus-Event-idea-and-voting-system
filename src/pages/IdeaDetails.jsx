import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ShieldCheck, Trophy, Check, X, Trash2 } from 'lucide-react';
import VoteButton from '../components/VoteButton';
import CommentBox from '../components/CommentBox';
import Loading from '../components/Loading';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const IdeaDetails = () => {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAdmin, token } = useAuth();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdea();
  }, [ideaId]);

  const fetchIdea = async () => {
    setLoading(true);
    try {
      const data = await api.getIdeaById(ideaId);
      setIdea(data);
    } catch (err) {
      setError(err.message || 'Idea not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAction = async (action) => {
    try {
      if (action === 'approve') {
        await api.approveIdea(ideaId, token);
      } else if (action === 'reject') {
        await api.rejectIdea(ideaId, token);
      }
      fetchIdea();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event idea?')) return;
    try {
      await api.deleteIdea(ideaId, token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Loading label="Loading event idea details..." />;
  if (error || !idea) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{error || 'Idea Not Found'}</h3>
        <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Student Portal</Link>
      </div>
    );
  }

  const id = idea.id || idea.ideaId;
  const voteCount = idea.vote_count !== undefined ? idea.vote_count : (idea.voteCount || 0);
  const creatorName = idea.created_by_name || idea.creatorName || 'Student Pitcher';
  const isOwner = currentUser && (currentUser.userId === idea.created_by || currentUser.userId === idea.createdBy);

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto 80px', padding: '0 24px' }} className="animate-slide-up">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary"
        style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.88rem' }}
      >
        <ArrowLeft style={{ width: '16px', height: '16px' }} /> Back
      </button>

      {/* Main Idea Card Header */}
      <div style={{ padding: '32px', background: 'var(--bg-card)', marginBottom: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <span className="badge badge-category" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
            {idea.category || 'General'}
          </span>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {idea.status === 'approved' && <span className="badge badge-approved"><ShieldCheck style={{ width: '14px', height: '14px' }} /> Approved</span>}
            {idea.status === 'pending' && <span className="badge badge-pending">Pending Review</span>}
            {idea.status === 'rejected' && <span className="badge badge-rejected">Rejected</span>}
            {idea.status === 'winner' && <span className="badge badge-winner"><Trophy style={{ width: '14px', height: '14px' }} /> Winner</span>}
          </div>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.3', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
          {idea.title}
        </h1>

        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
              border: '1px solid var(--border-color)'
            }}>
              {creatorName.charAt(0)}
            </div>
            <span>Proposed by <strong style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{creatorName}</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar style={{ width: '16px', height: '16px' }} />
            <span>{new Date(idea.created_at || idea.createdAt || Date.now()).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0', fontWeight: '600' }}>
            Event Proposal Details
          </h4>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-primary)', whiteSpace: 'pre-line', margin: 0 }}>
            {idea.description}
          </p>
        </div>

        {/* Voting & Action Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <VoteButton ideaId={id} currentVotes={voteCount} status={idea.status} />

          {/* Admin Controls */}
          {isAdmin && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {idea.status === 'pending' && (
                <>
                  <button onClick={() => handleAdminAction('approve')} className="btn btn-success" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <Check style={{ width: '16px', height: '16px' }} /> Approve Idea
                  </button>
                  <button onClick={() => handleAdminAction('reject')} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <X style={{ width: '16px', height: '16px' }} /> Reject Idea
                  </button>
                </>
              )}
            </div>
          )}

          {(isOwner || isAdmin) && (
            <button onClick={handleDelete} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <Trash2 style={{ width: '16px', height: '16px' }} /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Embedded Comments & Discussion */}
      <CommentBox ideaId={id} />
    </div>
  );
};

export default IdeaDetails;
