import React from 'react';

export const dynamic = 'force-dynamic';
async function getExperiences() {
  try {
    const res = await fetch('http://server:8000/experiences/', { 
      next: { revalidate: 0 } 
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function Experience() {
  const experiences = await getExperiences();

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Experience</h1>
          <p className="text-sm text-gray-500 mt-1">Education, bootcamps, org involvement & open source contributions.</p>
        </div>
        <div className="flex gap-3">
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">3+</div>
            <div className="text-xs text-gray-500">Yrs Active</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">4</div>
            <div className="text-xs text-gray-500">Orgs</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">48</div>
            <div className="text-xs text-gray-500">PRs Merged</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* LEFT: Timeline */}
        <div className="col-span-2 flex flex-col gap-0">
          <h2 className="text-lg font-black mb-4">Timeline</h2>

          <div className="timeline-line flex flex-col gap-0 relative">
            {/* Timeline line behind */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-black z-0"></div>

            {experiences.length > 0 ? experiences.map((exp: any, index: number) => {
              const isLast = index === experiences.length - 1;
              const isCurrent = exp.status === 'Current' || exp.status === 'Ongoing';
              
              return (
                <div key={exp.id} className={`flex gap-4 relative z-10 ${!isLast ? 'pb-6' : ''}`}>
                  <div className={`w-10 h-10 ${exp.icon_bg} border-2 border-black flex items-center justify-center shrink-0 z-10`}>
                    <i className={`fa-solid ${exp.icon} ${exp.icon_bg.includes('white') ? 'text-black' : 'text-white'} text-sm`}></i>
                  </div>
                  <div className="flex-1 border-2 border-black bg-white p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-black text-base">{exp.title}</h3>
                        <p className="text-xs text-gray-500 font-medium">{exp.institution}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs border-2 border-black px-2 py-0.5 font-bold mono ${isCurrent ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                          {exp.status}
                        </span>
                        <span className="text-xs text-gray-400 mono">{exp.time_range}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      {exp.description}
                    </p>
                    
                    {exp.outcome && (
                      <div className="border-2 border-black p-2 bg-gray-50 flex items-center gap-2 mb-3">
                        <i className="fa-solid fa-trophy text-xs text-gray-600"></i>
                        <span className="text-xs font-bold">Outcome: </span>
                        <span className="text-xs text-gray-600">{exp.outcome}</span>
                      </div>
                    )}
                    
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {exp.tags.map((tag: string, i: number) => (
                          <span key={i} className="text-xs border border-gray-300 px-1.5 py-0.5 bg-gray-50 mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }) : (
              <div className="p-4 border-2 border-dashed border-gray-400 text-center text-sm text-gray-500 bg-white relative z-10">
                No experiences found.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Stats sidebar */}
        <div className="flex flex-col gap-4">
          <div id="involvement-card" className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">Org Involvement</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
                  <i className="fa-brands fa-github text-sm"></i>
                </div>
                <div>
                  <div className="text-xs font-black">GitHub Campus</div>
                  <div className="text-xs text-gray-400">Student Developer</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-microchip text-sm"></i>
                </div>
                <div>
                  <div className="text-xs font-black">IoT Club — Univ</div>
                  <div className="text-xs text-gray-400">Active Member</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-brain text-sm"></i>
                </div>
                <div>
                  <div className="text-xs font-black">ML Study Group</div>
                  <div className="text-xs text-gray-400">Co-organizer</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
                  <i className="fa-brands fa-linux text-sm"></i>
                </div>
                <div>
                  <div className="text-xs font-black">Linux / Ricing</div>
                  <div className="text-xs text-gray-400">Hyprland community</div>
                </div>
              </div>
            </div>
          </div>

          <div id="philosophy-card" className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">Work Philosophy</h3>
            <div className="flex flex-col gap-3">
              <div className="border-l-4 border-black pl-3">
                <p className="text-xs text-gray-700 italic leading-relaxed">"Deeply understand before execute — not just make it work, but know why it works."</p>
              </div>
              <div className="border-l-4 border-gray-400 pl-3">
                <p className="text-xs text-gray-700 italic leading-relaxed">"The debugging story is often more valuable than the final commit."</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-3">
                <p className="text-xs text-gray-700 italic leading-relaxed">"Cross-domain thinking is a superpower — ML + IoT + Backend isn't scattered, it's full-stack systems thinking."</p>
              </div>
            </div>
          </div>

          <div id="badge-card" className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">GitHub Badges</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 border-2 border-black p-2 bg-gray-50">
                <i className="fa-solid fa-code-pull-request text-sm text-gray-700"></i>
                <div>
                  <div className="text-xs font-black">Pull Shark</div>
                  <div className="text-xs text-gray-400">×2 unlocked</div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-2 border-black p-2 bg-gray-50">
                <i className="fa-solid fa-snowflake text-sm text-gray-700"></i>
                <div>
                  <div className="text-xs font-black">Arctic Code Vault</div>
                  <div className="text-xs text-gray-400">Contributor</div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-2 border-black p-2 bg-gray-50">
                <i className="fa-solid fa-fire text-sm text-gray-700"></i>
                <div>
                  <div className="text-xs font-black">Streak</div>
                  <div className="text-xs text-gray-400">127 days active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
