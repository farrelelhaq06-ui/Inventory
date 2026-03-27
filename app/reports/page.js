"use client";
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Package, DollarSign, BarChart3, PieChart, Activity, Calendar, Download, ChevronDown } from 'lucide-react';

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const MONTHLY_DATA = [
  { month: 'Oct', inbound: 420, outbound: 310 },
  { month: 'Nov', inbound: 380, outbound: 290 },
  { month: 'Dec', inbound: 520, outbound: 480 },
  { month: 'Jan', inbound: 450, outbound: 350 },
  { month: 'Feb', inbound: 490, outbound: 410 },
  { month: 'Mar', inbound: 555, outbound: 340 },
];

const CATEGORY_BREAKDOWN = [
  { name: 'Electronics', value: 35, units: 4200, color: '#3b82f6' },
  { name: 'Peripherals', value: 28, units: 3360, color: '#10b981' },
  { name: 'Storage', value: 18, units: 2160, color: '#8b5cf6' },
  { name: 'Accessories', value: 10, units: 1200, color: '#f59e0b' },
  { name: 'Cables', value: 5, units: 600, color: '#ef4444' },
  { name: 'Others', value: 4, units: 480, color: '#6b7280' },
];

const TOP_PRODUCTS = [
  { name: 'NVIDIA RTX 4090', sold: 342, revenue: 547158, trend: 12.5 },
  { name: 'Samsung 990 PRO', sold: 289, revenue: 52001, trend: 8.3 },
  { name: 'Razer Viper V3', sold: 256, revenue: 40959, trend: -2.1 },
  { name: 'MX Master 3S', sold: 198, revenue: 19798, trend: 15.7 },
  { name: 'Corsair K100', sold: 167, revenue: 38408, trend: 5.2 },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState('monthly');
  const maxInbound = Math.max(...MONTHLY_DATA.map(d => d.inbound));

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Insights and performance metrics for your inventory.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2">
            {['weekly', 'monthly', 'yearly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                  period === p
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:bg-slate-700/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard icon={<DollarSign className="w-5 h-5 text-emerald-400" />} label="Total Revenue" value="$698,324" trend="+18.2%" up />
        <MetricCard icon={<Package className="w-5 h-5 text-blue-400" />} label="Units Sold" value="1,252" trend="+12.5%" up />
        <MetricCard icon={<TrendingUp className="w-5 h-5 text-purple-400" />} label="Avg. Order Value" value="$557.77" trend="+4.8%" up />
        <MetricCard icon={<Activity className="w-5 h-5 text-amber-400" />} label="Return Rate" value="2.3%" trend="-0.5%" up />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar Chart - Stock Flow */}
        <div className="xl:col-span-2 stat-card space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Stock Flow Overview</h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Inbound</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Outbound</span>
            </div>
          </div>
          <div className="flex items-end gap-4 h-[200px]">
            {MONTHLY_DATA.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end h-[180px]">
                  <div className="flex-1 rounded-t-lg bg-emerald-500/80 transition-all hover:bg-emerald-400" style={{ height: `${(d.inbound / maxInbound) * 100}%` }} title={`In: ${d.inbound}`}></div>
                  <div className="flex-1 rounded-t-lg bg-rose-500/60 transition-all hover:bg-rose-400" style={{ height: `${(d.outbound / maxInbound) * 100}%` }} title={`Out: ${d.outbound}`}></div>
                </div>
                <span className="text-slate-500 text-xs font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="stat-card space-y-5">
          <h3 className="font-bold text-lg">Category Breakdown</h3>
          <div className="space-y-4">
            {CATEGORY_BREAKDOWN.map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                  <span className="text-slate-500">{cat.value}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="stat-card space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Top Selling Products</h3>
          <span className="text-slate-500 text-xs">Last 30 days</span>
        </div>
        <div className="glass-table">
          <table className="w-full text-left">
            <thead className="bg-slate-900/30 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Product</th>
                <th className="p-4">Units Sold</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TOP_PRODUCTS.map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                  <td className="p-4 text-slate-500 font-bold">{i + 1}</td>
                  <td className="p-4 font-semibold text-sm">{p.name}</td>
                  <td className="p-4 font-medium">{formatNumber(p.sold)}</td>
                  <td className="p-4 text-emerald-400 font-bold">${formatNumber(p.revenue)}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-xs font-semibold ${p.trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {p.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {p.trend >= 0 ? '+' : ''}{p.trend}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, up }) {
  return (
    <div className="stat-card !p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-slate-800/80 rounded-lg">{icon}</div>
        <span className="text-slate-500 text-xs font-medium">{label}</span>
      </div>
      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
      <div className={`text-xs font-semibold mt-1 flex items-center gap-1 ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {trend}
      </div>
    </div>
  );
}
