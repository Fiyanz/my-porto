import React from 'react';

async function getSkills() {
  try {
    const res = await fetch('http://server:8000/skills/', { 
      next: { revalidate: 0 } 
    });
    if (!res.ok) {
      console.error("Failed to fetch skills");
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching skills:", err);
    return [];
  }
}

export default async function Skills() {
  const skills = await getSkills();

  // Group skills by category
  const categories = [
    { name: 'Languages', icon: 'fa-terminal', fallbackMostUsed: 'Python · Go' },
    { name: 'ML / Data', icon: 'fa-brain', fallbackMostUsed: 'TensorFlow · sklearn' },
    { name: 'Backend / Infra', icon: 'fa-server', fallbackMostUsed: 'FastAPI · Docker' },
    { name: 'IoT / Embedded', icon: 'fa-microchip', fallbackMostUsed: 'ESP32 · MQTT' },
    { name: 'Mobile / Web3', icon: 'fa-mobile-screen', fallbackMostUsed: 'Flutter · Hardhat' },
    { name: 'Tooling / OS', icon: 'fa-screwdriver-wrench', fallbackMostUsed: 'Arch + Hyprland' }
  ];

  const groupedSkills = categories.map(cat => ({
    ...cat,
    skills: skills.filter((s: any) => s.category === cat.name).sort((a: any, b: any) => a.display_order - b.display_order)
  }));

  // Compute Domain Proficiency
  const getProficiency = (categoryName: string) => {
    const categorySkills = groupedSkills.find(c => c.name === categoryName)?.skills || [];
    if (categorySkills.length === 0) return 0;
    const totalLevel = categorySkills.reduce((sum: number, skill: any) => sum + skill.level, 0);
    return Math.round(totalLevel / categorySkills.length);
  };

  const domainProficiencies = [
    { name: 'Machine Learning / AI', icon: 'fa-brain', level: getProficiency('ML / Data') || 82 },
    { name: 'Backend / API', icon: 'fa-server', level: getProficiency('Backend / Infra') || 88 },
    { name: 'IoT / Embedded', icon: 'fa-microchip', level: getProficiency('IoT / Embedded') || 70 },
    { name: 'Mobile (Flutter)', icon: 'fa-mobile-screen', level: getProficiency('Mobile / Web3') || 65 },
    { name: 'Web3 / Smart Contracts', icon: 'fa-cube', level: 58 } // Keeping static for now, or use Mobile / Web3
  ];

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Skills & Stack</h1>
          <p className="text-sm text-gray-500 mt-1">Tools, languages, and frameworks I use daily or have shipped with.</p>
        </div>
        <div className="flex gap-3">
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">{skills.length > 0 ? skills.length : '28+'}</div>
            <div className="text-xs text-gray-500">Technologies</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">5</div>
            <div className="text-xs text-gray-500">Domains</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">3+</div>
            <div className="text-xs text-gray-500">Yrs Coding</div>
          </div>
        </div>
      </div>

      {/* TOP ROW: Proficiency Radar + Top Languages */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div id="proficiency-card" className="col-span-2 border-2 border-black bg-white p-5">
          <h3 className="font-black text-sm mb-4 flex items-center gap-2">
            <i className="fa-solid fa-chart-bar text-gray-500"></i> Domain Proficiency
          </h3>
          <div className="flex flex-col gap-4">
            {domainProficiencies.map((domain) => (
              <div key={domain.name}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <i className={`fa-solid ${domain.icon} text-sm text-gray-600`}></i>
                    <span className="text-sm font-bold">{domain.name}</span>
                  </div>
                  <span className="text-xs font-black mono">{domain.level}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 border border-gray-300">
                  <div className="h-full bg-gray-800 transition-all duration-500" style={{ width: `${domain.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="learning-card" className="border-2 border-black bg-white p-4 flex flex-col gap-3">
          <h3 className="font-black text-sm flex items-center gap-2">
            <i className="fa-solid fa-bolt text-gray-500"></i> Currently Learning
          </h3>
          <div className="flex flex-col gap-2">
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">Rust</div>
              <div className="text-xs text-gray-500">Systems + WASM targets</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '30%' }}></div></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">Kubernetes</div>
              <div className="text-xs text-gray-500">Orchestrating ML pipelines</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '45%' }}></div></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">LangChain</div>
              <div className="text-xs text-gray-500">RAG + agent pipelines</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '55%' }}></div></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">eBPF</div>
              <div className="text-xs text-gray-500">Linux observability</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '20%' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-black mb-3">Technology Stack</h2>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {groupedSkills.map((category) => {
          const primarySkills = category.skills.filter((s: any) => s.is_primary);
          const mostUsedText = primarySkills.length > 0 
            ? primarySkills.map((s: any) => s.name).join(' · ')
            : category.fallbackMostUsed;

          return (
            <div key={category.name} className="border-2 border-black bg-white p-4">
              <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
                <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
                  <i className={`fa-solid ${category.icon} text-sm`}></i>
                </div>
                <span className="font-black text-sm">{category.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.length > 0 ? category.skills.map((skill: any) => (
                  <span 
                    key={skill.id} 
                    className={`border-2 border-black px-2 py-1 text-xs font-bold mono ${
                      skill.is_primary ? 'bg-gray-900 text-white font-black' : 'bg-gray-100'
                    }`}
                  >
                    {skill.name}
                  </span>
                )) : (
                  <span className="text-xs text-gray-500 italic">No skills added yet</span>
                )}
              </div>
              <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
                <span className="text-xs text-gray-400">Most used:</span>
                <span className="text-xs font-black mono truncate">{mostUsedText}</span>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-black mb-3">Certifications & Bootcamps</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="border-2 border-black bg-white p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
            <i className="fa-solid fa-certificate text-sm"></i>
          </div>
          <div>
            <div className="font-black text-sm">AI/ML Bootcamp</div>
            <div className="text-xs text-gray-500 mt-0.5">Agrikultur domain · TensorFlow · Scikit-learn</div>
            <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">2024</div>
          </div>
        </div>
        <div className="border-2 border-black bg-white p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
            <i className="fa-solid fa-certificate text-sm"></i>
          </div>
          <div>
            <div className="font-black text-sm">Backend Engineering</div>
            <div className="text-xs text-gray-500 mt-0.5">FastAPI · PostgreSQL · System Design</div>
            <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">2023</div>
          </div>
        </div>
        <div className="border-2 border-black bg-white p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
            <i className="fa-solid fa-graduation-cap text-sm"></i>
          </div>
          <div>
            <div className="font-black text-sm">Computer Science — S1</div>
            <div className="text-xs text-gray-500 mt-0.5">6th Semester · Active Student</div>
            <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">2022 – now</div>
          </div>
        </div>
      </div>
    </>
  );
}
