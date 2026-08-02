export default function Home() {
  return (
    <>

      <h1 id="page-title" className="text-3xl font-black tracking-tight mb-5">Portfolio Overview</h1>

      {/* Top Row: Hero Card + Featured Projects */}
      <div id="top-row" className="grid grid-cols-3 gap-4 mb-5">
        <div id="hero-card" className="col-span-2 border-2 border-black rounded-2xl bg-white p-5">
          <div className="flex gap-5">
            <div className="w-32 h-36 bg-gray-200 rounded-xl border-2 border-black shrink-0 overflow-hidden flex items-end justify-center">
              <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=99" className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-black leading-tight">Your Name</h2>
                  <p className="text-gray-500 text-sm font-medium">your.email@example.com</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <i className="fa-brands fa-github text-xs"></i>
                  </div>
                  <div className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <i className="fa-brands fa-linkedin text-xs"></i>
                  </div>
                  <div className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <i className="fa-solid fa-envelope text-xs"></i>
                  </div>
                  <div className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <i className="fa-brands fa-medium text-xs"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3">
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">6th</div>
                  <div className="text-xs text-gray-500 leading-tight">Semester</div>
                </div>
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">3+</div>
                  <div className="text-xs text-gray-500 leading-tight">Years Coding</div>
                </div>
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">36</div>
                  <div className="text-xs text-gray-500 leading-tight">Repos</div>
                </div>
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">5</div>
                  <div className="text-xs text-gray-500 leading-tight">Domains</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                CS student building at the intersection of ML, Backend, IoT, and Web3. Passionate about deeply understanding systems before shipping them.
              </p>

              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-2 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg border-2 border-black hover:bg-gray-800 transition">
                  <i className="fa-solid fa-download"></i>
                  Download CV
                </button>
                <button className="flex items-center gap-2 bg-white text-xs font-bold px-4 py-2 rounded-lg border-2 border-black hover:bg-gray-50 transition">
                  <i className="fa-solid fa-layer-group"></i>
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="domains-card" className="border-2 border-black rounded-2xl bg-white p-4 flex flex-col gap-3">
          <h3 className="font-black text-sm uppercase tracking-wider text-gray-400">Domains</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-100">
              <i className="fa-solid fa-brain text-sm"></i>
              <span className="text-xs font-bold">Machine Learning</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-100">
              <i className="fa-solid fa-server text-sm"></i>
              <span className="text-xs font-bold">Backend / API</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-100">
              <i className="fa-solid fa-microchip text-sm"></i>
              <span className="text-xs font-bold">IoT / Embedded</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-100">
              <i className="fa-solid fa-mobile-screen text-sm"></i>
              <span className="text-xs font-bold">Mobile</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-100">
              <i className="fa-solid fa-cube text-sm"></i>
              <span className="text-xs font-bold">Web3</span>
            </div>
          </div>
        </div>
      </div>

      <div id="projects-heading" className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-black">Featured Projects</h2>
        <button className="text-xs font-semibold border-2 border-black px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50">View all</button>
      </div>

      <div id="project-cards" className="grid grid-cols-3 gap-4 mb-5">
        {[
          { id: 1, title: 'Red Chili Pest Detection', icon: 'fa-seedling', desc: 'TensorFlow + MLflow + Docker pipeline for real-time crop pest classification.', tags: ['TensorFlow', 'MLflow', 'Docker'], domains: ['ML', 'CV'] },
          { id: 2, title: 'FastAPI E-commerce System', icon: 'fa-cart-shopping', desc: 'Full-featured REST API with auth, payments, and product management.', tags: ['FastAPI', 'PostgreSQL', 'Redis'], domains: ['API', 'BE'] },
          { id: 3, title: 'SightAssist ESP32-C3', icon: 'fa-eye', desc: 'Embedded assistive device for visually impaired using computer vision + ultrasonic sensors.', tags: ['ESP32-C3', 'MicroPython', 'MQTT'], domains: ['IoT', 'ESP'] },
        ].map(proj => (
          <div key={proj.id} className="border-2 border-black rounded-2xl bg-white p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-gray-200 border-2 border-black rounded-xl flex items-center justify-center">
                <i className={`fa-solid ${proj.icon} text-sm`}></i>
              </div>
              <div className="flex gap-1">
                {proj.domains.map(d => (
                  <span key={d} className="text-xs border-2 border-black rounded-full px-2 py-0.5 font-mono font-bold bg-gray-100">{d}</span>
                ))}
              </div>
            </div>
            <h4 className="font-black text-sm leading-tight mb-1">{proj.title}</h4>
            <p className="text-xs text-gray-500 leading-snug mb-3 flex-1">{proj.desc}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {proj.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 font-mono">{tag}</span>
              ))}
            </div>
            <div className="flex border-2 border-black rounded-lg overflow-hidden text-xs font-bold mt-auto">
              <button className="flex-1 py-1.5 bg-gray-900 text-white text-center hover:bg-gray-800">Quick View</button>
              <button className="flex-1 py-1.5 bg-white text-center hover:bg-gray-50">Deep Dive</button>
            </div>
          </div>
        ))}
      </div>
      <div id="bottom-row" className="grid grid-cols-3 gap-4 mb-5">
        <div id="github-stats-card" className="border-2 border-black rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-sm">GitHub Stats</h3>
            <button className="text-xs border-2 border-black rounded-lg px-2 py-1 font-semibold hover:bg-gray-50">See all</button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl font-black">4.8</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                <i className="fa-solid fa-star text-gray-700 text-xs"></i>
                <i className="fa-solid fa-star text-gray-700 text-xs"></i>
                <i className="fa-solid fa-star text-gray-700 text-xs"></i>
                <i className="fa-solid fa-star text-gray-700 text-xs"></i>
                <i className="fa-solid fa-star-half-stroke text-gray-700 text-xs"></i>
              </div>
              <p className="text-xs text-gray-400">Activity Score</p>
            </div>
          </div>
          <div className="text-3xl font-black mb-0.5">36</div>
          <p className="text-xs text-gray-400 mb-4">public repositories</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2">
              <span className="text-gray-500 font-medium">Achievements</span>
              <span className="font-black">Pull Shark · Arctic Vault</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2">
              <span className="text-gray-500 font-medium">Streak</span>
              <span className="font-black">127 days</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2">
              <span className="text-gray-500 font-medium">PRs Merged</span>
              <span className="font-black">48</span>
            </div>
          </div>
        </div>

        <div id="contribution-graph" className="col-span-2 border-2 border-black rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm">Contribution Activity</h3>
            <div className="flex gap-2">
              <button className="text-xs border-2 border-black rounded-lg px-2 py-1 font-semibold bg-gray-900 text-white hover:bg-gray-800">2026</button>
              <button className="text-xs border-2 border-black rounded-lg px-2 py-1 font-semibold hover:bg-gray-50">2025</button>
            </div>
          </div>
          <div className="w-full h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 mb-4">
            <i className="fa-brands fa-github text-gray-400 text-2xl"></i>
            <span className="text-xs text-gray-400 font-medium">GitHub Contribution Graph (Pacman-style)</span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 border-2 border-black rounded-xl p-2 flex items-center gap-2 bg-gray-50">
              <div className="w-7 h-7 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-code-pull-request text-xs text-gray-600"></i>
              </div>
              <div>
                <div className="text-xs font-black">Pull Shark</div>
                <div className="text-xs text-gray-400">×2</div>
              </div>
            </div>
            <div className="flex-1 border-2 border-black rounded-xl p-2 flex items-center gap-2 bg-gray-50">
              <div className="w-7 h-7 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-snowflake text-xs text-gray-600"></i>
              </div>
              <div>
                <div className="text-xs font-black">Arctic Vault</div>
                <div className="text-xs text-gray-400">Archived</div>
              </div>
            </div>
            <div className="flex-1 border-2 border-black rounded-xl p-2 flex items-center gap-2 bg-gray-50">
              <div className="w-7 h-7 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-fire text-xs text-gray-600"></i>
              </div>
              <div>
                <div className="text-xs font-black">Streak</div>
                <div className="text-xs text-gray-400">127 days</div>
              </div>
            </div>
            <div className="flex-1 border-2 border-black rounded-xl p-2 flex items-center gap-2 bg-gray-50">
              <div className="w-7 h-7 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-star text-xs text-gray-600"></i>
              </div>
              <div>
                <div className="text-xs font-black">Stars</div>
                <div className="text-xs text-gray-400">84 total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
