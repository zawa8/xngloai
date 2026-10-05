'use client';

import { useEffect, useState } from 'react';

const LOCAL_FONTS = [
  { id: 'xh38ascfont', name: 'xNglovinqi (xh38asc)',    variable: 'var(--xh38ascfont)' },
  { id: 'xb38ascfont', name: 'xNglobNgali (xb38asc)',   variable: 'var(--xb38ascfont)' },
  { id: 'xe38ascfont', name: 'xNgloiNgliS (xe38asc)',   variable: 'var(--xe38ascfont)' },
  { id: 'xg38ascfont', name: 'xNgloguzraji (xg38asc)',  variable: 'var(--xg38ascfont)' },
  { id: 'xj38ascfont', name: 'xNglojelugu (xj38asc)',   variable: 'var(--xj38ascfont)' },
  { id: 'xk38ascfont', name: 'xNgloknRa (xk38asc)',     variable: 'var(--xk38ascfont)' },
  { id: 'xm38ascfont', name: 'xNglomlyalxm (xm38asc)',  variable: 'var(--xm38ascfont)' },
  { id: 'xo38ascfont', name: 'xNglooriya (xo38asc)',    variable: 'var(--xo38ascfont)' },
  { id: 'xp38ascfont', name: 'xNglopnzabi (xp38asc)',   variable: 'var(--xp38ascfont)' },
  { id: 'xs38ascfont', name: 'xNglosinvla (xs38asc)',   variable: 'var(--xs38ascfont)' },
  { id: 'xt38ascfont', name: 'xNglotmil (xt38asc)',     variable: 'var(--xt38ascfont)' },
];

const DEFAULT_FONT = 'xh38ascfont';

export default function LocalFontPicker() {
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT);

  useEffect(() => {
    const savedFont = localStorage.getItem('user-local-font');
    const fontToApply = savedFont || DEFAULT_FONT;
    setSelectedFont(fontToApply);
    applyGlobalFont(fontToApply);
  }, []);

  const handleFontChange = (fontId) => {
    setSelectedFont(fontId);
    localStorage.setItem('user-local-font', fontId);
    applyGlobalFont(fontId);
  };

  const applyGlobalFont = (fontId) => {
    const fontObj = LOCAL_FONTS.find((f) => f.id === fontId);
    if (fontObj) {
      document.documentElement.style.setProperty('--current-active-font', fontObj.variable);
      document.body.style.fontFamily = fontObj.variable;
    }
  };

  return (
    <select
      value={selectedFont}
      onChange={(e) => handleFontChange(e.target.value)}
      style={{
        padding: '0.4rem 0.6rem',
        borderRadius: '6px',
        border: '1px solid #333',
        background: '#111',
        color: '#fff',
        fontSize: '0.85rem',
        cursor: 'pointer',
      }}
    >
      {LOCAL_FONTS.map((font) => (
        <option key={font.id} value={font.id}>
          {font.name}
        </option>
      ))}
    </select>
  );
}
