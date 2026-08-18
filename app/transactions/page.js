"use client";
import React, { useState } from 'react';
import { 
  ArrowDownLeft, ArrowUpRight, Search, Plus, Filter, Calendar, ChevronRight,
  TrendingUp, TrendingDown, Activity, Package, AlertTriangle, Battery, Box, ShoppingCart, Zap, X, Monitor, Layers
} from 'lucide-react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Neon color palette
const COLORS = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
  emerald: '#10b981',
  cyan: '#06b6d4',
  rose: '#f43f5e',
  amber: '#f59e0b',
};

const DUMMY_TRANSACTIONS = [
  { id: 'TRX-9830', product: 'NVIDIA GeForce RTX 4090', type: 'in', quantity: 200, date: '2 hours ago' },
  { id: 'TRX-9829', product: 'Razer Viper V3 Pro', type: 'out', quantity: 5, date: '5 hours ago' },
  { id: 'TRX-9828', product: 'Thunderbolt Dock Pro 4', type: 'out', quantity: 2, date: '1 day ago' },
  { id: 'TRX-9827', product: 'Samsung 990 PRO 2TB', type: 'in', quantity: 50, date: '1 day ago' },
  { id: 'TRX-9826', product: 'Corsair K100 Keyboard', type: 'in', quantity: 100, date: '2 days ago' },
];

const STOCK_LEVEL_DATA = [
  { name: 'Electronics', v1: 65, v2: 45, v3: 80 },
  { name: 'Apparel', v1: 45, v2: 60, v3: 35 },
  { name: 'Hardware', v1: 85, v2: 55, v3: 65 },
  { name: 'Food', v1: 30, v2: 70, v3: 40 },
];

const STOCK_MOVEMENT_DATA = [
  { month: 'Jan', in: 4000, out: 2400 },
  { month: 'Feb', in: 3000, out: 1398 },
  { month: 'Mar', in: 2000, out: 9800 },
  { month: 'Apr', in: 2780, out: 3908 },
  { month: 'May', in: 1890, out: 4800 },
  { month: 'Jun', in: 2390, out: 3800 },
  { month: 'Jul', in: 3490, out: 4300 },
];

const TOP_ITEMS_DATA = [
  { name: 'Item #154', value: 400, color: COLORS.purple },
  { name: 'Item #210', value: 300, color: COLORS.pink },
  { name: 'Item #089', value: 300, color: COLORS.emerald },
  { name: 'Item #342', value: 200, color: COLORS.amber },
];

const SUPPLIER_DATA = [
  { name: 'S1', score: 85, color: COLORS.purple },
  { name: 'S2', score: 65, color: COLORS.pink },
  { name: 'S3', score: 95, color: COLORS.emerald },
  { name: 'S4', score: 45, color: COLORS.blue },
  { name: 'S5', score: 75, color: COLORS.cyan },
];

// Helper for custom glowing tooltips
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-3 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] z-50 text-xs">
        <div className="font-bold text-white mb-2">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{backgroundColor: entry.color || entry.fill, color: entry.color || entry.fill}}></div>
            <span className="text-slate-300">{entry.name}: </span>
            <span className="font-bold text-white" style={{textShadow: `0 0 5px ${entry.color || entry.fill}`}}>{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TransactionsPage() {
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
      case 'level':
        return (
          <div className="animate-fade-in glass-panel p-6 border-t-2 border-t-purple-500 mb-6 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-3 text-purple-400">
                  <Box className="w-6 h-6"/> Stock Level Deep Dive
                </h3>
                <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {STOCK_LEVEL_DATA.map((cat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                     <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 relative z-10">{cat.name}</div>
                     <div className="text-3xl font-black text-white relative z-10 mb-4">{formatNumber((cat.v1 + cat.v2 + cat.v3) * 123)}</div>
                     <div className="space-y-2 relative z-10">
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Warehouse A</span><span className="text-purple-300">{cat.v1}%</span></div>
                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 shadow-[0_0_10px_#8b5cf6]" style={{width: `${cat.v1}%`}}></div></div>
                        <div className="flex justify-between text-xs mt-2"><span className="text-slate-500">Warehouse B</span><span className="text-pink-300">{cat.v2}%</span></div>
                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-pink-500 shadow-[0_0_10px_#ec4899]" style={{width: `${cat.v2}%`}}></div></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'movement':
        return (
          <div className="animate-fade-in glass-panel p-6 border-t-2 border-t-cyan-500 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-3 text-cyan-400">
                  <Activity className="w-6 h-6"/> Movement Analytics
                </h3>
                <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
             </div>
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={STOCK_MOVEMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="deepIn" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.5}/>
                       <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="deepOut" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={COLORS.rose} stopOpacity={0.5}/>
                       <stop offset="95%" stopColor={COLORS.rose} stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.5} />
                   <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                   <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                   <Tooltip content={<CustomTooltip />} />
                   <Area type="monotone" dataKey="in" name="Units In" stroke={COLORS.cyan} strokeWidth={3} fillOpacity={1} fill="url(#deepIn)" style={{filter: `drop-shadow(0px 0px 8px ${COLORS.cyan}80)`}} />
                   <Area type="monotone" dataKey="out" name="Units Out" stroke={COLORS.rose} strokeWidth={3} fillOpacity={1} fill="url(#deepOut)" style={{filter: `drop-shadow(0px 0px 8px ${COLORS.rose}80)`}} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>
        );
      case 'items':
        return (
           <div className="animate-fade-in glass-panel p-6 border-t-2 border-t-emerald-500 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-3 text-emerald-400">
                  <ShoppingCart className="w-6 h-6"/> Top Selling Items Detailed
                </h3>
                <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {TOP_ITEMS_DATA.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex flex-col justify-between">
                     <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_currentColor]" style={{backgroundColor: `${item.color}20`, color: item.color}}>
                          <Package className="w-5 h-5"/>
                       </div>
                       <span className="font-bold text-sm text-white">{item.name}</span>
                     </div>
                     <div>
                       <div className="text-3xl font-black mb-1" style={{color: item.color, textShadow: `0 0 10px ${item.color}80`}}>{item.value}</div>
                       <div className="text-xs text-slate-500">Units Sold This Week</div>
                     </div>
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
    <div className="space-y-6 animate-fade-in pb-10 min-h-screen">
      <header className="page-header relative z-10">
        <div>
          <h1 className="page-title text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pb-1">INVENTORA - ANALYTICS</h1>
          <p className="page-subtitle text-slate-400 tracking-wider text-xs uppercase font-semibold">Live Real-Time Tracking</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-lg p-1 mr-4">
             {['Last 24 Hours', 'This Week', 'Month', 'Custom'].map(p => (
               <button key={p} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${p === 'Last 24 Hours' ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}>
                 {p}
               </button>
             ))}
          </div>
          <button className="btn-primary shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
            <Plus className="w-5 h-5" />
            <span>New Transaction</span>
          </button>
        </div>
      </header>

      {/* Dynamic Deep Dive Domain */}
      <div className="transition-all duration-500 overflow-hidden relative z-10">
        {renderDynamicContent()}
      </div>

      {/* Futuristic Dashboard Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-500 relative z-10 ${selectedMetric !== 'overview' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Main Column Left (Col 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top Row in Left Column: Stock Level & Stock Movement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
             {/* Current Stock Level */}
             <div 
               onClick={() => handleMetricClick('level')}
               className="glass-panel p-6 flex flex-col relative overflow-hidden group cursor-pointer hover:border-purple-500/50 transition-colors"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-1">Current Stock Level</h3>
                    <div className="text-4xl font-black text-white text-glow-purple">84,210 <span className="text-sm font-normal text-slate-400">units</span></div>
                  </div>
                  <div className="bg-slate-800/80 px-3 py-1 rounded border border-slate-700/50 text-xs text-slate-300">Category ▾</div>
                </div>
                
                {/* Simulated Isometric Grouped Bar Chart */}
                <div className="flex-1 w-full h-[200px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={STOCK_LEVEL_DATA} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barGap={2}>
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                      <Bar dataKey="v1" fill="url(#colorV1)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="v2" fill="url(#colorV2)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="v3" fill="url(#colorV3)" radius={[2, 2, 0, 0]} />
                      <defs>
                        <linearGradient id="colorV1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.purple} /><stop offset="100%" stopColor={COLORS.purple} stopOpacity={0.2}/></linearGradient>
                        <linearGradient id="colorV2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.pink} /><stop offset="100%" stopColor={COLORS.pink} stopOpacity={0.2}/></linearGradient>
                        <linearGradient id="colorV3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.emerald} /><stop offset="100%" stopColor={COLORS.emerald} stopOpacity={0.2}/></linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                  {/* Isometric base decoration */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-4 border border-cyan-500/30 bg-cyan-500/5 rounded-[100%] shadow-[0_0_20px_rgba(6,182,212,0.2)] transform -skew-x-[45deg] scale-y-50 pointer-events-none"></div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 mt-4 px-4 relative z-10">
                  {STOCK_LEVEL_DATA.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-2 h-2" style={{backgroundColor: [COLORS.purple, COLORS.pink, COLORS.emerald, COLORS.cyan][i]}}></div>
                      <div className="flex flex-col">
                        <span className="text-white">{d.name}</span>
                        <span>{formatNumber(d.v1 * 1234)}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Stock Movement */}
             <div 
               onClick={() => handleMetricClick('movement')}
               className="glass-panel p-5 flex flex-col relative overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-colors"
             >
                <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Stock Movement</h3>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#06b6d4]"></div> Units in</span>
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_5px_#f43f5e]"></div> / out</span>
                  </div>
                </div>

                <div className="flex-1 w-full relative z-10 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={STOCK_MOVEMENT_DATA} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="neonCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.cyan} stopOpacity={0.6}/><stop offset="100%" stopColor={COLORS.cyan} stopOpacity={0}/></linearGradient>
                        <linearGradient id="neonRose" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.rose} stopOpacity={0.6}/><stop offset="100%" stopColor={COLORS.rose} stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" stroke="#475569" tick={{fill: '#475569', fontSize: 10}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#475569" tick={{fill: '#475569', fontSize: 10}} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="in" stroke={COLORS.cyan} strokeWidth={3} fillOpacity={1} fill="url(#neonCyan)" style={{filter: `drop-shadow(0px 0px 5px ${COLORS.cyan})`}} />
                      <Area type="monotone" dataKey="out" stroke={COLORS.rose} strokeWidth={3} fillOpacity={1} fill="url(#neonRose)" style={{filter: `drop-shadow(0px 0px 5px ${COLORS.rose})`}} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Bottom Row in Left Column: Alerts, Supplier Performance, Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* Alerts Mini Panel */}
             <div className="glass-panel p-5 relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-4 relative z-10">Alerts</h3>
                <div className="flex gap-4 relative z-10 mb-6">
                  <div>
                    <div className="text-3xl font-black text-rose-500 flex items-center gap-1 text-glow-rose">14 <AlertTriangle className="w-4 h-4"/></div>
                    <div className="text-[10px] text-slate-500 uppercase">Critical</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-amber-500 flex items-center gap-1 text-glow-amber">26 <TrendingDown className="w-4 h-4"/></div>
                    <div className="text-[10px] text-slate-500 uppercase">Low Stock</div>
                  </div>
                </div>
                <div className="space-y-3 relative z-10 text-[11px]">
                   <div className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center"><Monitor className="w-2.5 h-2.5"/></div> Electronics Pro...</span><span className="text-slate-400">14 items</span></div>
                   <div className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center"><Box className="w-2.5 h-2.5"/></div> Apparel #213</span><span className="text-slate-400">26 items</span></div>
                   <div className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center"><Layers className="w-2.5 h-2.5"/></div> Hardware Pro...</span><span className="text-slate-400">26 items</span></div>
                   <div className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center"><ShoppingCart className="w-2.5 h-2.5"/></div> Food Store el...</span><span className="text-slate-400">12 items</span></div>
                </div>
             </div>

             {/* Supplier Performance */}
             <div className="glass-panel p-5 relative overflow-hidden group flex flex-col">
               <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-2 relative z-10">Supplier Performance</h3>
               <div className="flex-1 w-full relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SUPPLIER_DATA} margin={{ top: 10, right: 0, left: -25, bottom: 0 }} barSize={12}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" stroke="#475569" tick={{fill: '#475569', fontSize: 10}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#475569" tick={{fill: '#475569', fontSize: 10}} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                        {SUPPLIER_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} style={{filter: `drop-shadow(0px 0px 5px ${entry.color}80)`}} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
             </div>

             {/* Key Metrics */}
             <div className="glass-panel p-5 relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider relative z-10">Key Metrics</h3>
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Inventory Value</div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-white text-glow-cyan">$1.2M</div>
                      {/* Mini sparkline */}
                      <svg width="40" height="15" viewBox="0 0 40 15"><path d="M0,10 L10,5 L20,8 L30,2 L40,12" fill="none" stroke={COLORS.cyan} strokeWidth="2" style={{filter: `drop-shadow(0 0 2px ${COLORS.cyan})`}}/></svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">SKU Count</div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-white text-glow-emerald">18,400</div>
                      <svg width="40" height="15" viewBox="0 0 40 15"><path d="M0,12 L10,8 L20,10 L30,4 L40,5" fill="none" stroke={COLORS.emerald} strokeWidth="2" style={{filter: `drop-shadow(0 0 2px ${COLORS.emerald})`}}/></svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Order Volume</div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-white text-glow-amber">3,450</div>
                      <svg width="40" height="15" viewBox="0 0 40 15"><path d="M0,5 L10,12 L20,6 L30,8 L40,2" fill="none" stroke={COLORS.amber} strokeWidth="2" style={{filter: `drop-shadow(0 0 2px ${COLORS.amber})`}}/></svg>
                    </div>
                  </div>
                </div>
             </div>

          </div>
        </div>

        {/* Right Column (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Warehouse Status (Isometric visual simulation) */}
          <div className="glass-panel p-6 flex flex-col relative overflow-hidden group">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-2 relative z-10">Warehouse Status</h3>
            <div className="flex justify-between items-end mb-6 relative z-10">
              <div>
                <div className="text-xs text-slate-500">Shelf occupancy</div>
                <div className="text-3xl font-black text-emerald-400 text-glow-emerald">92%</div>
              </div>
              <div className="flex flex-col gap-1.5 text-[10px]">
                <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#10b981]"></div> Norm Stock</div>
                <div className="flex items-center gap-2 px-2 py-1 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400"><AlertTriangle className="w-2.5 h-2.5"/> Low Stock</div>
              </div>
            </div>
            
            {/* Simulated Isometric Grid */}
            <div className="relative w-full h-[180px] bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center justify-center overflow-hidden perspective-container">
               <div className="isometric-grid grid grid-cols-4 gap-2 transform rotate-x-60 rotate-z-45 scale-75">
                  {Array.from({length: 16}).map((_, i) => {
                    const isLow = i === 5 || i === 10 || i === 14;
                    const color = isLow ? COLORS.rose : COLORS.blue;
                    const h = isLow ? 'h-6' : ['h-12', 'h-16', 'h-10', 'h-14'][i%4];
                    return (
                      <div key={i} className={`w-8 ${h} rounded-sm shadow-xl transition-all duration-500 hover:scale-y-110 cursor-pointer`} 
                           style={{
                             backgroundColor: `${color}80`, 
                             borderTop: `2px solid ${color}`,
                             borderRight: `2px solid ${color}40`,
                             borderLeft: `2px solid ${color}40`,
                             boxShadow: `0 10px 20px -5px ${color}60`
                           }}>
                      </div>
                    )
                  })}
               </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 relative z-10">
              <span className="text-xs font-semibold">Low Stock Alerts</span>
              <span className="text-sm font-black text-glow-rose">Alerts</span>
            </div>
          </div>

          {/* Product Feed / Recent Transactions */}
          <div className="glass-panel p-6 flex-1 flex flex-col relative overflow-hidden group">
             <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-6 relative z-10">Product Feed</h3>
             <div className="space-y-5 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {DUMMY_TRANSACTIONS.map((trx, i) => (
                  <div key={i} className="flex gap-4 group/item cursor-pointer">
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg z-10 relative bg-slate-900 transition-transform group-hover/item:scale-110
                        ${trx.type === 'in' ? 'border-cyan-500/50 text-cyan-400' : 'border-rose-500/50 text-rose-400'}`}
                        style={{boxShadow: trx.type === 'in' ? `0 0 10px ${COLORS.cyan}40` : `0 0 10px ${COLORS.rose}40`}}
                      >
                        {trx.type === 'in' ? <ArrowDownLeft className="w-4 h-4"/> : <ArrowUpRight className="w-4 h-4"/>}
                      </div>
                      {/* Timeline line */}
                      {i !== DUMMY_TRANSACTIONS.length - 1 && <div className="absolute top-8 bottom-[-20px] left-1/2 w-0.5 -translate-x-1/2 bg-slate-800"></div>}
                    </div>
                    <div>
                      <div className="text-xs text-white font-semibold mb-0.5 group-hover/item:text-blue-400 transition-colors">{trx.product}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <span>{trx.type === 'in' ? 'Received' : 'Sent'}</span>
                        <span className={`font-bold ${trx.type === 'in' ? 'text-cyan-400' : 'text-rose-400'}`}>{trx.quantity} units</span>
                      </div>
                      <div className="text-[9px] text-slate-600 mt-0.5">{trx.date}</div>
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
