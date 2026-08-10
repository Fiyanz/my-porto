'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { href: '/', icon: 'fa-house', label: 'Home' },
    { href: '/projects', icon: 'fa-folder-open', label: 'Projects' },
    { href: '/skills', icon: 'fa-code', label: 'Skills' },
    { href: '/experience', icon: 'fa-briefcase', label: 'Experience' },
    { href: '/certificates', icon: 'fa-certificate', label: 'Certificates' },
    { href: '/contact', icon: 'fa-envelope', label: 'Contact' },
  ];

  return (
    <aside id="sidebar" className={`${isCollapsed ? 'w-20 px-2' : 'w-52 px-4'} hidden md:flex border-r-2 border-black bg-white flex-col py-6 shrink-0 transition-all duration-300 relative`}>
      
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-7 w-7 h-7 border-2 border-black rounded-full bg-white flex items-center justify-center hover:bg-gray-100 z-10 cursor-pointer"
        title="Toggle Sidebar"
      >
        <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-[10px]`}></i>
      </button>

      {/* Logo */}
      <div id="sidebar-logo" className={`flex items-center gap-2 mb-10 ${isCollapsed ? 'justify-center' : 'border-2 border-black rounded-lg px-3 py-2'}`}>
        <div className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold shrink-0">&lt;/&gt;</div>
        {!isCollapsed && <span className="font-black text-lg tracking-tight">PORTO</span>}
      </div>

      {/* Nav items */}
      <nav id="sidebar-nav" className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-gray-900 text-white font-semibold' : 'hover:bg-gray-100 font-medium text-gray-600'} ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
              title={isCollapsed ? link.label : undefined}
            >
              <i className={`fa-solid ${link.icon} ${isCollapsed ? 'text-lg' : 'text-sm'} transition-all shrink-0`}></i>
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}

      </nav>
    </aside>
  );
}
