import React, { useState } from 'react';
import { ThumbsUp, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const VoteButton = ({ ideaId, currentVotes, status, onVoteSuccess }) => {
  const { token, votedIdeaIds, addVotedIdea, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState(currentVotes);
  const [errorMsg, setErrorMsg] = useState('');

  const hasVoted = votedIdeaIds.includes(ideaId);
  const isApproved = status === 'approved' || status === 'winner';

  const handleVote = async (e) => {
    e.stopPropagation();
    if (!currentUser) {
      alert('Please log in to vote!');
      return;
    }

    if (hasVoted) {
      alert('You have already voted for this event idea.');
      return;
    }

    if (!isApproved) {
      alert('Only approved ideas can be voted on.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.voteIdea(ideaId, token);
      setVotes(res.newVoteCount);
      addVotedIdea(ideaId);
      if (onVoteSuccess) onVoteSuccess(res.newVoteCount);
    } catch (err) {
      setErrorMsg(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={hasVoted || !isApproved || loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        fontSize: '0.875rem',
        fontWeight: '600',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        transition: 'all var(--transition-fast)',
        cursor: (hasVoted || !isApproved) ? 'not-allowed' : 'pointer',
        background: hasVoted ? 'var(--accent-success)' : (!isApproved ? 'var(--bg-secondary)' : 'var(--accent-primary)'),
        color: (!isApproved && !hasVoted) ? 'var(--text-muted)' : '#ffffff',
        opacity: loading ? 0.7 : 1,
        boxShadow: hasVoted ? 'none' : 'var(--shadow-sm)',
      }}
      title={hasVoted ? 'You have voted for this idea' : (!isApproved ? 'Awaiting Admin Approval' : 'Vote for this idea')}
    >
      {loading ? (
        <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
      ) : hasVoted ? (
        <CheckCircle style={{ width: '18px', height: '18px' }} />
      ) : (
        <ThumbsUp style={{ width: '18px', height: '18px' }} />
      )}
      <span>{hasVoted ? 'Voted' : 'Vote'}</span>
      <span
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8125rem',
          marginLeft: '4px'
        }}
      >
        {votes}
      </span>
    </button>
  );
};

export default VoteButton;
