import React, { useState, useEffect } from 'react';
import { Send, Trash2, MessageSquare, User, Loader2, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const CommentBox = ({ ideaId }) => {
  const { currentUser, token, isAdmin } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadComments();
  }, [ideaId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await api.getComments(ideaId);
      setComments(data);
    } catch (err) {
      console.error(err);
      setError('Could not load discussion comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!currentUser) {
      alert('Please log in to participate in the discussion!');
      return;
    }

    setSubmitting(true);
    try {
      const created = await api.addComment(ideaId, newComment.trim(), token);
      setComments(prev => [created, ...prev]);
      setNewComment('');
    } catch (err) {
      alert(err.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      await api.deleteComment(commentId, token);
      setComments(prev => prev.filter(c => (c.comment_id || c.commentId) !== commentId));
    } catch (err) {
      alert(err.message || 'Failed to delete comment');
    }
  };

  return (
    <div style={{ 
      padding: '32px', 
      background: 'var(--bg-card)', 
      borderRadius: 'var(--radius-lg)', 
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          padding: '8px',
          background: 'var(--accent-primary-light)',
          borderRadius: 'var(--radius-md)',
          display: 'flex'
        }}>
          <MessageSquare style={{ color: 'var(--accent-primary)', width: '20px', height: '20px' }} />
        </div>
        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          Community Discussion <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1rem' }}>({comments.length})</span>
        </h4>
      </div>

      {/* Add Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <textarea
              rows="3"
              placeholder="Share your thoughts, suggestions, or ask questions about this proposal..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
                resize: 'vertical',
                outline: 'none',
                minHeight: '100px',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                fontSize: '0.9375rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                cursor: (submitting || !newComment.trim()) ? 'not-allowed' : 'pointer',
                opacity: (submitting || !newComment.trim()) ? 0.7 : 1,
                transition: 'all var(--transition-fast)'
              }}
            >
              {submitting ? <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} /> : <Send style={{ width: '18px', height: '18px' }} />}
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          marginBottom: '32px',
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
          textAlign: 'center'
        }}>
          Please log in to join the campus discussion.
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <Loader2 style={{ color: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : comments.length === 0 ? (
        <div style={{ 
          padding: '40px 20px', 
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-color)'
        }}>
          <MessageSquare style={{ width: '32px', height: '32px', color: 'var(--text-muted)', margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
            No comments yet. Be the first student to start the conversation!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {comments.map((c) => {
            const commentId = c.comment_id || c.commentId;
            const userName = c.user_name || c.userName || 'Student';
            const userId = c.user_id || c.userId;
            const created = c.created_at || c.createdAt;
            const isAuthor = currentUser && currentUser.userId === userId;
            const isAdminComment = userId === 'usr_admin123';
            
            return (
              <div
                key={commentId}
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isAdminComment ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '700'
                    }}>
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                          {userName}
                        </span>
                        {isAdminComment && (
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            background: 'var(--accent-primary-light)', 
                            color: 'var(--accent-primary)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            <Shield style={{ width: '12px', height: '12px' }} />
                            Admin
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        {created ? new Date(created).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                      </span>
                    </div>
                  </div>

                  {(isAuthor || isAdmin) && (
                    <button
                      onClick={() => handleDelete(commentId)}
                      style={{ 
                        background: 'none', 
                        color: 'var(--text-muted)', 
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'color var(--transition-fast), background var(--transition-fast)'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-danger)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
                      title="Delete Comment"
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  )}
                </div>

                <p style={{ 
                  fontSize: '0.9375rem', 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.6',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {c.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
