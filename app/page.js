"use client";
import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Layers, Search, Plus, ArrowUpRight, ArrowDownRight, Clock, ChevronRight } from 'lucide-react';

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const DUMMY_STATS = {
  totalProducts: 148,
  totalStock: 12463,
  lowStock: 7,
  movements: 456,
  pendingOrders: 8,
  revenue: 284500,
};

const DUMMY_ACTIVITY = [
  { id: 'TRX-9823', name: 'High-Performance GPU RTX 4090', type: 'IN', quantity: 200, date: '27 Mar 2026, 09:14', category: 'Electronics' },
  { id: 'TRX-9824', name: 'Gaming Mouse Razer Viper 16K', type: 'OUT', quantity: 5, date: '27 Mar 2026, 08:45', category: 'Peripherals' },
  { id: 'TRX-9825', name: 'Thunderbolt Dock Pro 4', type: 'OUT', quantity: 2, date: '26 Mar 2026, 16:30', category: 'Accessories' },
  { id: 'TRX-9826', name: 'Samsung SSD 990 Pro 2TB', type: 'IN', quantity: 50, date: '26 Mar 2026, 14:22', category: 'Storage' },
  { id: 'TRX-9827', name: 'Mechanical Keyboard TKL', type: 'IN', quantity: 100, date: '26 Mar 2026, 11:05', category: 'Peripherals' },
];

const LOW_STOCK_ITEMS = [
  { name: 'USB-C Hub Adapter', stock: 2, min: 10, category: 'Accessories' },
  { name: 'Wireless Charger 15W', stock: 3, min: 15, category: 'Chargers' },
  { name: 'HDMI Cable 4K 2m', stock: 1, min: 20, category: 'Cables' },
  { name: 'Webcam 4K HDR', stock: 4, min: 10, category: 'Peripherals' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here&apos;s what&apos;s happening with your inventory.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
            <input className="search-input" placeholder="Quick search..." />
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            <span>New TRX</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={<Layers className="w-6 h-6 text-blue-400" />}
          label="Total Products"
          value={DUMMY_STATS.totalProducts}
          trend="+12"
          trendUp
        />
        <StatCard
          icon={<Package className="w-6 h-6 text-emerald-400" />}
          label="Total Stock"
          value={formatNumber(DUMMY_STATS.totalStock)}
          trend="+8.2%"
          trendUp
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6 text-amber-400" />}
          label="Low Stock Alert"
          value={DUMMY_STATS.lowStock}
          trend="Critical"
          trendDown
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
          label="Weekly Movements"
          value={DUMMY_STATS.movements}
          trend="+24%"
          trendUp
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-bold">Recent Movements</h2>
            <span className="text-emerald-400 text-sm cursor-pointer hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          <div className="glass-table">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4 text-center">Type</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DUMMY_ACTIVITY.map(act => (
                  <tr key={act.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 text-slate-500 font-mono text-xs">{act.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-sm">{act.name}</div>
                      <div className="text-slate-500 text-xs">{act.category}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`badge ${act.type === 'IN' ? 'badge-in' : 'badge-out'}`}>
                        {act.type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{act.quantity}</td>
                    <td className="p-4 text-slate-500 text-xs">{act.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-bold">Low Stock Alerts</h2>
            <span className="badge badge-warning">
              {LOW_STOCK_ITEMS.length} items
            </span>
          </div>
          <div className="space-y-3">
            {LOW_STOCK_ITEMS.map((item, i) => (
              <div key={i} className="stat-card !p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-slate-500 text-xs">{item.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-rose-400 font-bold">{item.stock}/{item.min}</div>
                  <div className="progress-bar w-16 mt-1">
                    <div
                      className="progress-fill bg-rose-500"
                      style={{ width: `${(item.stock / item.min) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendUp, trendDown }) {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800/80 border border-slate-700/30 rounded-xl">{icon}</div>
      </div>
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-extrabold tracking-tighter">{value}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
