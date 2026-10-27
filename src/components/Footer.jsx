import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '48px 24px 24px',
      color: 'var(--text-primary)',
      transition: 'background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '48px'
      }}>
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--text-inverse)'
            }}>
              <Vote size={18} />
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>
              Campus Event Idea & Voting System
            </span>
          </Link>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: '1.6'
          }}>
            Empowering student voices through transparent and democratic event management. Shape your campus experience today.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}><Twitter size={20} /></a>
            <a href="#" style={{ color: 'var(--text-muted)' }}><Github size={20} /></a>
            <a href="#" style={{ color: 'var(--text-muted)' }}><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Navigation</h3>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link to="/results" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Winning Events</Link>
          <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Student Login</Link>
          <Link to="/admin/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Admin Portal</Link>
          <Link to="/register" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Get Started</Link>
        </div>

        {/* Categories Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Event Categories</h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Academic & Workshops</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Social & Entertainment</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Sports & Wellness</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Career & Networking</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Arts & Culture</span>
        </div>

        {/* Contact/Department Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>University Affiliation</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            Office of Student Life<br />
            Student Union Building, Room 204<br />
            123 University Avenue
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            <Mail size={16} />
            <a href="mailto:studentlife@university.edu" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              studentlife@university.edu
            </a>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Campus Event Idea & Voting System. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
