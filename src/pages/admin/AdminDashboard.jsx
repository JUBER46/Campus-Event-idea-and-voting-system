import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Lightbulb, ThumbsUp, Clock, CheckCircle, Trophy, BarChart3, Download, Sparkles, ArrowRight, Eye, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Loading from '../../components/Loading';

export const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, ideasData] = await Promise.all([
        api.getAdminStats(token),
        api.getAdminIdeas(token)
      ]);
      setStats(statsData);
      setIdeas(ideasData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (ideas.length === 0) return;
    const headers = ["Idea ID", "Title", "Category", "Status", "Votes", "Creator", "Created Date"];
    const rows = ideas.map(i => [
      i.id || i.ideaId,
      `"${(i.title || '').replace(/"/g, '""')}"`,
      i.category || 'General',
      i.status || 'pending',
      i.vote_count || i.voteCount || 0,
      `"${i.created_by_name || i.creatorName || 'Student'}"`,
      new Date(i.created_at || i.createdAt || Date.now()).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `campus_event_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryCounts = ideas.reduce((acc, idea) => {
    const cat = idea.category || 'General';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const totalIdeasCount = ideas.length || 1;

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto 80px', padding: '0 24px' }} className="responsive-container animate-slide-up">
      {/* Admin Executive Header */}
      <div className="responsive-header" style={{
        padding: '36px',
        marginBottom: '32px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'var(--accent-secondary)',
            padding: '16px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck style={{ width: '36px', height: '36px', color: 'var(--bg-primary)' }} />
          </div>
          <div style={{ minWidth: '200px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-primary)',
              color: 'var(--accent-secondary)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: '700',
              marginBottom: '8px',
              border: '1px solid var(--border-color)'
            }}>
              Executive Controls Active
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', lineHeight: '1.2', color: 'var(--text-primary)', wordBreak: 'break-word' }}>
              Administrator & Faculty Portal
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Manage event proposals, approve/reject student submissions, track live upvotes & publish winners.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={handleExportCSV} className="btn btn-secondary" style={{ padding: '11px 18px', fontSize: '0.9rem' }}>
            <Download style={{ width: '16px', height: '16px' }} /> Export CSV
          </button>
          <Link to="/admin/manage" className="btn btn-primary" style={{ padding: '11px 20px', fontSize: '0.9rem', background: 'var(--accent-secondary)', color: 'var(--bg-primary)' }}>
            <Lightbulb style={{ width: '16px', height: '16px' }} /> Moderate Queue
          </Link>
          <Link to="/admin/publish" className="btn btn-secondary" style={{ padding: '11px 18px', fontSize: '0.9rem', color: 'var(--accent-secondary)', borderColor: 'var(--border-color)' }}>
            <Trophy style={{ width: '16px', height: '16px' }} /> Select Winner
          </Link>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
        <BarChart3 style={{ color: 'var(--accent-secondary)', width: '22px', height: '22px' }} />
        Live Event Metrics & System Stats
      </h3>

      {loading ? (
        <Loading label="Loading admin analytics..." />
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '36px'
          }}>
            <div style={{ padding: '26px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #818cf8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '600' }}>Registered Students</span>
                <Users style={{ width: '22px', height: '22px', color: '#818cf8' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{stats?.totalStudents || 0}</span>
            </div>

            <div style={{ padding: '26px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #fbbf24' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '600' }}>Pending Moderation</span>
                <Clock style={{ width: '22px', height: '22px', color: '#fbbf24' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{stats?.pendingIdeas || 0}</span>
            </div>

            <div style={{ padding: '26px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #34d399' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '600' }}>Approved Proposals</span>
                <CheckCircle style={{ width: '22px', height: '22px', color: '#34d399' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{stats?.approvedIdeas || 0}</span>
            </div>

            <div style={{ padding: '26px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #f472b6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '600' }}>Total Upvotes Cast</span>
                <ThumbsUp style={{ width: '22px', height: '22px', color: '#f472b6' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{stats?.totalVotes || 0}</span>
            </div>
          </div>

          {/* Category Distribution Breakdown Chart */}
          <div style={{ padding: '32px', marginBottom: '36px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Event Category Breakdown & Student Submissions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const pct = Math.round((count / totalIdeasCount) * 100);
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{cat}</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{count} proposals ({pct}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent-secondary)', borderRadius: '4px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Admin Action Cards Grid */}
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
            Moderation Queue & Approvals
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Inspect student proposals, verify budget requests, and grant approval to make them available for campus-wide voting.
          </p>
          <Link to="/admin/manage" className="btn btn-primary" style={{ background: 'var(--accent-secondary)', color: 'var(--bg-primary)' }}>
            Open Moderation Queue <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>

        <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
            Publish Official Winner
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Conclude voting rounds and declare winning event concepts for council funding and official scheduling.
          </p>
          <Link to="/admin/publish" className="btn btn-secondary" style={{ color: 'var(--accent-secondary)', borderColor: 'var(--border-color)' }}>
            Publish Winner Announcement <Trophy style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
