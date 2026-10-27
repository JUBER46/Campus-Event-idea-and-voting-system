import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, X, Trash2, ArrowLeft, Filter, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import IdeaCard from '../../components/IdeaCard';
import Loading from '../../components/Loading';

export const ManageIdeas = () => {
  const { token } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('pending');

  useEffect(() => {
    fetchAdminIdeas();
  }, []);

  const fetchAdminIdeas = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminIdeas(token);
      setIdeas(data);
    } catch (err) {
      console.error('Error fetching admin ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ideaId, action) => {
    try {
      if (action === 'approve') {
        await api.approveIdea(ideaId, token);
      } else if (action === 'reject') {
        await api.rejectIdea(ideaId, token);
      }
      fetchAdminIdeas();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (ideaId) => {
    if (!confirm('Are you sure you want to delete this proposal submission?')) return;
    try {
      await api.deleteIdea(ideaId, token);
      setIdeas(ideas.filter(i => (i.id || i.ideaId) !== ideaId));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    if (filterStatus === 'All') return true;
    return idea.status === filterStatus;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '30px auto 80px', padding: '0 24px' }} className="animate-slide-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
        <button onClick={() => window.history.back()} className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '0.9rem', color: 'var(--text-primary)', borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}>
          <ArrowLeft style={{ width: '18px', height: '18px' }} /> Back to Dashboard
        </button>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>Proposal Moderation Queue</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Review, approve, or reject student event proposals.
          </p>
        </div>
      </div>

      {/* Filter Pills Header */}
      <div style={{ padding: '16px 20px', marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        {['pending', 'approved', 'rejected', 'winner', 'All'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className="btn"
            style={{
              padding: '8px 20px',
              fontSize: '0.9rem',
              borderRadius: '24px',
              textTransform: 'capitalize',
              background: filterStatus === st ? 'var(--accent-secondary)' : 'var(--bg-primary)',
              color: filterStatus === st ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: filterStatus === st ? '1px solid var(--accent-secondary)' : '1px solid var(--border-color)',
              fontWeight: filterStatus === st ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {st === 'pending' ? '⏳ Pending Moderation' : st}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading label="Loading submissions for moderation..." />
      ) : filteredIdeas.length === 0 ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>No submissions found for status "{filterStatus}"</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Select another status tab to inspect other proposals.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {filteredIdeas.map(idea => (
            <IdeaCard
              key={idea.id || idea.ideaId}
              idea={idea}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageIdeas;
