import { useState, useEffect, useRef } from 'react';

export default function useTheme() {
  const darkTheme = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)'));
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return darkTheme.current && darkTheme.current.matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
