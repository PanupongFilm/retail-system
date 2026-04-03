'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  LineChart, 
  Bot, 
  Settings
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/market-scout', label: 'Market Scout', icon: LineChart },
    { href: '/ai-insight', label: 'AI Insight', icon: Bot },
    { href: '/automation', label: 'Automation', icon: Settings },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-600 via-slate-500 to-blue-400 px-6 py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
        </Link>
        
        {/* Nav Links */}
        <nav className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-white text-slate-700 shadow-md' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <div className="text-white text-sm font-medium">
            <div>TU Fruit</div>
            <div className="text-xs opacity-80">Free Plan</div>
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-700 font-semibold shadow-md">
            S
          </div>
        </div>
      </div>
    </header>
  );
}
