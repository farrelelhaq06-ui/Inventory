"use client";
import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Database, Globe, Save, Moon, Sun, Monitor } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newTransaction: true,
    weeklyReport: false,
    systemUpdates: true,
  });
  const [theme, setTheme] = useState('dark');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'database', label: 'Database', icon: Database },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and application preferences.</p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-[220px] space-y-1.5 shrink-0 flex overflow-x-auto lg:block pb-2 lg:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`lg:w-full flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="stat-card space-y-6">
              <h3 className="text-lg font-bold">Profile Information</h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                  A
                </div>
                <div>
                  <div className="text-lg font-bold">Admin User</div>
                  <div className="text-slate-500 text-sm">admin@inventosys.com</div>
                  <span className="badge badge-in mt-2 inline-block">Admin</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input className="form-input" defaultValue="Admin User" />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" defaultValue="admin@inventosys.com" />
                </div>
                <div>
                  <label className="form-label">Role</label>
                  <select className="form-select">
                    <option>Admin</option>
                    <option>Staff</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input className="form-input" defaultValue="+62 812 3456 7890" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="stat-card space-y-6">
              <h3 className="text-lg font-bold">Notification Preferences</h3>
              <div className="space-y-4">
                <ToggleItem
                  label="Low Stock Alerts"
                  description="Get notified when stock falls below minimum level"
                  on={notifications.lowStock}
                  onChange={() => setNotifications(p => ({ ...p, lowStock: !p.lowStock }))}
                />
                <ToggleItem
                  label="New Transaction"
                  description="Receive alerts for every stock in/out"
                  on={notifications.newTransaction}
                  onChange={() => setNotifications(p => ({ ...p, newTransaction: !p.newTransaction }))}
                />
                <ToggleItem
                  label="Weekly Report"
                  description="Receive a summary report every Monday"
                  on={notifications.weeklyReport}
                  onChange={() => setNotifications(p => ({ ...p, weeklyReport: !p.weeklyReport }))}
                />
                <ToggleItem
                  label="System Updates"
                  description="Get notified about system maintenance and updates"
                  on={notifications.systemUpdates}
                  onChange={() => setNotifications(p => ({ ...p, systemUpdates: !p.systemUpdates }))}
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="stat-card space-y-6">
              <h3 className="text-lg font-bold">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Current Password</label>
                  <input className="form-input" type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">New Password</label>
                    <input className="form-input" type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input className="form-input" type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-700/30 pt-6 mt-6 space-y-4">
                <h4 className="font-semibold">Two-Factor Authentication</h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div>
                    <div className="font-medium text-sm">Authenticator App</div>
                    <div className="text-slate-500 text-xs">Use Google Authenticator or Authy</div>
                  </div>
                  <span className="badge badge-warning">Not Set Up</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary">
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="stat-card space-y-6">
              <h3 className="text-lg font-bold">Appearance</h3>
              <div>
                <label className="form-label">Theme</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  {[
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'system', label: 'System', icon: Monitor },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${
                        theme === t.id
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-800/30 border-slate-700/30 text-slate-400 hover:bg-slate-700/30'
                      }`}
                    >
                      <t.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">Accent Color</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#ec4899'].map(color => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-xl border-2 border-transparent hover:border-white/30 transition-all hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">Language</label>
                <select className="form-select w-60">
                  <option>English</option>
                  <option>Bahasa Indonesia</option>
                  <option>日本語</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="stat-card space-y-6">
              <h3 className="text-lg font-bold">Database Configuration</h3>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 pulse-glow"></div>
                <span className="text-emerald-400 text-sm font-medium">Connected to Supabase</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Supabase URL</label>
                  <input className="form-input" defaultValue="https://noqduuslmfwyzgpwetho.supabase.co" readOnly />
                </div>
                <div>
                  <label className="form-label">Anon Key</label>
                  <input className="form-input" defaultValue="eyJhbGciOi...••••••••" readOnly />
                </div>
              </div>
              <div className="border-t border-slate-700/30 pt-6 space-y-3">
                <h4 className="font-semibold">Database Stats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/20 text-center">
                    <div className="text-2xl font-bold">148</div>
                    <div className="text-slate-500 text-xs">Products</div>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/20 text-center">
                    <div className="text-2xl font-bold">1,245</div>
                    <div className="text-slate-500 text-xs">Transactions</div>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/20 text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-slate-500 text-xs">Categories</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, description, on, onChange }) {
  return (
    <div className="flex items-start sm:items-center justify-between gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/20">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-slate-500 text-xs">{description}</div>
      </div>
      <button onClick={onChange} className={`toggle-track relative ${on ? 'on' : 'off'}`}>
        <div className={`toggle-thumb ${on ? 'left-[22px]' : 'left-0.5'}`}></div>
      </button>
    </div>
  );
}
