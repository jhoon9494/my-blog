import { useState, useEffect } from 'react';

export default function useTheme() {
  const darkTheme = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(typeof window !== 'undefined' && localStorage.getItem('theme'));

  useEffect(() => {
    if (!theme) {
      setTheme(darkTheme && darkTheme.matches ? 'dark' : 'light');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [darkTheme, theme]);

  return { theme, setTheme };
}
