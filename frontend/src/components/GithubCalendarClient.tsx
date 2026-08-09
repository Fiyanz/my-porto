'use client';
import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubCalendarClient({ username }: { username: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-40 animate-pulse bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 border border-gray-200">Loading calendar...</div>;
  }

  return (
    <div className="w-full overflow-hidden flex justify-center py-2">
      <GitHubCalendar 
        username={username} 
        colorScheme="light"
        blockSize={11}
        blockMargin={4}
        fontSize={12}
        hideTotalCount
        hideColorLegend
      />
    </div>
  );
}
