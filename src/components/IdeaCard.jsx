import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, MessageSquare, ShieldCheck, Check, X, Trophy, Trash2 } from 'lucide-react';
import VoteButton from './VoteButton';
import { useAuth } from '../context/AuthContext';

export const IdeaCard = ({ idea, onStatusChange, onDelete }) => {
  const { currentUser, isAdmin } = useAuth();
  const ideaId = idea.id || idea.ideaId;
  const voteCount = idea.vote_count !== undefined ? idea.vote_count : (idea.voteCount || 0);
  const creatorName = idea.created_by_name || idea.creatorName || 'Student Pitcher';
  const isOwner = currentUser && (currentUser.userId === idea.created_by || currentUser.userId === idea.createdBy);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge badge-approved" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck style={{ width: '14px', height: '14px' }} /> Approved</span>;
      case 'pending':
        return <span className="badge badge-pending">Pending Review</span>;
      case 'rejected':
        return <span className="badge badge-rejected">Rejected</span>;
      case 'winner':
        return <span className="badge badge-winner" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Trophy style={{ width: '14px', height: '14px' }} /> Winner Selected</span>;
      default:
        return <span className="badge badge-pending">{status}</span>;
    }
  };

  const formattedDate = (idea.created_at || idea.createdAt)
    ? new Date(idea.created_at || idea.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : 'Recently';

  return (
    <div style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'box-shadow var(--transition-fast), transform var(--transition-fast)',
      borderLeft: idea.status === 'winner'
        ? '6px solid var(--accent-primary)'
        : idea.status === 'approved'
          ? '6px solid var(--accent-success)'
          : idea.status === 'pending'
            ? '6px solid var(--accent-warning)'
            : '6px solid var(--border-color)'
    }}>
      {/* Top Tag & Status Row */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span className="badge badge-category" style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {idea.category || 'General'}
          </span>
          {getStatusBadge(idea.status)}
        </div>

        <Link to={`/ideas/${ideaId}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            lineHeight: '1.4',
            marginBottom: '12px',
            color: 'var(--text-primary)',
            transition: 'color var(--transition-fast)'
          }}>
            {idea.title}
          </h3>
        </Link>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
          lineHeight: '1.6',
          marginBottom: '24px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {idea.description}
        </p>
      </div>

      {/* Author & Actions Footer */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent-primary-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              {creatorName.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{creatorName}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar style={{ width: '14px', height: '14px' }} />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Voting Button & Detail Link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <VoteButton ideaId={ideaId} currentVotes={voteCount} status={idea.status} />

            <Link
              to={`/ideas/${ideaId}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'background var(--transition-fast)'
              }}
            >
              <MessageSquare style={{ width: '16px', height: '16px' }} />
              <span>Details</span>
            </Link>
          </div>

          {/* Admin Fast Actions */}
          {isAdmin && idea.status === 'pending' && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onStatusChange && onStatusChange(ideaId, 'approve')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-success)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title="Approve Idea"
              >
                <Check style={{ width: '14px', height: '14px' }} /> Approve
              </button>
              <button
                onClick={() => onStatusChange && onStatusChange(ideaId, 'reject')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-danger)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title="Reject Idea"
              >
                <X style={{ width: '14px', height: '14px' }} /> Reject
              </button>
            </div>
          )}

          {/* Delete Action */}
          {(isOwner || isAdmin) && onDelete && (
            <button
              onClick={() => onDelete(ideaId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                color: 'var(--accent-danger)',
                border: '1px solid transparent',
                cursor: 'pointer',
                transition: 'background var(--transition-fast)'
              }}
              title="Delete Idea"
            >
              <Trash2 style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
