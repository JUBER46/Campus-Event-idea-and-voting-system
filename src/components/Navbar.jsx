import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, X, Vote, Home, Trophy, LogIn, LayoutDashboard, 
  FileEdit, User, ShieldAlert, CheckCircle, LogOut, Moon, Sun 
} from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Define Accent based on user role
  const accentColor = isAdmin ? 'var(--accent-secondary)' : 'var(--accent-primary)';
  const accentColorHover = isAdmin ? 'var(--accent-secondary-light)' : 'var(--accent-primary-hover)';

  const publicLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Winning Events', path: '/results', icon: <Trophy size={18} /> },
    { name: 'Student Login', path: '/login', icon: <LogIn size={18} /> },
    { name: 'Admin Portal', path: '/admin/login', icon: <ShieldAlert size={18} /> },
    { name: 'Get Started', path: '/register', icon: <User size={18} />, isButton: true },
  ];

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Submit Proposal', path: '/submit', icon: <FileEdit size={18} /> },
    { name: 'Winning Events', path: '/results', icon: <Trophy size={18} /> },
  ];

  const adminLinks = [
    { name: 'Executive Control', path: '/admin', icon: <ShieldAlert size={18} /> },
    { name: 'Moderation Queue', path: '/admin/manage', icon: <CheckCircle size={18} /> },
    { name: 'Select Winner', path: '/admin/publish', icon: <Trophy size={18} /> },
    { name: 'Public Results', path: '/results', icon: <Home size={18} /> },
  ];

  const renderNavLinks = () => {
    let links = [];
    if (!currentUser) links = publicLinks;
    else if (isAdmin) links = adminLinks;
    else links = studentLinks;

    return links.map((link, index) => {
      const active = isActive(link.path);
      if (link.isButton) {
        return (
          <Link
            key={index}
            to={link.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: accentColor,
              color: 'var(--text-inverse)',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = accentColorHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.icon} {link.name}
          </Link>
        );
      }
      return (
        <Link
          key={index}
          to={link.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: active ? accentColor : 'transparent',
            color: active ? 'var(--text-inverse)' : 'var(--text-primary)',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'all var(--transition-fast)',
          }}
          onMouseOver={(e) => {
            if (!active) {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
            }
          }}
          onMouseOut={(e) => {
            if (!active) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.icon} {link.name}
        </Link>
      );
    });
  };

  const renderUserMenu = () => {
    if (!currentUser) return null;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link 
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px 4px 4px',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            transition: 'border-color var(--transition-fast)',
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = accentColor}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: accentColor,
            color: 'var(--text-inverse)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{currentUser.name || 'User'}</span>
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#ef4444', // Danger red
            border: '1px solid #ef4444',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all var(--transition-fast)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#fef2f2';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    );
  };

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color var(--transition-base), border-color var(--transition-base)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to={isAdmin ? "/admin" : (currentUser ? "/dashboard" : "/")} style={{
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
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: accentColor,
              color: 'var(--text-inverse)'
            }}>
              <Vote size={20} />
            </div>
            <span style={{
              fontSize: isMobile ? '15px' : '18px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: isMobile ? '200px' : 'none'
            }}>
              {isMobile ? 'Campus Events' : 'Campus Event Idea & Voting System'}
              {isAdmin && <span style={{ fontSize: '11px', marginLeft: '6px', color: accentColor, fontWeight: '700', textTransform: 'uppercase' }}>Admin</span>}
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {renderNavLinks()}
              
              <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 8px' }} />
              
              <button 
                onClick={toggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  marginRight: '8px'
                }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {renderUserMenu()}
            </div>
          )}

          {/* Mobile Toggle */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={toggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px'
                }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 998,
            backdropFilter: 'blur(3px)'
          }}
        />
      )}

      {/* Mobile Drawer */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="mobile-drawer animate-fade-in"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '85%',
            maxWidth: '320px',
            backgroundColor: 'var(--bg-secondary)',
            zIndex: 999,
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{
            padding: '24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
            {currentUser && (
              <div style={{ 
                marginBottom: '16px',
                padding: '16px',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: accentColor,
                  color: 'var(--text-inverse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{currentUser.name || 'User'}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentUser.email || (isAdmin ? 'Administrator' : 'Student')}</div>
                </div>
              </div>
            )}
            
            {renderNavLinks()}
          </div>

          {currentUser && (
            <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
