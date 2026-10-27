import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ label = 'Loading Campus Data...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      gap: '16px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--accent-primary-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Loader2 style={{
          animation: 'spin 1s linear infinite',
          width: '24px',
          height: '24px',
          color: 'var(--accent-primary)'
        }} />
      </div>
      <span style={{
        fontSize: '0.9375rem',
        fontWeight: '500',
        color: 'var(--text-muted)'
      }}>{label}</span>
    </div>
  );
};

export default Loading;
