import GithubCalendarClient from '@/components/GithubCalendarClient';
import Link from 'next/link';
import { getServerApiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getGithubStats() {
  try {
    const res = await fetch(`${getServerApiUrl()}/github/stats`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    return null;
  }
}

async function getProfile() {
  try {
    const res = await fetch(`${getServerApiUrl()}/admin/profile`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getSkills() {
  try {
    const res = await fetch(`${getServerApiUrl()}/skills/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getProjects() {
  try {
    const res = await fetch(`${getServerApiUrl()}/projects/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const [statsData, profile, skills, allProjects] = await Promise.all([
    getGithubStats(),
    getProfile(),
    getSkills(),
    getProjects()
  ]);

  const stats = statsData || {
    public_repos: 36,
    total_stars: 84,
    total_commits: 1204,
    activity_score: 4.8,
    streak_days: 127,
    prs_merged: 48
  };

  return (
    <>

      <h1 id="page-title" className="text-3xl font-black tracking-tight mb-5">Portfolio Overview</h1>

      {/* Top Row: Hero Card + Featured Projects */}
      <div id="top-row" className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <div id="hero-card" className="col-span-1 lg:col-span-2 border-2 border-black rounded-2xl bg-white p-5">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-52 h-52 bg-gray-200 rounded-xl border-2 border-black shrink-0 overflow-hidden flex items-end justify-center">
              <img src={profile?.avatar_url || "https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=99"} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0">
                <div>
                  <h2 className="text-xl font-black leading-tight">{profile?.name || 'Your Name'}</h2>
                  <p className="text-gray-500 text-sm font-medium">{profile?.email || 'your.email@example.com'}</p>
                </div>
                <div className="flex gap-2 justify-center md:justify-end">
                  <a href={profile?.github_url || "https://github.com/Fiyanz"} target="_blank" className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900 transition-colors">
                    <i className="fa-brands fa-github text-xs"></i>
                  </a>
                  <a href={profile?.linkedin_url || "https://linkedin.com/"} target="_blank" className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900 transition-colors">
                    <i className="fa-brands fa-linkedin text-xs"></i>
                  </a>
                  <a href={profile?.instagram_url || "https://instagram.com/"} target="_blank" className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900 transition-colors">
                    <i className="fa-brands fa-instagram text-xs"></i>
                  </a>
                  <a href={`mailto:${profile?.email || ''}`} className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900 transition-colors">
                    <i className="fa-solid fa-envelope text-xs"></i>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 md:mt-3">
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">6th</div>
                  <div className="text-xs text-gray-500 leading-tight">Semester</div>
                </div>
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">3+</div>
                  <div className="text-xs text-gray-500 leading-tight">Years Coding</div>
                </div>
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">{stats.public_repos}</div>
                  <div className="text-xs text-gray-500 leading-tight">Repos</div>
                </div>
                <div className="border-2 border-black rounded-xl p-2 text-center bg-gray-100">
                  <div className="text-lg font-black">5</div>
                  <div className="text-xs text-gray-500 leading-tight">Focus Areas</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                {profile?.bio || 'CS student building at the intersection of ML, Backend, IoT, and Web3. Passionate about deeply understanding systems before shipping them.'}
              </p>

              <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-3">
                <a href={profile?.cv_url || "/api/files/cv"} target="_blank" className="flex items-center justify-center gap-2 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg border-2 border-black hover:bg-gray-800 transition">
                  <i className="fa-solid fa-download"></i>
                  Download CV
                </a>
                <Link href="/projects" className="flex items-center justify-center gap-2 bg-white text-xs font-bold px-4 py-2 rounded-lg border-2 border-black hover:bg-gray-50 transition">
                  <i className="fa-solid fa-layer-group"></i>
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="domains-card" className="border-2 border-black rounded-2xl bg-white p-4 flex flex-col gap-3 h-full">
          <h3 className="font-black text-sm uppercase tracking-wider text-gray-400">Domains I Touch</h3>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {[
              { name: 'Machine Learning', icon: 'fa-brain' },
              { name: 'Backend / API', icon: 'fa-server' },
              { name: 'IoT / Embedded', icon: 'fa-microchip' },
              { name: 'Mobile', icon: 'fa-mobile-screen' },
              { name: 'Web3', icon: 'fa-cube' }
            ].map((domain: any, i: number) => (
              <div key={i} className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-100">
                <i className={`fa-solid ${domain.icon} text-sm`}></i>
                <span className="text-xs font-bold">{domain.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="projects-heading" className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-black">Featured Projects</h2>
        <Link href="/projects" className="text-xs font-semibold border-2 border-black px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50">View all</Link>
      </div>

      <div id="project-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {(allProjects?.length > 0 ? allProjects.slice(0, 3) : [
          { id: 1, title: 'Red Chili Pest Detection', icon: 'fa-seedling', description: 'TensorFlow + MLflow + Docker pipeline for real-time crop pest classification.', technologies: ['TensorFlow', 'MLflow', 'Docker'], link: '#' },
          { id: 2, title: 'FastAPI E-commerce System', icon: 'fa-cart-shopping', description: 'Full-featured REST API with auth, payments, and product management.', technologies: ['FastAPI', 'PostgreSQL', 'Redis'], link: '#' },
          { id: 3, title: 'SightAssist ESP32-C3', icon: 'fa-eye', description: 'Embedded assistive device for visually impaired using computer vision + ultrasonic sensors.', technologies: ['ESP32-C3', 'MicroPython', 'MQTT'], link: '#' },
        ]).map((proj: any) => (
          <div key={proj.id} className="border-2 border-black rounded-2xl bg-white p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-gray-200 border-2 border-black rounded-xl flex items-center justify-center">
                <i className={`fa-solid ${proj.icon || 'fa-folder'} text-sm`}></i>
              </div>
            </div>
            <h4 className="font-black text-sm leading-tight mb-1">{proj.title}</h4>
            <p className="text-xs text-gray-500 leading-snug mb-3 flex-1">{proj.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {(proj.technologies || []).map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 font-mono">{tag}</span>
              ))}
            </div>
            <div className="flex border-2 border-black rounded-lg overflow-hidden text-xs font-bold mt-auto">
              <a href={proj.link || '#'} target="_blank" className="flex-1 py-1.5 bg-gray-900 text-white text-center hover:bg-gray-800">Quick View</a>
              <Link href="/projects" className="flex-1 py-1.5 bg-white text-center hover:bg-gray-50 block">Deep Dive</Link>
            </div>
          </div>
        ))}
      </div>
      <div id="bottom-row" className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <div id="github-stats-card" className="border-2 border-black rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-sm">GitHub Stats</h3>
            <a href="https://github.com/Fiyanz" target="_blank" rel="noopener noreferrer" className="text-xs border-2 border-black rounded-lg px-2 py-1 font-semibold hover:bg-gray-50">See all</a>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl font-black">{stats.total_commits || 1204}</div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <i className="fa-solid fa-code-commit text-gray-700 text-sm"></i>
                <span className="font-bold text-sm text-gray-700">Commits</span>
              </div>
              <p className="text-xs text-gray-400">Total Contributions</p>
            </div>
          </div>
          <div className="text-3xl font-black mb-0.5">{stats.public_repos}</div>
          <p className="text-xs text-gray-400 mb-4">public repositories</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2">
              <span className="text-gray-500 font-medium">Achievements</span>
              <span className="font-black">Pull Shark · Arctic Vault</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2">
              <span className="text-gray-500 font-medium">Streak</span>
              <span className="font-black">{stats.streak_days} days</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2">
              <span className="text-gray-500 font-medium">PRs Merged</span>
              <span className="font-black">{stats.prs_merged}</span>
            </div>
          </div>
        </div>

        <div id="contribution-graph" className="col-span-1 lg:col-span-2 border-2 border-black rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm">Contribution Activity</h3>
          </div>
          <div className="w-full flex items-center justify-center mb-4 overflow-x-auto">
            <GithubCalendarClient username="Fiyanz" />
          </div>
          <div className="grid grid-cols-2 lg:flex gap-3">
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
                <div className="text-xs text-gray-400">{stats.streak_days} days</div>
              </div>
            </div>
            <div className="flex-1 border-2 border-black rounded-xl p-2 flex items-center gap-2 bg-gray-50">
              <div className="w-7 h-7 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-star text-xs text-gray-600"></i>
              </div>
              <div>
                <div className="text-xs font-black">Stars</div>
                <div className="text-xs text-gray-400">{stats.total_stars} total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
