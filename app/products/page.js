"use client";
import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye, Package, Box, Layers, Monitor, Mouse, Keyboard,
  Printer, Import, CheckSquare, AlertTriangle, TrendingUp, TrendingDown, X
} from 'lucide-react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CATEGORIES = ['All Category', 'Electronics', 'Peripherals', 'Storage', 'Accessories', 'Cables', 'Chargers', 'Networking'];
const STATUSES = ['In Stock', 'Low Stock', 'Out of Stock'];

const DUMMY_PRODUCTS = [
  { id: 'PRD-001', name: 'NVIDIA GeForce RTX 4090', category: 'Electronics', stock: 45, min_stock: 10, price: 1599.99, status: 'In Stock', icon: <Monitor className="w-5 h-5" />, color: '#10b981' },
  { id: 'PRD-002', name: 'AMD Ryzen 9 7950X', category: 'Electronics', stock: 30, min_stock: 10, price: 699.99, status: 'In Stock', icon: <Box className="w-5 h-5" />, color: '#10b981' },
  { id: 'PRD-003', name: 'Razer Viper V3 Pro', category: 'Peripherals', stock: 120, min_stock: 25, price: 159.99, status: 'In Stock', icon: <Mouse className="w-5 h-5" />, color: '#10b981' },
  { id: 'PRD-004', name: 'Samsung 990 PRO 2TB', category: 'Storage', stock: 85, min_stock: 15, price: 179.99, status: 'In Stock', icon: <Layers className="w-5 h-5" />, color: '#10b981' },
  { id: 'PRD-005', name: 'USB-C Hub 7-in-1', category: 'Accessories', stock: 2, min_stock: 10, price: 49.99, status: 'Low Stock', icon: <Layers className="w-5 h-5" />, color: '#f59e0b' },
  { id: 'PRD-006', name: 'HDMI 2.1 Cable 2m', category: 'Cables', stock: 0, min_stock: 20, price: 24.99, status: 'Out of Stock', icon: <Layers className="w-5 h-5" />, color: '#ef4444' },
  { id: 'PRD-007', name: 'MagSafe Charger 15W', category: 'Chargers', stock: 3, min_stock: 15, price: 39.99, status: 'Low Stock', icon: <Layers className="w-5 h-5" />, color: '#f59e0b' },
  { id: 'PRD-008', name: 'Logitech MX Master 3S', category: 'Peripherals', stock: 67, min_stock: 20, price: 99.99, status: 'In Stock', icon: <Mouse className="w-5 h-5" />, color: '#10b981' },
];

const STOCK_VALUE_DATA = [
  { name: 'Electronics', value: 345000, color: '#3b82f6' },
  { name: 'Peripherals', value: 125000, color: '#10b981' },
  { name: 'Storage', value: 85000, color: '#8b5cf6' },
  { name: 'Accessories', value: 45000, color: '#f59e0b' },
  { name: 'Cables', value: 15000, color: '#ef4444' },
  { name: 'Others', value: 22000, color: '#6b7280' },
];

const ALERTS_DATA = [
  { name: 'Electronics', value: 1, color: '#3b82f6' },
  { name: 'Peripherals', value: 1, color: '#10b981' },
  { name: 'Accessories', value: 1, color: '#f59e0b' },
  { name: 'Cables', value: 1, color: '#ef4444' },
];

const SPARKLINE_DATA = [
  { day: 'M', value: 10 }, { day: 'T', value: 11 }, { day: 'W', value: 11 }, { day: 'T', value: 12 }, { day: 'F', value: 12 },
];
const SPARKLINE_UNITS = [
  { day: 'M', value: 400 }, { day: 'T', value: 420 }, { day: 'W', value: 450 }, { day: 'T', value: 460 }, { day: 'F', value: 472 },
];

// Helper for custom tooltips
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-2 rounded shadow-xl z-50 text-xs">
        <span className="font-bold text-white">{payload[0].name}: </span>
        <span className="text-slate-300">
          {payload[0].name.toLowerCase().includes('value') ? '$' : ''}
          {formatNumber(payload[0].value)}
        </span>
      </div>
    );
  }
  return null;
};

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Category');
  const [status, setStatus] = useState('Status');
  const [showModal, setShowModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const filtered = DUMMY_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All Category' || p.category === category;
    const matchStatus = status === 'Status' || p.status === status;
    return matchSearch && matchCat && matchStatus;
  });

  const handleMetricClick = (metricId) => {
    if (selectedMetric === metricId) {
      setSelectedMetric('overview');
    } else {
      setSelectedMetric(metricId);
    }
  };

  const renderDynamicContent = () => {
    switch (selectedMetric) {
      case 'products':
        return (
          <div className="animate-fade-in stat-card p-6 border-t-4 border-t-emerald-500 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><Package className="w-5 h-5 text-emerald-400"/> New Products Added (This Month)</h3>
              <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPARKLINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#1e293b', opacity: 0.4}} />
                  <Bar dataKey="value" name="New SKUs" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'units':
        return (
          <div className="animate-fade-in stat-card p-6 border-t-4 border-t-blue-500 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><Layers className="w-5 h-5 text-blue-400"/> Total Units Trend (Last 30 Days)</h3>
              <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPARKLINE_UNITS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" name="Total Units" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUnits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="animate-fade-in stat-card p-6 border-t-4 border-t-amber-500 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-400"/> Action Required: Low Stock Items</h3>
              <button onClick={() => setSelectedMetric('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DUMMY_PRODUCTS.filter(p => p.status !== 'In Stock').map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border flex flex-col justify-between transition-colors ${item.status === 'Out of Stock' ? 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20' : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'}`}>
                  <div className="mb-3">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-slate-400 text-xs">{item.category}</div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className={`text-xl font-bold ${item.status === 'Out of Stock' ? 'text-rose-400' : 'text-amber-400'}`}>{item.stock}</div>
                      <div className="text-slate-500 text-[10px]">Min: {item.min_stock}</div>
                    </div>
                    <button className={`px-3 py-1 rounded text-xs font-bold text-white transition-colors ${item.status === 'Out of Stock' ? 'bg-rose-500 hover:bg-rose-400' : 'bg-amber-500 hover:bg-amber-400'}`}>
                      Reorder
                    </button>
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
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="page-header">
        <div>
          <h1 className="page-title text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent pb-1">Inventory Management</h1>
          <p className="page-subtitle text-slate-400">Manage and visualize your product stock levels with interactive insights.</p>
        </div>
        <div className="flex gap-3 items-center">
          <button className="btn-primary shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all" onClick={() => setShowModal(true)}>
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      {/* 3 Interactive Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Products */}
        <div 
          onClick={() => handleMetricClick('products')}
          className={`stat-card relative overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 group !p-6 border border-slate-700/50 flex flex-col justify-between ${
            selectedMetric === 'products' ? 'ring-2 ring-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-900/20 scale-[1.02]' : 'hover:scale-[1.02] bg-slate-900/60'
          }`}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mt-20 group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="flex justify-between items-start relative z-10 mb-4">
            <div className="flex items-center gap-2">
               <Package className="w-5 h-5 text-emerald-400"/>
               <span className="text-white text-sm font-semibold tracking-wide">Total Products</span>
            </div>
            {/* Glowing 3D Box Icon */}
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
               <Box className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-5xl font-black text-white mb-2">{DUMMY_PRODUCTS.length}</div>
            <div className="text-emerald-400 text-xs font-medium">Total SKUs tracked</div>
          </div>
          {/* Sparkline */}
          <div className="absolute bottom-0 right-0 w-2/3 h-24 opacity-60 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_DATA}>
                <defs>
                  <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorProducts)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Total Units */}
        <div 
          onClick={() => handleMetricClick('units')}
          className={`stat-card relative overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 group !p-6 border border-slate-700/50 flex flex-col justify-between ${
            selectedMetric === 'units' ? 'ring-2 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-blue-900/20 scale-[1.02]' : 'hover:scale-[1.02] bg-slate-900/60'
          }`}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mt-20 group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="flex justify-between items-start relative z-10 mb-4">
            <div className="flex items-center gap-2">
               <Layers className="w-5 h-5 text-blue-400"/>
               <span className="text-white text-sm font-semibold tracking-wide">Total Units in Stock</span>
            </div>
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg border border-blue-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
               <Layers className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-5xl font-black text-white mb-2">{formatNumber(DUMMY_PRODUCTS.reduce((a, p) => a + p.stock, 0))}</div>
            <div className="text-blue-400 text-xs font-medium">Current across all locations</div>
          </div>
          {/* Sparkline */}
          <div className="absolute bottom-0 right-0 w-2/3 h-24 opacity-60 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_UNITS}>
                <defs>
                  <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#colorUnits)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Low Stock Alerts */}
        <div 
          onClick={() => handleMetricClick('alerts')}
          className={`stat-card relative overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 group !p-6 border border-slate-700/50 flex flex-col justify-between ${
            selectedMetric === 'alerts' ? 'ring-2 ring-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-amber-900/20 scale-[1.02]' : 'hover:scale-[1.02] bg-slate-900/60'
          }`}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -ml-20 -mt-20 group-hover:bg-amber-500/20 transition-colors"></div>
          <div className="flex justify-between items-start relative z-10 mb-2">
            <div className="flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-amber-400"/>
               <span className="text-white text-sm font-semibold tracking-wide">Low Stock Alerts</span>
            </div>
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg border border-amber-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
               <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          
          <div className="flex justify-between items-end relative z-10">
            <div>
              <div className="text-5xl font-black text-white mb-2">{DUMMY_PRODUCTS.filter(p => p.status !== 'In Stock').length}</div>
              <div className="text-amber-400 text-xs font-medium">Requiring immediate action</div>
            </div>
            {/* Embedded Mini Donut */}
            <div className="w-24 h-24 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ALERTS_DATA} cx="50%" cy="50%" innerRadius={25} outerRadius={35} paddingAngle={2} dataKey="value" stroke="none">
                    {ALERTS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Legend overlay */}
              <div className="absolute -right-10 top-0 bottom-0 flex flex-col justify-center gap-1">
                {ALERTS_DATA.map((d, i) => (
                  <div key={i} className="flex items-center gap-1 text-[8px] text-slate-400"><div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: d.color}}></div> {d.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Deep Dive Domain */}
      <div className="transition-all duration-500 overflow-hidden">
        {renderDynamicContent()}
      </div>

      {/* Row 2: Charts and Filters */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${selectedMetric !== 'overview' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Stock Value by Category (Donut Chart) */}
        <div className="stat-card border border-slate-700/50 bg-slate-900/60 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Stock Value by Category</h3>
            <span className="text-blue-400 text-xs font-semibold cursor-pointer hover:underline">View all</span>
          </div>
          
          <div className="flex-1 flex items-center justify-between mt-4">
             <div className="w-44 h-44 relative">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={STOCK_VALUE_DATA}
                     cx="50%"
                     cy="50%"
                     innerRadius={55}
                     outerRadius={80}
                     paddingAngle={3}
                     dataKey="value"
                     stroke="none"
                   >
                     {STOCK_VALUE_DATA.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip content={<CustomTooltip />} />
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-slate-400 text-xs font-medium">Total</span>
                 <span className="text-lg font-bold text-white">${formatNumber(STOCK_VALUE_DATA.reduce((a,b)=>a+b.value, 0)/1000)}k</span>
               </div>
             </div>

             {/* Legend */}
             <div className="space-y-2 text-xs">
               {STOCK_VALUE_DATA.map((cat, i) => (
                 <div key={i} className="flex items-center gap-2 text-slate-300">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: cat.color, boxShadow: `0 0 5px ${cat.color}80`}}></div>
                   {cat.name}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="lg:col-span-2 stat-card border border-slate-700/50 bg-slate-900/60 p-6 flex flex-col justify-between">
           {/* Pill Tags */}
           <div className="flex gap-2 flex-wrap mb-6">
             {CATEGORIES.slice(1).map(cat => (
               <button
                 key={cat}
                 onClick={() => setCategory(cat)}
                 className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                   category === cat
                     ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                     : 'bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-slate-700 hover:text-white'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
           
           {/* Dropdowns & Search */}
           <div className="flex flex-col sm:flex-row gap-4 items-end">
             <div className="flex-1 w-full relative">
                <Search className="absolute left-3 top-3.5 text-slate-500 w-4 h-4" />
                <input
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
             </div>
             
             <div className="flex gap-4 w-full sm:w-auto">
               <div className="w-full sm:w-36">
                 <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Category</label>
                 <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                 >
                   {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               
               <div className="w-full sm:w-36">
                 <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Status</label>
                 <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                 >
                   <option value="Status">All Status</option>
                   {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
               </div>
             </div>
           </div>
        </div>

      </div>

      {/* Row 3: Product Table & Quick Actions */}
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 transition-opacity duration-500 ${selectedMetric !== 'overview' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Advanced Table */}
        <div className="lg:col-span-3 stat-card border border-slate-700/50 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/80 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4 pl-6">ID</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="p-4 pl-6 font-mono text-xs text-slate-500 font-medium">{p.id}</td>
                    <td className="p-4 flex items-center gap-4">
                      {/* Product Thumbnail Placeholder */}
                      <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center border border-slate-700/50 shrink-0" style={{color: p.color}}>
                         {p.icon}
                      </div>
                      <span className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">{p.name}</span>
                    </td>
                    <td className="p-4 text-sm text-slate-400">{p.category}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${p.stock < p.min_stock && p.stock > 0 ? 'text-amber-400' : p.stock === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {p.stock}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border
                        ${p.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 
                          p.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' : 
                          'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(225,29,72,0.1)]'
                        }
                      `}>
                        <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'In Stock' ? 'bg-emerald-400' : p.status === 'Low Stock' ? 'bg-amber-400' : 'bg-rose-400'}`}></div>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-slate-800 text-slate-400 rounded-md hover:bg-slate-700 hover:text-white border border-slate-700/50 transition-all"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 hover:text-blue-300 border border-blue-500/20 transition-all"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 bg-rose-500/10 text-rose-400 rounded-md hover:bg-rose-500/20 hover:text-rose-300 border border-rose-500/20 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">No products found matching your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Side Panel */}
        <div className="stat-card border border-slate-700/50 bg-slate-900/60 p-6 flex flex-col">
           <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
           
           <div className="space-y-4 flex-1">
             <button className="w-full group flex items-center gap-3 p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all">
               <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform"><Edit className="w-4 h-4"/></div>
               <div className="text-left">
                 <div className="text-sm font-bold text-purple-300">Bulk Edit Selected Items</div>
                 <div className="text-[10px] text-slate-400 mt-0.5">Modify multiple SKUs at once</div>
               </div>
             </button>
             
             <button className="w-full group flex items-center gap-3 p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-all">
               <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform"><Import className="w-4 h-4"/></div>
               <div className="text-left">
                 <div className="text-sm font-bold text-blue-300">Import New Products</div>
                 <div className="text-[10px] text-slate-400 mt-0.5">Upload CSV or Excel files</div>
               </div>
             </button>

             <button className="w-full group flex items-center gap-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all">
               <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform"><Printer className="w-4 h-4"/></div>
               <div className="text-left">
                 <div className="text-sm font-bold text-emerald-300">Print Barcode Labels</div>
                 <div className="text-[10px] text-slate-400 mt-0.5">Generate print-ready PDFs</div>
               </div>
             </button>
           </div>
           
           <div className="mt-8 pt-6 border-t border-slate-800">
             <div className="flex items-center gap-2 text-slate-400 text-xs justify-center cursor-pointer hover:text-white transition-colors">
                <CheckSquare className="w-4 h-4" />
                <span>Show completed tasks</span>
             </div>
           </div>
        </div>

      </div>

      {/* Add Product Modal (Unchanged) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-[500px] space-y-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white">Add New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Product Name</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Enter product name..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
                    {CATEGORIES.filter(c => c !== 'All Category').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Price ($)</label>
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Initial Stock</label>
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" type="number" placeholder="0" />
                </div>
                <div>
                  <label className="form-label">Min. Stock Alert</label>
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" type="number" placeholder="5" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <button className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-sm font-semibold" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
