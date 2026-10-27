import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  Vote,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Users,
  Lightbulb,
  Flame,
  Code,
  Music,
  Gamepad2,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Heart,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser, votedIdeaIds, addVotedIdea, token } = useAuth();
  const [featuredIdeas, setFeaturedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingMap, setVotingMap] = useState({});

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      const data = await api.getIdeas('approved');
      setFeaturedIdeas(data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching landing page ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (e, ideaId) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (votedIdeaIds.includes(ideaId) || votingMap[ideaId]) return;

    setVotingMap(prev => ({ ...prev, [ideaId]: true }));
    try {
      await api.voteIdea(ideaId, token);
      addVotedIdea(ideaId);
      setFeaturedIdeas(prev =>
        prev.map(item => item.id === ideaId ? { ...item, vote_count: item.vote_count + 1 } : item)
      );
    } catch (err) {
      alert(err.message || 'Voting failed');
    } finally {
      setVotingMap(prev => ({ ...prev, [ideaId]: false }));
    }
  };

  const categories = [
    {
      title: 'Tech & Hackathons',
      icon: Code,
      count: '14 Active',
      color: 'var(--accent-primary)',
      desc: '24-hour coding jams, AI workshops, and robot wars.'
    },
    {
      title: 'Cultural Fests & Concerts',
      icon: Music,
      count: '18 Active',
      color: 'var(--accent-secondary)',
      desc: 'Battle of the bands, dance showcases, and open mic nights.'
    },
    {
      title: 'E-Sports & Tournaments',
      icon: Gamepad2,
      count: '11 Active',
      color: 'var(--accent-tertiary)',
      desc: 'Valorant, FIFA, and LAN party tournaments with cash prizes.'
    },
    {
      title: 'Workshops & Career',
      icon: GraduationCap,
      count: '9 Active',
      color: 'var(--success-color)',
      desc: 'Resume teardowns, alumni panels, and resume bootcamps.'
    }
  ];

  return (
    <div style={{ paddingBottom: '60px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: '1240px',
        margin: '20px auto',
        padding: '60px 24px 40px 24px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'center',
        background: 'var(--bg-primary)'
      }} className="hero-grid-split">
        <div className="animate-slide-up">
          {/* Floating Pill Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '30px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: 'var(--accent-primary)' }} />
            <span>Next-Gen Student Voice & Event Platform</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: '800',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            Transform Campus Ideas into <br />
            <span style={{ color: 'var(--accent-primary)' }}>Unforgettable Events</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            marginBottom: '32px',
            maxWidth: '560px'
          }}>
            Pitch your event concepts, vote on fellow students’ proposals, and collaborate with faculty admins to turn top-voted ideas into real funded campus events!
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '8px' }}>
              Get Started <ArrowRight style={{ width: '20px', height: '20px' }} />
            </Link>

            <Link to="/login" className="btn btn-secondary" style={{ padding: '14px 24px', fontSize: '1.05rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <UserCheck style={{ width: '20px', height: '20px', color: 'var(--accent-primary)' }} /> Student Login
            </Link>

            <Link to="/admin/login" className="btn btn-secondary" style={{ padding: '14px 20px', fontSize: '0.95rem', borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'transparent', borderRadius: '8px' }}>
              <ShieldCheck style={{ width: '18px', height: '18px' }} /> Admin Portal
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
            fontWeight: '600'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px', color: 'var(--success-color)' }} /> Student Council Verified
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px', color: 'var(--success-color)' }} /> Real-time Voting
            </span>
          </div>
        </div>

        {/* Hero Clean Card */}
        <div style={{ position: 'relative' }}>
          {/* Card 1 - Main Clean Idea */}
          <div style={{
            padding: '26px',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.8rem', padding: '6px 14px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '20px', fontWeight: '600' }}>
                🔥 #1 Trending Event Proposal
              </span>
              <span style={{ fontSize: '0.8rem', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '20px', fontWeight: '600' }}>Approved for Voting</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '700', marginBottom: '10px', color: 'var(--text-primary)' }}>
              24-Hour Campus Hackathon & AI Sprint
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
              An overnight coding jam with free pizza, mentorship from industry devs, and $5,000 in prize pools for top AI projects.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}>
                  AR
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Alex Rivera</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Computer Science • 3rd Year</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--accent-primary)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '0.92rem'
              }}>
                <Vote style={{ width: '18px', height: '18px' }} />
                <span>142 Votes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Banner - Clean Grid */}
      <section style={{
        maxWidth: '1240px',
        margin: '40px auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          textAlign: 'center'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
              50+
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Campus Events Hosted</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '800', color: 'var(--accent-secondary)' }}>
              1,450+
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Student Upvotes Cast</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '800', color: 'var(--success-color)' }}>
              120+
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Ideas Proposed</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '800', color: 'var(--accent-tertiary)' }}>
              $25,000+
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Event Funding Approved</div>
          </div>
        </div>
      </section>

      {/* Animated Event Categories Grid */}
      <section style={{ maxWidth: '1240px', margin: '60px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Diverse Event Categories</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '8px' }}>
            What kind of event will <span style={{ color: 'var(--accent-primary)' }}>you pitch?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px' }}>
            Select a category to filter live ideas or start crafting your proposal.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} style={{
                padding: '28px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }} onClick={() => navigate('/dashboard')}>
                <div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    marginBottom: '20px'
                  }}>
                    <IconComp style={{ width: '26px', height: '26px' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {cat.desc}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  color: 'var(--accent-primary)',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}>
                  <span>{cat.count}</span>
                  <ChevronRight style={{ width: '18px', height: '18px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '70px 24px',
        margin: '60px 0'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Simple 4-Step Process</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '8px' }}>
              How Campus Event Voting Works
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary)', color: '#fff',
                fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>1</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>1. Pitch Your Idea</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Fill out the idea submission form with title, description, category, and target budget.
              </p>
            </div>

            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-secondary)', color: '#fff',
                fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>2</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>2. Admin Moderation</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Faculty and student admins verify venue availability, safety, and budget feasibility.
              </p>
            </div>

            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-tertiary)', color: '#fff',
                fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>3</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>3. Student Voting</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Students review approved proposals and upvote their favorite event concepts online.
              </p>
            </div>

            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--success-color)', color: '#fff',
                fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>4</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>4. Event Execution</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Top voted winners get officially funded and hosted on campus!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trending Ideas Showcase */}
      <section style={{ maxWidth: '1240px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--success-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Community Feed</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '8px' }}>
              Featured Student Proposals
            </h2>
          </div>
          <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '10px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            View All Ideas ({featuredIdeas.length}) <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading top proposals...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {featuredIdeas.map(idea => {
              const isVoted = votedIdeaIds.includes(idea.id);
              return (
                <div key={idea.id} style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 10px', borderRadius: '12px' }}>{idea.category}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '4px 10px', borderRadius: '12px' }}>{idea.status}</span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                      {idea.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {idea.description}
                    </p>
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        By <strong style={{ color: 'var(--text-primary)' }}>{idea.created_by_name || 'Student'}</strong>
                      </div>

                      <button
                        onClick={(e) => handleVote(e, idea.id)}
                        disabled={isVoted || votingMap[idea.id]}
                        style={{
                          padding: '6px 14px',
                          fontSize: '0.85rem',
                          background: isVoted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-primary)',
                          color: isVoted ? 'var(--success-color)' : 'var(--text-primary)',
                          border: isVoted ? '1px solid var(--success-color)' : '1px solid var(--border-color)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: (isVoted || votingMap[idea.id]) ? 'default' : 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        <Heart style={{ width: '14px', height: '14px', fill: isVoted ? 'var(--success-color)' : 'none', color: isVoted ? 'var(--success-color)' : 'currentColor' }} />
                        <span>{idea.vote_count} Upvotes</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* High-Impact CTA Banner */}
      <section style={{ maxWidth: '1240px', margin: '60px auto 20px auto', padding: '0 24px' }}>
        <div style={{
          background: 'var(--accent-primary)',
          borderRadius: '24px',
          padding: '50px 40px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800', marginBottom: '14px' }}>
            Have a Great Idea for Next Semester’s Fest?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 28px auto' }}>
            Don't let your ideas stay in group chats. Submit your proposal today and gather campus votes!
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/submit" style={{ padding: '12px 28px', color: 'var(--text-primary)', fontWeight: '600', background: 'var(--bg-card)', borderRadius: '8px', textDecoration: 'none' }}>
              Submit Your Event Concept
            </Link>
            <Link to="/register" style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.2)', color: '#fff', fontWeight: '600', borderRadius: '8px', textDecoration: 'none' }}>
              Create Student Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
