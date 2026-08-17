"use client";
import React from 'react';
import { X, User, Settings, Shield, Bell, LogOut, Mail, Key } from 'lucide-react';

export default function ProfileSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Right Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-[320px] bg-slate-900/95 border-l border-slate-800/50 shadow-2xl z-[70] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col backdrop-blur-xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <h2 className="text-xl font-bold tracking-tight text-white">Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* User Info */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-1">
                <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-black text-white">AD</span>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-[3px] border-slate-900 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-white">Admin User</h3>
            <p className="text-sm text-slate-400 font-medium">Administrator</p>
            <span className="mt-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
              Online
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Account</h4>
            <ProfileLink icon={User} label="Personal Information" />
            <ProfileLink icon={Mail} label="Email Settings" />
            <ProfileLink icon={Key} label="Password & Security" />
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Preferences</h4>
            <ProfileLink icon={Bell} label="Notifications" />
            <ProfileLink icon={Settings} label="System Settings" />
            <ProfileLink icon={Shield} label="Privacy & Data" />
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800/50 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl font-bold transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function ProfileLink({ icon: Icon, label }) {
  return (
    <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all text-left">
      <Icon className="w-5 h-5 text-slate-400" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
