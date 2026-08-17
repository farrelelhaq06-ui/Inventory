"use client";
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Package, DollarSign, Activity, Download, X, Filter, ShoppingCart, ShoppingBag, MapPin, Search } from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Legend
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
  { name: 'Laptop Pro 14"', sold: 324, revenue: 125324, trend: 18.5, color: '#10b981' },
  { name: 'Wireless Mouse', sold: 210, revenue: 83612, trend: 12.3, color: '#3b82f6' },
  { name: 'SSD 1TB Gen4', sold: 183, revenue: 72911, trend: 10.4, color: '#8b5cf6' },
  { name: 'Mechanical Keyboard', sold: 155, revenue: 61223, trend: 6.7, color: '#f59e0b' },
];

const CUSTOMER_TYPE_DATA = [
  { type: 'Retail', value: 3247 },
  { type: 'Wholesale', value: 1445 },
  { type: 'Online', value: 5112 },
  { type: 'Corporate', value: 5601 },
];

const RETURN_REASONS = [
  { reason: 'Defective', value: 45 },
  { reason: 'Wrong Item', value: 25 },
  { reason: 'Changed Mind', value: 15 },
  { reason: 'Shipping Damage', value: 10 },
  { reason: 'Other', value: 5 },
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

export default function ReportsPage() {
  const [period, setPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('overview'); // overview, revenue, units, aov, returns

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
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-emerald-500 pt-6 mt-6">
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
                 {TOP_PRODUCTS.map((p, i) => (
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
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-blue-500 pt-6 mt-6">
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
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-purple-500 pt-6 mt-6">
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
          <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 border-t-4 border-t-amber-500 pt-6 mt-6">
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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title text-4xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent pb-1">Reports & Analytics</h1>
          <p className="page-subtitle">Deep insights into your inventory performance and trends.</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
            {['Weekly', 'Monthly', 'Yearly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p.toLowerCase())}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  period === p.toLowerCase()
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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

      {/* Interactive Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
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
      </div>

      {/* Dynamic Deep Dive Domain */}
      <div className="transition-all duration-500 overflow-hidden">
        {renderDynamicContent()}
      </div>

      {/* Advanced Charts Section (Visible by Default) */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 transition-opacity duration-500 ${selectedMetric !== 'overview' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Stock Flow Deep Dive - Composed Chart */}
        <div className="xl:col-span-2 stat-card space-y-6 border border-slate-700/50 bg-slate-900/40 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-colors"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4">
            <div>
              <h3 className="font-bold text-xl flex items-center gap-2">Stock Flow Overview</h3>
              <p className="text-slate-500 text-sm mt-1">Inbound vs Outbound vs Net Flow</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium bg-slate-950/50 p-2 px-4 rounded-full border border-slate-800">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span> Inbound</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]"></span> Outbound</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span> Net Flow</span>
            </div>
          </div>
          
          <div className="h-[350px] w-full relative z-10 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_DATA} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
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
                
                <Bar dataKey="inbound" name="Inbound" fill="url(#colorInbound)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="outbound" name="Outbound" fill="url(#colorOutbound)" radius={[4, 4, 0, 0]} barSize={20} />
                <Line type="monotone" dataKey="net" name="Net Flow" stroke="#22d3ee" strokeWidth={3} dot={{r: 4, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2}} activeDot={{r: 6, shadow: "0 0 10px #22d3ee"}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Advanced Donut - Category Breakdown */}
        <div className="stat-card space-y-5 border border-slate-700/50 bg-slate-900/40 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-500/10 transition-colors"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <h3 className="font-bold text-xl">Category Breakdown</h3>
            <span className="text-blue-400 text-xs font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          
          <div className="flex-1 flex flex-col relative z-10">
            {/* Donut Chart */}
            <div className="h-[200px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
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
                <span className="text-3xl font-black text-white">+5,320</span>
                <span className="text-xs text-slate-400 font-medium">Net Items</span>
              </div>
            </div>

            {/* Advanced Progress Bars */}
            <div className="space-y-4 mt-auto">
              {CATEGORY_BREAKDOWN.slice(0, 4).map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">{cat.name}</span>
                    <div className="flex gap-4">
                      <span className="text-slate-400">${formatNumber(cat.revenue)}</span>
                      <span className="text-white w-8 text-right">{cat.value}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full relative"
                      style={{ width: `${cat.value}%`, backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}80` }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 rounded-full blur-[2px]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Advanced Interactive Metric Card with Sparkline
function MetricCard({ icon, label, value, trend, up, down, color, data, dataKey, id, isSelected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`stat-card relative overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 group !p-5 ${
        isSelected 
          ? 'ring-2 scale-[1.02] shadow-2xl bg-slate-800/90 z-10' 
          : 'hover:scale-[1.02] hover:bg-slate-800/60'
      }`}
      style={{
        boxShadow: isSelected ? `0 10px 40px -10px ${color}40` : '',
        borderColor: isSelected ? color : 'rgba(255, 255, 255, 0.06)'
      }}
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-700/50" style={{color: color}}>{icon}</div>
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</span>
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
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#gradient-${id})`} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
