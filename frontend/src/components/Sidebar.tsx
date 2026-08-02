'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: 'fa-house', label: 'Home' },
    { href: '/projects', icon: 'fa-folder-open', label: 'Projects' },
    { href: '/skills', icon: 'fa-code', label: 'Skills' },
    { href: '/experience', icon: 'fa-briefcase', label: 'Experience' },
    { href: '/contact', icon: 'fa-envelope', label: 'Contact' },
  ];

  return (
    <aside id="sidebar" className="w-52 border-r-2 border-black bg-white flex flex-col py-6 px-4 shrink-0">
      {/* Logo */}
      <div id="sidebar-logo" className="flex items-center gap-2 mb-10 border-2 border-black rounded-lg px-3 py-2">
        <div className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">&lt;/&gt;</div>
        <span className="font-black text-lg tracking-tight">PORTO</span>
      </div>

      {/* Nav items */}
      <nav id="sidebar-nav" className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-gray-900 text-white font-semibold' : 'hover:bg-gray-100 font-medium text-gray-600'}`}
            >
              <i className={`fa-solid ${link.icon} text-xs`}></i>
              <span>{link.label}</span>
            </Link>
          );
        })}

        {/* Spacer */}
        <div className="flex-1"></div>

        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-medium text-sm text-gray-500 mt-auto w-full text-left">
          <i className="fa-solid fa-moon text-xs"></i>
          <span>Dark Mode</span>
        </button>
      </nav>
    </aside>
  );
}
