'use client';
import { useEffect, useState } from 'react';

export default function Topbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header id="topbar" className="flex items-center justify-end mb-6">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-2 border-2 border-black rounded-lg px-3 py-1.5 bg-white w-40 md:w-56">
          <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs"></i>
          <input type="text" placeholder="Search projects, skills…" className="text-xs text-gray-700 outline-none w-full bg-transparent" />
        </div>
        <button 
          onClick={toggleDarkMode}
          className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center bg-white hover:bg-gray-50 cursor-pointer" 
          title="Dark Mode"
        >
          <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-xs`}></i>
        </button>
        <button className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center bg-white hover:bg-gray-50" title="Notifications">
          <i className="fa-solid fa-bell text-xs"></i>
        </button>
      </div>
    </header>
  );
}
