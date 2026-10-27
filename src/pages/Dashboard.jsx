import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, PlusCircle, Search, ThumbsUp, ShieldCheck, Flame, Trophy, Filter, Lightbulb, Vote, CheckCircle } from 'lucide-react';
import IdeaCard from '../components/IdeaCard';
import Loading from '../components/Loading';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { currentUser, isAdmin, token, votedIdeaIds } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('approved');

  useEffect(() => {
    fetchIdeas();
  }, [selectedStatus, selectedCategory]);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const data = await api.getIdeas(
        selectedStatus === 'All' ? '' : selectedStatus,
        selectedCategory === 'All' ? '' : selectedCategory
      );
      setIdeas(data);
    } catch (err) {
      console.error('Error fetching ideas:', err);
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
      fetchIdeas();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (ideaId) => {
    if (!confirm('Are you sure you want to delete this event proposal?')) return;
    try {
      await api.deleteIdea(ideaId, token);
      setIdeas(ideas.filter(i => (i.id || i.ideaId) !== ideaId));
    } catch (err) {
      alert(err.message);
    }
  };

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop', 'Entrepreneurship', 'Social'];

  const filteredIdeas = ideas.filter(idea => {
    const titleMatch = idea.title ? idea.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const descMatch = idea.description ? idea.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return titleMatch || descMatch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 80px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Student Welcome Header Card */}
      <div style={{
        padding: '36px 36px',
        marginBottom: '32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--success-color)',
            padding: '6px 14px',
            borderRadius: '30px',
            fontSize: '0.82rem',
            fontWeight: '600',
            marginBottom: '14px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <Sparkles style={{ width: '15px', height: '15px' }} />
            <span>Student Innovation Hub</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', fontWeight: '800', lineHeight: '1.2', color: 'var(--text-primary)' }}>
            Welcome, <span style={{ color: 'var(--accent-primary)' }}>{currentUser ? currentUser.name : 'Campus Explorer'}!</span>
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', marginTop: '8px', maxWidth: '640px', lineHeight: '1.6' }}>
            Discover and upvote campus event proposals for the upcoming semester. Submit your own concept to secure student council funding!
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ padding: '16px 22px', textAlign: 'center', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{ideas.length}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Active Proposals</div>
          </div>

          <div style={{ padding: '16px 22px', textAlign: 'center', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--success-color)' }}>{votedIdeaIds.length}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>My Upvotes</div>
          </div>

          <Link to="/submit" style={{ padding: '14px 24px', fontSize: '0.95rem', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', textDecoration: 'none' }}>
            <PlusCircle style={{ width: '18px', height: '18px' }} />
            Submit Idea
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        padding: '20px 24px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-card)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 16px',
                fontSize: '0.85rem',
                borderRadius: '30px',
                background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-primary)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--border-color)',
                fontWeight: selectedCategory === cat ? '600' : '500',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ width: 'auto', minWidth: '190px', padding: '9px 14px', fontSize: '0.88rem', fontWeight: '500', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
          >
            <option value="approved">Approved (Live Voting)</option>
            <option value="pending">Pending Admin Review</option>
            <option value="winner">Winning Events</option>
            <option value="All">All Proposals</option>
          </select>

          <div style={{ position: 'relative', width: '240px' }}>
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '9px 12px 9px 38px', fontSize: '0.88rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
            />
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      {loading ? (
        <Loading label="Loading campus event ideas..." />
      ) : filteredIdeas.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <Lightbulb style={{ width: '48px', height: '48px', color: 'var(--text-secondary)', margin: '0 auto 16px auto', opacity: 0.5 }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>No Event Proposals Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.95rem' }}>
            No proposals match your current filters. Pitch a new event idea to get the campus talking!
          </p>
          <Link to="/submit" style={{ marginTop: '24px', padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', fontWeight: '600' }}>
            Submit First Proposal
          </Link>
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

export default Dashboard;
