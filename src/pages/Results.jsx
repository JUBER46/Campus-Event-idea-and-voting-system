import React, { useState, useEffect } from 'react';
import { Trophy, Award, Calendar, ThumbsUp, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { api } from '../services/api';
import Loading from '../components/Loading';

export const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await api.getResults();
      setResults(data);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto 80px', padding: '0 24px' }} className="animate-slide-up">
      {/* Winners Hero Header */}
      <div style={{
        padding: '40px 32px',
        marginBottom: '32px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--bg-secondary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <Trophy style={{ width: '28px', height: '28px', color: 'var(--accent-primary)' }} />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
          Official Campus Event Winners
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
          Winning student event proposals officially selected by faculty administration following campus-wide upvoting!
        </p>
      </div>

      {loading ? (
        <Loading label="Fetching published event results..." />
      ) : results.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
          <Sparkles style={{ width: '40px', height: '40px', color: 'var(--accent-primary)', margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Voting in Progress</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
            Voting is currently active! Once administrators conclude the voting sprint, winning events will be posted here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {results.map((res, idx) => (
            <div key={res.resultId || idx} style={{
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <span className="badge badge-winner" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                  <Award style={{ width: '14px', height: '14px' }} /> Official Winning Selection
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Published: {new Date(res.selectedAt || Date.now()).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
                {res.title}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', margin: '0 0 24px 0' }}>
                {res.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>Pitch by: <strong style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{res.creatorName || 'Student'}</strong></span>
                  <span>•</span>
                  <span className="badge badge-category" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>{res.category || 'General'}</span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--accent-primary)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  border: '1px solid var(--border-color)'
                }}>
                  <Heart style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
                  <span>{res.voteCount || 0} Student Upvotes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
