'use client';

import { useState, useEffect, useRef } from 'react';

const isBrowser = () => typeof window !== 'undefined';

export default function useTheme() {
  const darkTheme = useRef(isBrowser() && window.matchMedia('(prefers-color-scheme: dark)'));
  const [theme, setTheme] = useState(() => {
    const storedTheme = isBrowser() && localStorage.getItem('theme');
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
