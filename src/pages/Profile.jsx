import React, { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, Calendar, ShieldCheck, ThumbsUp, Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import IdeaCard from '../components/IdeaCard';

export const Profile = () => {
  const { currentUser, isAdmin } = useAuth();
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchUserIdeas();
    }
  }, [currentUser]);

  const fetchUserIdeas = async () => {
    try {
      const allIdeas = await api.getIdeas('All');
      const userIdeas = allIdeas.filter(i => i.createdBy === currentUser.userId);
      setMyIdeas(userIdeas);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div style={{ maxWidth: '500px', margin: '60px auto', textAlign: 'center', color: 'var(--text-primary)' }}>
        <h3>Please log in to view your profile.</h3>
      </div>
    );
  }

  const totalVotesEarned = myIdeas.reduce((sum, idea) => sum + (idea.voteCount || 0), 0);

  return (
    <div style={{ maxWidth: '960px', margin: '20px auto 60px', padding: '0 20px' }} className="animate-fade-in">
      {/* Profile Card Header */}
      <div style={{ background: 'var(--bg-card)', padding: '36px', marginBottom: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--accent-primary)'
          }}>
            {currentUser.name ? currentUser.name.charAt(0) : 'U'}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{currentUser.name}</h2>
              <span className={`badge ${isAdmin ? 'badge-winner' : 'badge-category'}`}>
                {currentUser.role}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
                <span>{currentUser.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GraduationCap style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
                <span>{currentUser.department} ({currentUser.year})</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '14px 20px', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '100px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-primary)', display: 'block' }}>{myIdeas.length}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Ideas Submitted</span>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '14px 20px', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '100px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--success-color)', display: 'block' }}>{totalVotesEarned}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Ideas Section */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
        <Lightbulb style={{ color: 'var(--accent-primary)', width: '22px', height: '22px' }} />
        My Event Idea Submissions ({myIdeas.length})
      </h3>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading submissions...</p>
      ) : myIdeas.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
          <p>You haven't submitted any event ideas yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {myIdeas.map(idea => (
            <IdeaCard key={idea.ideaId} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
