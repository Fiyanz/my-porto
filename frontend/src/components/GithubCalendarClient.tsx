'use client';

import { GitHubCalendar } from 'react-github-calendar';

export default function GithubCalendarClient({ username }: { username: string }) {
  return (
    <div className="w-full overflow-hidden flex justify-center py-2">
      <GitHubCalendar 
        username={username} 
        colorScheme="light"
        hideTotalCount
        hideColorLegend
        blockSize={15}
        blockMargin={5}
        fontSize={14}
      />
    </div>
  );
}
