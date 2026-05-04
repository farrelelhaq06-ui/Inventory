"use client";
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ArrowLeftRight, BarChart3, Settings, LogOut, Box, Menu, X, Search, Bell } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/products', icon: Package, label: 'Products' },
  { href: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>InventoSys | Professional Inventory Management</title>
        <meta name="description" content="Next.js Powered Stock & Inventory Management System" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-outfit antialiased bg-slate-950 text-slate-50">
        <div className="flex min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 p-4 flex justify-between items-center z-40">
            <div className="flex items-center gap-2">
              <div className="sidebar-logo !w-8 !h-8">
                <Box className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                InventoSys
              </span>
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-300 p-1">
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <aside className={`sidebar transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="flex items-center gap-3 mb-12">
              <div className="sidebar-logo">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                InventoSys
              </span>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-4">
              <div className="nav-item text-rose-500 hover:bg-rose-500/10 hover:text-rose-400">
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Logout</span>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen max-w-[100vw] lg:max-w-[1240px] overflow-x-hidden">
            
            {/* Global Top Header (Desktop & Large screens) */}
            <header className="hidden lg:flex items-center justify-between p-8 pb-0 w-full z-30">
              <div className="relative w-full max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search anywhere (Press '/' to focus)" 
                  className="w-full bg-slate-900/50 border border-slate-800 py-3 pl-11 pr-4 rounded-2xl text-sm transition-all focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:bg-slate-900 shadow-sm"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                </button>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                  <div className="h-full w-full bg-slate-900 rounded-[10px] overflow-hidden flex items-center justify-center">
                    <span className="font-bold text-sm text-white">AD</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Viewport */}
            <main className="flex-1 p-4 pt-24 lg:p-8 w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
