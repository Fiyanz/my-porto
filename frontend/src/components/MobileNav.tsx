'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: 'fa-house' },
    { href: '/projects', icon: 'fa-folder-open' },
    { href: '/skills', icon: 'fa-code' },
    { href: '/experience', icon: 'fa-briefcase' },
    { href: '/certificates', icon: 'fa-certificate' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black z-50 flex md:hidden items-center justify-around h-16 px-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <i className={`fa-solid ${link.icon} text-lg`}></i>
          </Link>
        );
      })}
    </nav>
  );
}
