'use client';
import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubCalendarClient({ username }: { username: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return <div className="w-full h-40 animate-pulse bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 border border-gray-200">Loading calendar...</div>;
  }

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden py-4 flex justify-start lg:justify-center">
      <div className="min-w-fit">
        <GitHubCalendar 
          username={username} 
          colorScheme={isDark ? "dark" : "light"}
          blockSize={14}
          blockMargin={4}
          fontSize={14}
        />
      </div>
    </div>
  );
}
