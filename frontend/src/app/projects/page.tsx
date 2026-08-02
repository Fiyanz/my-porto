'use client';
import { useState } from 'react';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All');
  const [view, setView] = useState('grid');
  const [openDeepDive, setOpenDeepDive] = useState<number | null>(null);

  const tabs = ['All', 'ML / AI', 'Backend', 'IoT', 'Mobile', 'Web3'];

  const projects = [
    {
      id: 1,
      category: 'ML / CV',
      status: 'Completed',
      title: 'Red Chili Pest Detection',
      desc: 'Real-time crop pest classification using TensorFlow + MLflow + Docker pipeline. Trained on 4 pest categories.',
      tags: ['TensorFlow', 'MLflow', 'Docker', 'FastAPI'],
      icon: 'fa-seedling',
      quick: {
        outcome: '92% accuracy on test set, deployed via Docker',
        link: 'View on GitHub →'
      },
      deep: {
        challenge: 'Encountered .ravel() mismatch errors during label encoding — traced back to inconsistent image dimensions in the raw dataset. Fixed with a preprocessing normalization step.',
        learning: 'Always validate tensor shapes before training — added shape assertion checks as a standard pipeline step.'
      }
    },
    {
      id: 2,
      category: 'Backend',
      status: 'Completed',
      title: 'FastAPI E-commerce System',
      desc: 'Full-featured REST API with JWT auth, Stripe payments, inventory management, and Redis caching.',
      tags: ['FastAPI', 'PostgreSQL', 'Redis', 'Stripe'],
      icon: 'fa-cart-shopping',
      quick: {
        outcome: '30+ endpoints, <50ms avg response, tested with Locust',
        link: 'View on GitHub →'
      },
      deep: {
        challenge: 'N+1 query issue surfaced under load testing — solved by implementing SQLAlchemy selectinload and adding a query profiler middleware.',
        learning: 'Never skip load testing before calling a backend "done" — Locust caught 3 critical bottlenecks pre-launch.'
      }
    },
    {
      id: 3,
      category: 'IoT',
      status: 'Ongoing',
      title: 'SightAssist ESP32-C3',
      desc: 'Embedded assistive device for visually impaired — ultrasonic + camera + TTS pipeline on ESP32-C3.',
      tags: ['ESP32-C3', 'MicroPython', 'MQTT', 'TTS'],
      icon: 'fa-eye',
      quick: {
        outcome: 'Sensor fusion working, camera module in progress',
        link: 'View on GitHub →'
      },
      deep: {
        challenge: 'ESP32-C3 kept entering boot loop after flashing — traced to GPIO conflict between UART0 and the camera module. Fixed by remapping UART to GPIO 21/20.',
        learning: 'Always check the chip\'s IO MUX table before wiring — manufacturer docs aren\'t always consistent with community pinouts.'
      }
    },
    {
      id: 4,
      category: 'ML / AI',
      status: 'Completed',
      title: 'Crop Recommendation System',
      desc: 'Agri-ML model recommending optimal crops based on soil & climate data. Built during AI/ML bootcamp.',
      tags: ['Scikit-learn', 'Pandas', 'Streamlit'],
      icon: 'fa-wheat-awn',
      quick: {
        outcome: '96.4% F1-score, RandomForest best model',
        link: 'View on GitHub →'
      },
      deep: {
        challenge: 'Class imbalance in the dataset skewed predictions toward high-frequency crops. Fixed with SMOTE oversampling + stratified k-fold cross-validation.',
        learning: 'Accuracy is a vanity metric — F1 and confusion matrices tell the real story.'
      }
    },
    {
      id: 5,
      category: 'Web3',
      status: 'Completed',
      title: 'Decentralized Voting dApp',
      desc: 'Smart contract-based voting system on EVM-compatible chain with transparent result tallying.',
      tags: ['Solidity', 'Hardhat', 'ethers.js', 'React'],
      icon: 'fa-cube',
      quick: {
        outcome: 'Deployed on testnet, gas-optimized contract',
        link: 'View on GitHub →'
      },
      deep: {
        challenge: 'Re-entrancy vulnerability found in early draft during Slither static analysis. Refactored using Checks-Effects-Interactions pattern before any deployment.',
        learning: 'Smart contracts are immutable — audit-first mentality is non-negotiable, even for toy projects.'
      }
    },
    {
      id: 6,
      category: 'Mobile',
      status: 'Ongoing',
      title: 'AgriTrack Mobile App',
      desc: 'Flutter-based field companion app for farmers — integrates crop recommendation model via REST API.',
      tags: ['Flutter', 'Dart', 'FastAPI', 'SQLite'],
      icon: 'fa-mobile-screen',
      quick: {
        outcome: 'Auth + recommendation flow done, offline mode WIP',
        link: 'View on GitHub →'
      },
      deep: {
        challenge: 'State management became a spaghetti mess using raw setState — migrated to Riverpod for predictable state flow, especially for async API calls.',
        learning: 'Pick your state management solution before writing business logic — retrofitting is painful.'
      }
    }
  ];

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(activeTab) || p.tags.includes(activeTab) || (activeTab === 'Mobile' && p.category.includes('Mobile')) || (activeTab === 'IoT' && p.category.includes('IoT')) || (activeTab === 'Backend' && p.category.includes('Backend')) || (activeTab === 'ML / AI' && p.category.includes('ML')));

  return (
    <>
      {/* Page heading + summary stats */}
      <div id="page-header" className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">All Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Everything I've built — from models to microcontrollers.</p>
        </div>
        {/* Summary stat pills */}
        <div className="flex gap-3">
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">12</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">5</div>
            <div className="text-xs text-gray-500">Domains</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">3</div>
            <div className="text-xs text-gray-500">Ongoing</div>
          </div>
        </div>
      </div>

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
      <div id="project-grid" className={view === 'grid' ? 'grid grid-cols-3 gap-4 mb-6' : 'grid grid-cols-1 gap-4 mb-6'}>
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
                <p className="text-xs text-gray-500 leading-snug mb-3">{proj.desc}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.tags.map((tag) => (
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
                      <span><b>{proj.status === 'Completed' ? 'Outcome:' : 'Status:'}</b> {proj.quick.outcome}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-brands fa-github text-gray-400"></i>
                      <span className="underline cursor-pointer">{proj.quick.link}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-600 leading-relaxed border-t-2 border-dashed border-gray-300 pt-3">
                    <p className="font-bold mb-1 text-gray-800">The Challenge:</p>
                    <p className="mb-2">{proj.deep.challenge}</p>
                    <p className="font-bold mb-1 text-gray-800">Key learning:</p>
                    <p>{proj.deep.learning}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div id="pagination" className="flex items-center justify-between border-t-2 border-black pt-4">
        <span className="text-xs text-gray-500 font-medium">Showing 6 of 12 projects</span>
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
