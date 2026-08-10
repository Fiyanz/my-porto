'use client';
import { useState } from 'react';

export default function ProjectList({ initialProjects }: { initialProjects: any[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [view, setView] = useState('grid');
  const [openDeepDive, setOpenDeepDive] = useState<number | null>(null);

  const tabs = ['All', 'ML / AI', 'Backend', 'IoT', 'Mobile', 'Web3'];

  const filteredProjects = activeTab === 'All' 
    ? initialProjects 
    : initialProjects.filter(p => p.category.includes(activeTab) || p.tags.includes(activeTab) || (activeTab === 'Mobile' && p.category.includes('Mobile')) || (activeTab === 'IoT' && p.category.includes('IoT')) || (activeTab === 'Backend' && p.category.includes('Backend')) || (activeTab === 'ML / AI' && p.category.includes('ML')));

  return (
    <>
      {/* FILTER + SORT BAR */}
      <div id="filter-bar" className="flex items-center justify-between mb-5 gap-4">
        {/* Domain filter tabs */}
        <div className="flex border-2 border-black overflow-hidden text-xs font-bold">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${idx !== 0 ? 'border-l-2 border-black' : ''} ${
                activeTab === tab ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-semibold cursor-pointer">
            <i className="fa-solid fa-arrow-up-wide-short text-gray-500"></i>
            <span>Sort: Newest</span>
            <i className="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="flex border-2 border-black overflow-hidden">
            <button
              className={`w-8 h-8 flex items-center justify-center ${view === 'grid' ? 'bg-gray-900 text-white' : 'bg-white'}`}
              onClick={() => setView('grid')}
            >
              <i className="fa-solid fa-grip text-xs"></i>
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center border-l-2 border-black ${view === 'list' ? 'bg-gray-900 text-white' : 'bg-white'}`}
              onClick={() => setView('list')}
            >
              <i className="fa-solid fa-list text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div id="project-grid" className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6' : 'grid grid-cols-1 gap-4 mb-6'}>
        {filteredProjects.map((proj) => {
          const isDeep = openDeepDive === proj.id;
          return (
            <div key={proj.id} className="border-2 border-black bg-white flex flex-col">
              <div className="bg-gray-200 border-b-2 border-black px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center">
                    <i className={`fa-solid ${proj.icon} text-sm`}></i>
                  </div>
                  <span className="text-xs font-black uppercase tracking-wide">{proj.category}</span>
                </div>
                <span className={`text-xs border-2 border-black px-2 py-0.5 font-bold ${proj.status === 'Completed' ? 'bg-white' : 'bg-gray-900 text-white'}`}>
                  {proj.status}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-black text-base leading-tight mb-1">{proj.title}</h4>
                <p className="text-xs text-gray-500 leading-snug mb-3">{proj.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-gray-100 border border-gray-300 px-1.5 py-0.5 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex border-2 border-black overflow-hidden text-xs font-bold mb-3">
                  <button
                    className={`flex-1 py-1.5 text-center ${!isDeep ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setOpenDeepDive(null)}
                  >
                    Quick View
                  </button>
                  <button
                    className={`flex-1 py-1.5 text-center border-l-2 border-black ${isDeep ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setOpenDeepDive(proj.id)}
                  >
                    Deep Dive
                  </button>
                </div>

                {!isDeep ? (
                  <div className="text-xs text-gray-600 leading-relaxed">
                    <div className="flex items-center gap-2 mb-1">
                      <i className="fa-solid fa-bullseye text-gray-400"></i>
                      <span><b>{proj.status === 'Completed' ? 'Outcome:' : 'Status:'}</b> {proj.outcome}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-brands fa-github text-gray-400"></i>
                      <span className="underline cursor-pointer">{proj.github_url ? "View on GitHub →" : "No link"}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-600 leading-relaxed border-t-2 border-dashed border-gray-300 pt-3">
                    <p className="font-bold mb-1 text-gray-800">The Challenge:</p>
                    <p className="mb-2">{proj.challenge}</p>
                    <p className="font-bold mb-1 text-gray-800">Key learning:</p>
                    <p>{proj.learning}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div id="pagination" className="flex items-center justify-between border-t-2 border-black pt-4">
        <span className="text-xs text-gray-500 font-medium">Showing {filteredProjects.length} of {initialProjects.length} projects</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-xs font-bold hover:bg-gray-50">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button className="w-8 h-8 border-2 border-black bg-gray-900 text-white flex items-center justify-center text-xs font-bold">1</button>
          <button className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-xs font-bold hover:bg-gray-50">2</button>
          <button className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-xs font-bold hover:bg-gray-50">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </>
  );
}
