import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Award, CheckCircle2, ArrowLeft, ThumbsUp, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Loading from '../../components/Loading';

export const ResultsManagement = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [approvedIdeas, setApprovedIdeas] = useState([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState('');
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchApproved();
  }, []);

  const fetchApproved = async () => {
    try {
      const data = await api.getIdeas('approved');
      setApprovedIdeas(data);
      if (data.length > 0) {
        setSelectedIdeaId(data[0].id || data[0].ideaId);
      }
    } catch (err) {
      console.error('Error fetching approved ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!selectedIdeaId) return;

    const selectedIdea = approvedIdeas.find(i => (i.id || i.ideaId) === selectedIdeaId);
    if (!selectedIdea) return;

    if (!confirm(`Declare "${selectedIdea.title}" as the official winning campus event?`)) return;

    setPublishing(true);
    try {
      await api.publishResult(selectedIdea.id || selectedIdea.ideaId, selectedIdea.title, token);
      setSuccess(true);
      setTimeout(() => {
        navigate('/results');
      }, 1800);
    } catch (err) {
      alert(err.message || 'Failed to publish result');
      setPublishing(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto 80px', padding: '0 24px' }} className="animate-slide-up">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '32px', padding: '10px 18px', fontSize: '0.9rem', color: 'var(--text-primary)', borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}>
        <ArrowLeft style={{ width: '18px', height: '18px' }} /> Back to Admin Control
      </button>

      <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
          <div style={{
            background: 'var(--accent-secondary)',
            padding: '16px',
            borderRadius: '16px',
            color: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Trophy style={{ width: '32px', height: '32px' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>Publish Final Event Winner</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Select top community-voted event proposal for official campus execution.
            </p>
          </div>
        </div>

        {loading ? (
          <Loading label="Loading approved candidates..." />
        ) : success ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            background: 'rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <CheckCircle2 style={{ width: '64px', height: '64px', color: '#34d399', margin: '0 auto 20px auto' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#34d399', fontWeight: '700', marginBottom: '10px' }}>
              Winning Event Published!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Redirecting to public Results showcase...
            </p>
          </div>
        ) : approvedIdeas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '1rem' }}>No approved event proposals are currently available to nominate as winner.</p>
          </div>
        ) : (
          <form onSubmit={handlePublish}>
            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>Select Candidate Event Proposal</label>
              <select
                className="form-select"
                value={selectedIdeaId}
                onChange={(e) => setSelectedIdeaId(e.target.value)}
                style={{ width: '100%', fontSize: '1rem', padding: '14px 16px', fontWeight: '500', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
              >
                {approvedIdeas.map(idea => {
                  const id = idea.id || idea.ideaId;
                  const votes = idea.vote_count !== undefined ? idea.vote_count : (idea.voteCount || 0);
                  return (
                    <option key={id} value={id}>
                      {idea.title} — ({votes} Upvotes | {idea.category})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Candidate preview card */}
            {selectedIdeaId && (() => {
              const preview = approvedIdeas.find(i => (i.id || i.ideaId) === selectedIdeaId);
              if (!preview) return null;
              const votes = preview.vote_count !== undefined ? preview.vote_count : (preview.voteCount || 0);
              return (
                <div style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '32px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="badge badge-category" style={{ padding: '6px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '500' }}>{preview.category}</span>
                    <span style={{ color: 'var(--accent-secondary)', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                      <ThumbsUp style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                      {votes} Upvotes Received
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
                    {preview.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                    {preview.description}
                  </p>
                </div>
              );
            })()}

            <button
              type="submit"
              disabled={publishing}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.05rem',
                fontWeight: '600',
                background: 'var(--accent-secondary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              {publishing ? 'Publishing Announcement...' : 'Declare Official Winner Event'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResultsManagement;
