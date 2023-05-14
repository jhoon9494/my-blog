'use client';

import { useState, useEffect, useRef } from 'react';

export default function useTheme() {
  const darkTheme = useRef(typeof window === 'object' && window.matchMedia('(prefers-color-scheme: dark)'));
  const [theme, setTheme] = useState(() => {
    const storedTheme = typeof window === 'object' && localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return darkTheme.current && darkTheme.current.matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
