"use client";
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Package, DollarSign, Activity, Download, 
  X, AlertTriangle, Monitor, Mouse, Search, Keyboard, Layers,
  ChevronRight, Calendar, ArrowRightLeft, CheckCircle2, RotateCcw
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart
} from 'recharts';

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Data Sets
const MONTHLY_DATA = [
  { month: 'Oct', inbound: 12000, outbound: 8500, net: 3500 },
  { month: 'Nov', inbound: 15400, outbound: 9100, net: 6300 },
  { month: 'Dec', inbound: 18200, outbound: 15400, net: 2800 },
  { month: 'Jan', inbound: 14200, outbound: 9100, net: 5100 },
  { month: 'Feb', inbound: 16500, outbound: 11200, net: 5300 },
  { month: 'Mar', inbound: 19800, outbound: 14300, net: 5500 },
  { month: 'Apr', inbound: 17500, outbound: 12400, net: 5100 },
  { month: 'May', inbound: 18100, outbound: 13200, net: 4900 },
  { month: 'Jun', inbound: 20500, outbound: 16800, net: 3700 },
];

const CATEGORY_BREAKDOWN = [
  { name: 'Electronics', value: 35, revenue: 244413, color: '#3b82f6' },
  { name: 'Peripherals', value: 28, revenue: 195002, color: '#10b981' },
  { name: 'Storage', value: 18, revenue: 125972, color: '#8b5cf6' },
  { name: 'Accessories', value: 10, revenue: 69842, color: '#f59e0b' },
  { name: 'Cables', value: 5, revenue: 34936, color: '#ef4444' },
  { name: 'Others', value: 4, revenue: 27159, color: '#6b7280' },
];

const REVENUE_TREND_DATA = [
  { day: 'Mon', revenue: 45000 }, { day: 'Tue', revenue: 52000 }, { day: 'Wed', revenue: 48000 },
  { day: 'Thu', revenue: 61000 }, { day: 'Fri', revenue: 59000 }, { day: 'Sat', revenue: 75000 },
  { day: 'Sun', revenue: 68000 },
];

const UNITS_SOLD_DATA = [
  { day: 'Mon', units: 120 }, { day: 'Tue', units: 150 }, { day: 'Wed', units: 110 },
  { day: 'Thu', units: 180 }, { day: 'Fri', units: 175 }, { day: 'Sat', units: 220 },
  { day: 'Sun', units: 190 },
];

const TOP_PRODUCTS = [
  { name: 'Laptop Pro', sold: 324, revenue: 78432, trend: 18.5, color: '#ef4444', icon: <Monitor className="w-4 h-4 text-white"/> },
  { name: 'Wireless Mouse', sold: 290, revenue: 12543, trend: 12.3, color: '#3b82f6', icon: <Mouse className="w-4 h-4 text-white"/> },
  { name: 'USB-C Hub', sold: 220, revenue: 9210, trend: 10.4, color: '#64748b', icon: <Layers className="w-4 h-4 text-white"/> },
  { name: 'Keyboard Pro', sold: 185, revenue: 6321, trend: 6.7, color: '#64748b', icon: <Keyboard className="w-4 h-4 text-white"/> },
  { name: 'Monitor 24"', sold: 150, revenue: 5210, trend: 5.2, color: '#f59e0b', icon: <Monitor className="w-4 h-4 text-white"/> },
];

const LOW_STOCK_ITEMS = [
  { name: 'USB-C Hub Adapter', stock: 2, min: 10, category: 'Accessories' },
  { name: 'Wireless Charger 15W', stock: 3, min: 15, category: 'Chargers' },
  { name: 'HDMI Cable 4K 2m', stock: 1, min: 20, category: 'Cables' },
  { name: 'Webcam 4K HDR', stock: 4, min: 10, category: 'Peripherals' },
];

const CUSTOMER_TYPE_DATA = [
  { type: 'Retail', value: 3247 }, { type: 'Wholesale', value: 1445 }, { type: 'Online', value: 5112 }, { type: 'Corporate', value: 5601 },
];

const RETURN_REASONS = [
  { reason: 'Defective', value: 45 }, { reason: 'Wrong Item', value: 25 }, { reason: 'Changed Mind', value: 15 }, { reason: 'Shipping Damage', value: 10 }, { reason: 'Other', value: 5 },
];

// Helper for custom tooltips
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl z-50">
        <p className="text-slate-300 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-slate-400">{entry.name}:</span>
            <span className="font-bold text-white">
              {entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('value') ? '$' : ''}
              {formatNumber(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [period, setPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const handleMetricClick = (metricId) => {
    if (selectedMetric === metricId) {
      setSelectedMetric('overview');
    } else {
      setSelectedMetric(metricId);
    }
  };

  const renderDynamicContent = () => {
    switch (selectedMetric) {
      case 'revenue':
        return (
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-emerald-500 pt-6 mt-6 mb-8">
             <div className="xl:col-span-2 stat-card space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-400"/> Revenue Deep Dive</h3>
                  <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="stat-card space-y-4">
               <h3 className="font-bold text-lg">Top Revenue Products</h3>
               <div className="space-y-4">
                 {TOP_PRODUCTS.slice(0, 4).map((p, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center font-bold text-xs" style={{color: p.color}}>{i+1}</div>
                       <div>
                         <div className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">{p.name}</div>
                         <div className="text-slate-500 text-xs">{p.sold} units</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="font-bold text-sm">${formatNumber(p.revenue)}</div>
                       <div className="text-emerald-400 text-xs flex items-center justify-end gap-1"><TrendingUp className="w-3 h-3"/> {p.trend}%</div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        );
      case 'units':
        return (
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-blue-500 pt-6 mt-6 mb-8">
             <div className="xl:col-span-2 stat-card space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center gap-2"><Package className="w-5 h-5 text-blue-400"/> Units Sold Analysis</h3>
                  <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={UNITS_SOLD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={30}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b', opacity: 0.4}} />
                      <Bar dataKey="units" name="Units" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="stat-card space-y-4">
               <h3 className="font-bold text-lg">Sales Trend</h3>
               <div className="flex flex-col items-center justify-center h-[250px]">
                  <div className="text-5xl font-black text-blue-400">1,252</div>
                  <div className="text-slate-400 mt-2">Total Units This Month</div>
                  <div className="mt-8 flex gap-4 w-full px-4">
                    <div className="flex-1 bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
                      <div className="text-xs text-slate-400">Daily Avg</div>
                      <div className="font-bold text-lg mt-1">42</div>
                    </div>
                    <div className="flex-1 bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
                      <div className="text-xs text-slate-400">Target</div>
                      <div className="font-bold text-lg mt-1">1,500</div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        );
      case 'aov':
        return (
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-purple-500 pt-6 mt-6 mb-8">
             <div className="xl:col-span-2 stat-card space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-purple-400"/> Average Order Value (AOV)</h3>
                  <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
                </div>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={REVENUE_TREND_DATA.map(d => ({day: d.day, aov: d.revenue / (Math.random() * 50 + 50)}))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${Math.round(val)}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="aov" name="AOV" stroke="#8b5cf6" strokeWidth={4} dot={{r: 4, fill: '#8b5cf6', stroke: '#0f172a', strokeWidth: 2}} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="stat-card space-y-4">
               <h3 className="font-bold text-lg">AOV By Customer Type</h3>
               <div className="space-y-5 mt-6">
                 {CUSTOMER_TYPE_DATA.map((c, i) => (
                   <div key={i}>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-300">{c.type}</span>
                       <span className="font-bold">${formatNumber(c.value)}</span>
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 rounded-full" style={{width: `${(c.value / 6000) * 100}%`}}></div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        );
      case 'returns':
        return (
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-amber-500 pt-6 mt-6 mb-8">
             <div className="xl:col-span-1 stat-card space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center gap-2"><TrendingDown className="w-5 h-5 text-amber-400"/> Return Rate Insights</h3>
                  <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
                </div>
                <div className="h-[250px] w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={RETURN_REASONS} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#3b82f6" />
                        <Cell fill="#64748b" />
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="xl:col-span-2 stat-card space-y-4">
               <h3 className="font-bold text-lg">Return Reasons Breakdown</h3>
               <div className="grid grid-cols-2 gap-4 mt-4">
                 {RETURN_REASONS.map((r, i) => (
                    <div key={i} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-3 h-3 rounded-full" style={{backgroundColor: ['#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6', '#64748b'][i]}}></div>
                         <span className="text-slate-300 font-medium">{r.reason}</span>
                      </div>
                      <span className="font-bold text-white">{r.value}%</span>
                    </div>
                 ))}
               </div>
             </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="animate-fade-in space-y-4 glass-table p-6 border-t-4 border-t-rose-500 pt-6 mt-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-rose-400"/> Critical Low Stock Details</h2>
              <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {LOW_STOCK_ITEMS.map((item, i) => (
                <div key={i} className="stat-card !p-4 flex flex-col justify-between border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-colors">
                  <div className="mb-4">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-slate-400 text-xs">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-400 font-bold text-2xl">{item.stock} <span className="text-sm font-normal">/ {item.min} min</span></div>
                    <div className="progress-bar w-full mt-2 bg-slate-900/50">
                      <div className="progress-fill bg-rose-500 shadow-[0_0_10px_#ef4444]" style={{ width: `${(item.stock / item.min) * 100}%` }} />
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded transition-colors text-xs">
                    Reorder Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="page-header">
        <div>
          <h1 className="page-title text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent pb-1">Dashboard Overview 👋</h1>
          <p className="page-subtitle text-slate-400">Welcome back, Admin! Here&apos;s what&apos;s happening with your inventory today.</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Mar 1 - Mar 31, 2026</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            {['Weekly', 'Monthly', 'Yearly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p.toLowerCase())}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                  period === p.toLowerCase()
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="btn-secondary h-[34px]">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Interactive 5-Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <MetricCard 
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />} 
          label="Total Revenue" 
          value="$698,324" 
          trend="+18.2% vs last month" 
          up 
          color="#10b981"
          data={REVENUE_TREND_DATA}
          dataKey="revenue"
          id="revenue"
          isSelected={selectedMetric === 'revenue'}
          onClick={() => handleMetricClick('revenue')}
        />
        <MetricCard 
          icon={<Package className="w-5 h-5 text-blue-400" />} 
          label="Units Sold" 
          value="1,252" 
          trend="+12.5% vs last month" 
          up 
          color="#3b82f6"
          data={UNITS_SOLD_DATA}
          dataKey="units"
          id="units"
          isBar
          isSelected={selectedMetric === 'units'}
          onClick={() => handleMetricClick('units')}
        />
        <MetricCard 
          icon={<Activity className="w-5 h-5 text-purple-400" />} 
          label="Avg. Order Value" 
          value="$557.77" 
          trend="+4.8% vs last month" 
          up 
          color="#8b5cf6"
          data={REVENUE_TREND_DATA.map(d => ({day: d.day, aov: d.revenue / 100}))}
          dataKey="aov"
          id="aov"
          isSelected={selectedMetric === 'aov'}
          onClick={() => handleMetricClick('aov')}
        />
        <MetricCard 
          icon={<TrendingDown className="w-5 h-5 text-amber-400" />} 
          label="Return Rate" 
          value="2.3%" 
          trend="-0.5% vs last month" 
          down 
          color="#f59e0b"
          data={UNITS_SOLD_DATA.map(d => ({day: d.day, rate: (Math.random() * 2 + 1)}))}
          dataKey="rate"
          id="returns"
          isSelected={selectedMetric === 'returns'}
          onClick={() => handleMetricClick('returns')}
        />
        {/* The 5th Card - Low Stock Alert */}
        <div 
          onClick={() => handleMetricClick('alerts')}
          className={`stat-card relative overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 group !p-5 border border-rose-500/20 bg-rose-500/5 ${
            selectedMetric === 'alerts' ? 'ring-2 ring-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.2)] bg-rose-500/10 scale-[1.02]' : 'hover:scale-[1.02] hover:bg-rose-500/10'
          }`}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity bg-rose-500 group-hover:opacity-40"></div>
          <div className="flex justify-between items-start mb-2 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400"><AlertTriangle className="w-5 h-5"/></div>
              <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Low Stock Alert</span>
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <div className="text-4xl font-black text-rose-500 mb-1">7</div>
            <div className="text-xs font-medium text-rose-400/80 flex justify-between items-center">
              <span>Critical Items</span>
              <span className="border border-rose-500/50 rounded px-2 py-0.5 text-[10px] hover:bg-rose-500/20 transition-colors">View Alerts</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none">
             <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
               <path d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10 L100,20 L0,20 Z" fill="rgba(225,29,72,0.1)" />
               <path d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2"/>
             </svg>
          </div>
        </div>
      </div>

      {/* Dynamic Deep Dive Domain */}
      <div className="transition-all duration-500 overflow-hidden">
        {renderDynamicContent()}
      </div>

      {/* Stock Flow & Category Breakdown Row */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 transition-opacity duration-500 ${selectedMetric !== 'overview' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Stock Flow Overview */}
        <div className="xl:col-span-2 stat-card space-y-6 border border-slate-700/50 bg-slate-900/60 relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4">
            <h3 className="font-bold text-xl">Stock Flow Overview</h3>
            <div className="flex items-center gap-4 text-xs font-medium bg-slate-950 p-2 px-4 rounded-full border border-slate-800">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span> Inbound</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]"></span> Outbound</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span> Net Flow</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b', opacity: 0.3}} />
                
                <Bar dataKey="inbound" name="Inbound" fill="url(#colorInbound)" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="outbound" name="Outbound" fill="url(#colorOutbound)" radius={[4, 4, 0, 0]} barSize={16} />
                <Line type="monotone" dataKey="net" name="Net Flow" stroke="#22d3ee" strokeWidth={3} dot={{r: 4, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2}} activeDot={{r: 6, shadow: "0 0 10px #22d3ee"}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Advanced Donut - Category Breakdown */}
        <div className="stat-card space-y-4 border border-slate-700/50 bg-slate-900/60 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
          <div className="flex justify-between items-center relative z-10">
            <h3 className="font-bold text-lg">Category Breakdown</h3>
            <span className="text-blue-400 text-xs font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          
          <div className="flex-1 flex flex-col relative z-10">
            <div className="h-[180px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {CATEGORY_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white">+5,320</span>
                <span className="text-[10px] text-slate-400 font-medium">Net Items</span>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              {CATEGORY_BREAKDOWN.slice(0, 4).map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span className="text-slate-300">{cat.name}</span>
                    <div className="flex gap-3">
                      <span className="text-slate-400">${formatNumber(cat.revenue)}</span>
                      <span className="text-white w-6 text-right">{cat.value}%</span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full relative"
                      style={{ width: `${cat.value}%`, backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}80` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Deep Dive, Top Products, Recent Activity */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${selectedMetric !== 'overview' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Stock Flow Deep Dive (Custom Diagram) */}
        <div className="stat-card border border-slate-700/50 bg-slate-900/60 p-5">
           <h3 className="font-bold text-lg mb-6">Stock Flow Deep Dive</h3>
           <div className="flex justify-between items-center relative mt-8 px-2">
             
             {/* Left - Inbound */}
             <div className="w-1/3 flex flex-col gap-3 relative z-10">
               <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Inbound<br/><span className="text-[10px] text-emerald-500/70">Total 12,450</span></div>
               <div className="bg-emerald-500/20 border border-emerald-500/50 rounded px-2 py-1.5 flex justify-between text-[10px] items-center group cursor-pointer hover:bg-emerald-500/30">
                  <span className="text-slate-300">Purchase</span>
                  <span className="text-emerald-400 font-bold">7,820 <span className="text-emerald-500/70 font-normal">(62.8%)</span></span>
               </div>
               <div className="bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-1.5 flex justify-between text-[10px] items-center group cursor-pointer hover:bg-emerald-500/20">
                  <span className="text-slate-300">Return</span>
                  <span className="text-emerald-400 font-bold">2,150 <span className="text-emerald-500/70 font-normal">(17.3%)</span></span>
               </div>
               <div className="bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-1.5 flex justify-between text-[10px] items-center group cursor-pointer hover:bg-emerald-500/20">
                  <span className="text-slate-300">Transfer In</span>
                  <span className="text-emerald-400 font-bold">1,980 <span className="text-emerald-500/70 font-normal">(15.9%)</span></span>
               </div>
             </div>
             
             {/* Center - Net Flow Circle */}
             <div className="w-24 h-24 rounded-full border-4 border-cyan-500/50 bg-slate-900 shadow-[0_0_30px_#22d3ee40] flex flex-col items-center justify-center relative z-20 shrink-0 mx-2">
                <div className="text-xs text-slate-400 font-medium">Net Flow</div>
                <div className="text-xl font-black text-white">+5,320</div>
                <div className="text-[10px] text-slate-500">Items</div>
             </div>

             {/* Right - Outbound */}
             <div className="w-1/3 flex flex-col gap-3 relative z-10 text-right">
               <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 text-right">Outbound<br/><span className="text-[10px] text-rose-500/70">Total 7,130</span></div>
               <div className="bg-rose-500/20 border border-rose-500/50 rounded px-2 py-1.5 flex justify-between text-[10px] items-center group cursor-pointer hover:bg-rose-500/30">
                  <span className="text-rose-400 font-bold">5,820 <span className="text-rose-500/70 font-normal">(81.6%)</span></span>
                  <span className="text-slate-300">Sales</span>
               </div>
               <div className="bg-rose-500/10 border border-rose-500/30 rounded px-2 py-1.5 flex justify-between text-[10px] items-center group cursor-pointer hover:bg-rose-500/20">
                  <span className="text-rose-400 font-bold">720 <span className="text-rose-500/70 font-normal">(10.1%)</span></span>
                  <span className="text-slate-300">Return</span>
               </div>
               <div className="bg-rose-500/10 border border-rose-500/30 rounded px-2 py-1.5 flex justify-between text-[10px] items-center group cursor-pointer hover:bg-rose-500/20">
                  <span className="text-rose-400 font-bold">490 <span className="text-rose-500/70 font-normal">(6.9%)</span></span>
                  <span className="text-slate-300">Transfer Out</span>
               </div>
             </div>

             {/* Connecting SVG Lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
               <path d="M 33% 30% C 45% 30%, 45% 50%, 50% 50%" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="40" strokeLinecap="round" />
               <path d="M 50% 50% C 55% 50%, 55% 30%, 66% 30%" fill="none" stroke="rgba(225, 29, 72, 0.3)" strokeWidth="30" strokeLinecap="round" />
             </svg>
           </div>
           
           {/* Flow Summary Mini Table */}
           <div className="mt-8 pt-4 border-t border-slate-700/50 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Inbound</span><span className="text-white font-medium">12,450</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Outbound</span><span className="text-white font-medium">7,130</span></div>
              <div className="flex justify-between font-bold"><span className="text-slate-400">Net Flow</span><span className="text-emerald-400">+5,320</span></div>
              <div className="flex justify-between pt-2 mt-2 border-t border-slate-700/50"><span className="text-slate-400">Net Value</span><span className="text-emerald-400 font-bold text-sm">$254,830</span></div>
           </div>
        </div>

        {/* Top Selling Products */}
        <div className="stat-card border border-slate-700/50 bg-slate-900/60 p-5">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-lg">Top Selling Products</h3>
             <span className="text-blue-400 text-xs font-semibold cursor-pointer hover:underline">View All</span>
           </div>
           
           <div className="space-y-4">
             <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider px-2">
               <span>Product</span>
               <div className="flex gap-6 w-1/3 justify-end text-right">
                 <span className="w-12">Sold</span>
                 <span className="w-16">Revenue</span>
               </div>
             </div>
             
             {TOP_PRODUCTS.map((product, i) => (
               <div key={i} className="flex justify-between items-center group p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                 <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg" style={{backgroundColor: `${product.color}20`}}>
                     {React.cloneElement(product.icon, { style: { color: product.color }})}
                   </div>
                   <span className="font-medium text-sm group-hover:text-white transition-colors text-slate-300">{product.name}</span>
                 </div>
                 <div className="flex gap-6 w-1/3 justify-end text-right text-xs">
                   <span className="w-12 text-slate-300">{product.sold}</span>
                   <span className="w-16 font-bold text-white">${formatNumber(product.revenue)}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Recent Activity */}
        <div className="stat-card border border-slate-700/50 bg-slate-900/60 p-5">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-lg">Recent Activity</h3>
             <span className="text-blue-400 text-xs font-semibold cursor-pointer hover:underline">View All</span>
           </div>
           
           <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
             
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-blue-500 text-white shadow shrink-0 z-10">
                  <Package className="w-3 h-3"/>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-700/50 bg-slate-800/50 shadow ml-4 md:ml-0 group-hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-xs">New Order</span>
                    <time className="text-[10px] text-slate-500">10m ago</time>
                  </div>
                  <div className="text-slate-400 text-[11px]">Laptop Pro 15 units received.</div>
                </div>
             </div>
             
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-emerald-500 text-white shadow shrink-0 z-10">
                  <CheckCircle2 className="w-3 h-3"/>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-700/50 bg-slate-800/50 shadow ml-4 md:ml-0 group-hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-xs">Stock Updated</span>
                    <time className="text-[10px] text-slate-500">25m ago</time>
                  </div>
                  <div className="text-slate-400 text-[11px]">USB-C Cable stock increased.</div>
                </div>
             </div>

             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-rose-500 text-white shadow shrink-0 z-10">
                  <AlertTriangle className="w-3 h-3"/>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-700/50 bg-slate-800/50 shadow ml-4 md:ml-0 group-hover:border-rose-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-xs">Low Stock</span>
                    <time className="text-[10px] text-slate-500">1h ago</time>
                  </div>
                  <div className="text-slate-400 text-[11px] text-rose-400/80">Wireless Mouse running low.</div>
                </div>
             </div>

             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-amber-500 text-white shadow shrink-0 z-10">
                  <RotateCcw className="w-3 h-3"/>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-700/50 bg-slate-800/50 shadow ml-4 md:ml-0 group-hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-xs">Return Processed</span>
                    <time className="text-[10px] text-slate-500">2h ago</time>
                  </div>
                  <div className="text-slate-400 text-[11px]">Wireless Mouse returned.</div>
                </div>
             </div>

             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-purple-500 text-white shadow shrink-0 z-10">
                  <ArrowRightLeft className="w-3 h-3"/>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-700/50 bg-slate-800/50 shadow ml-4 md:ml-0 group-hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-xs">Transfer Done</span>
                    <time className="text-[10px] text-slate-500">3h ago</time>
                  </div>
                  <div className="text-slate-400 text-[11px]">From Warehouse A to B.</div>
                </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
}

// Advanced Interactive Metric Card with Sparkline
function MetricCard({ icon, label, value, trend, up, down, color, data, dataKey, id, isSelected, onClick, isBar }) {
  return (
    <div 
      onClick={onClick}
      className={`stat-card relative overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 group !p-5 border border-slate-700/50 ${
        isSelected 
          ? 'ring-2 scale-[1.02] shadow-2xl bg-slate-800/90 z-10' 
          : 'hover:scale-[1.02] bg-slate-900/60'
      }`}
      style={{
        boxShadow: isSelected ? `0 10px 40px -10px ${color}40` : '',
        borderColor: isSelected ? color : ''
      }}
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-700/50" style={{color: color}}>{icon}</div>
          <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">{label}</span>
        </div>
        <div className={`p-1.5 rounded-full ${isSelected ? 'bg-white/10' : 'bg-transparent'} transition-colors`}>
          <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: color, opacity: isSelected ? 1 : 0.5}}></div>
        </div>
      </div>
      
      <div className="flex justify-between items-end relative z-10 mt-4">
        <div>
          <div className="text-3xl font-extrabold tracking-tight text-white mb-1">{value}</div>
          <div className={`text-xs font-medium flex items-center gap-1 ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        </div>
      </div>

      {/* Embedded Sparkline Chart */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          {isBar ? (
            <BarChart data={data}>
              <Bar dataKey={dataKey} fill={color} radius={[2, 2, 0, 0]} barSize={8} isAnimationActive={false} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
                  <stop offset="100%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#gradient-${id})`} isAnimationActive={false} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
