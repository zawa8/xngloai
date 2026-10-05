'use client';

export default function MicButton() {
  const handleClick = () => {
    alert('mic coming soon - @hscii/htrlib update in progress');
  };

  return (
    <button
      onClick={handleClick}
      title="voice input (coming soon)"
      style={{
        padding: '0.5rem 0.75rem',
        borderRadius: '6px',
        border: 'none',
        background: '#3b82f6',
        color: '#fff',
        fontSize: '0.9rem',
        cursor: 'pointer',
      }}
    >
      🎤
    </button>
  );
}
