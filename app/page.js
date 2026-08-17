"use client";
import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Layers, Search, Plus, ArrowUpRight, ArrowDownRight, Clock, ChevronRight, X } from 'lucide-react';

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

const DUMMY_PRODUCTS_PREVIEW = [
  { id: 'PRD-001', name: 'NVIDIA GeForce RTX 4090', category: 'Electronics', stock: 45, price: 1599.99 },
  { id: 'PRD-002', name: 'AMD Ryzen 9 7950X', category: 'Electronics', stock: 30, price: 699.99 },
  { id: 'PRD-003', name: 'Razer Viper V3 Pro', category: 'Peripherals', stock: 120, price: 159.99 },
  { id: 'PRD-004', name: 'Samsung 990 PRO 2TB', category: 'Storage', stock: 85, price: 179.99 },
];

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState('overview');

  const handleCardClick = (cardId) => {
    if (selectedCard === cardId) {
      setSelectedCard('overview');
    } else {
      setSelectedCard(cardId);
    }
  };

  const renderDynamicContent = () => {
    switch (selectedCard) {
      case 'products':
        return (
          <div className="animate-fade-in space-y-4 glass-table p-6 border-t-4 border-t-blue-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Layers className="w-5 h-5 text-blue-400"/> Top Products List</h2>
              <button onClick={() => setSelectedCard('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DUMMY_PRODUCTS_PREVIEW.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.03]">
                    <td className="p-4 font-semibold">{p.name}</td>
                    <td className="p-4 text-sm text-slate-400">{p.category}</td>
                    <td className="p-4 text-emerald-400 font-bold">{p.stock}</td>
                    <td className="p-4 font-medium">${p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'stock':
        return (
          <div className="animate-fade-in space-y-4 glass-table p-6 border-t-4 border-t-emerald-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Package className="w-5 h-5 text-emerald-400"/> Stock Distribution (Categories)</h2>
              <button onClick={() => setSelectedCard('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-700/50 transition-colors">
                 <div className="text-sm text-slate-400 font-medium">Electronics</div>
                 <div className="text-3xl font-bold text-white mt-2">4,250</div>
                 <div className="text-xs text-emerald-400 mt-1">+12% vs last month</div>
               </div>
               <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-700/50 transition-colors">
                 <div className="text-sm text-slate-400 font-medium">Peripherals</div>
                 <div className="text-3xl font-bold text-white mt-2">3,120</div>
                 <div className="text-xs text-emerald-400 mt-1">+5% vs last month</div>
               </div>
               <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-700/50 transition-colors">
                 <div className="text-sm text-slate-400 font-medium">Accessories</div>
                 <div className="text-3xl font-bold text-white mt-2">2,840</div>
                 <div className="text-xs text-emerald-400 mt-1">+8% vs last month</div>
               </div>
               <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-700/50 transition-colors">
                 <div className="text-sm text-slate-400 font-medium">Storage</div>
                 <div className="text-3xl font-bold text-white mt-2">2,253</div>
                 <div className="text-xs text-rose-400 mt-1">-2% vs last month</div>
               </div>
            </div>
          </div>
        );
      case 'lowStock':
        return (
          <div className="animate-fade-in space-y-4 glass-table p-6 border-t-4 border-t-amber-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-400"/> Critical Low Stock Overview</h2>
              <button onClick={() => setSelectedCard('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LOW_STOCK_ITEMS.map((item, i) => (
                <div key={i} className="stat-card !p-4 flex items-center justify-between border-rose-500/30 bg-rose-500/10">
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-slate-500 text-xs">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-400 font-bold text-lg">{item.stock} / {item.min}</div>
                    <div className="progress-bar w-32 mt-2">
                      <div className="progress-fill bg-rose-500" style={{ width: `${(item.stock / item.min) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'movements':
        return (
          <div className="animate-fade-in space-y-4 glass-table p-6 border-t-4 border-t-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-400"/> Detailed Weekly Movements</h2>
              <button onClick={() => setSelectedCard('overview')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Product Details</th>
                  <th className="p-4 text-center">Movement Type</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Timestamp</th>
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
                      <span className={`badge ${act.type === 'IN' ? 'badge-in' : 'badge-out'} w-16 inline-block text-center`}>
                        {act.type}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-base">{act.quantity}</td>
                    <td className="p-4 text-slate-400 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> {act.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
            <div className="xl:col-span-2 space-y-4">
              <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold">Recent Movements</h2>
                <span 
                  onClick={() => setSelectedCard('movements')}
                  className="text-emerald-400 text-sm cursor-pointer hover:underline flex items-center gap-1"
                >
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

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold">Low Stock Alerts</h2>
                <span 
                  onClick={() => setSelectedCard('lowStock')}
                  className="badge badge-warning cursor-pointer hover:scale-105 transition-transform"
                >
                  {LOW_STOCK_ITEMS.length} items
                </span>
              </div>
              <div className="space-y-3">
                {LOW_STOCK_ITEMS.map((item, i) => (
                  <div key={i} className="stat-card !p-4 flex items-center justify-between cursor-pointer hover:scale-[1.02] active:scale-95 transition-all" onClick={() => setSelectedCard('lowStock')}>
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
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here&apos;s what&apos;s happening with your inventory.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
            <input className="search-input" placeholder="Quick search..." />
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            <span>New TRX</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={<Layers className="w-6 h-6 text-blue-400" />}
          label="Total Products"
          value={DUMMY_STATS.totalProducts}
          trend="+12"
          trendUp
          isSelected={selectedCard === 'products'}
          onClick={() => handleCardClick('products')}
        />
        <StatCard
          icon={<Package className="w-6 h-6 text-emerald-400" />}
          label="Total Stock"
          value={formatNumber(DUMMY_STATS.totalStock)}
          trend="+8.2%"
          trendUp
          isSelected={selectedCard === 'stock'}
          onClick={() => handleCardClick('stock')}
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6 text-amber-400" />}
          label="Low Stock Alert"
          value={DUMMY_STATS.lowStock}
          trend="Critical"
          trendDown
          isSelected={selectedCard === 'lowStock'}
          onClick={() => handleCardClick('lowStock')}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
          label="Weekly Movements"
          value={DUMMY_STATS.movements}
          trend="+24%"
          trendUp
          isSelected={selectedCard === 'movements'}
          onClick={() => handleCardClick('movements')}
        />
      </div>

      <div className="mt-8 transition-all duration-500">
        {renderDynamicContent()}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendUp, trendDown, isSelected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`stat-card cursor-pointer group relative overflow-hidden transition-all duration-300 active:scale-95 ${
        isSelected ? 'ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20 bg-slate-800/80 scale-[1.02]' : 'hover:scale-[1.02]'
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse-glow"></div>
      )}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl transition-colors duration-300 ${isSelected ? 'bg-slate-700 border border-emerald-500/30' : 'bg-slate-800/80 border border-slate-700/30 group-hover:bg-slate-700'}`}>
          {icon}
        </div>
      </div>
      <div className="text-sm text-slate-400 mb-1 relative z-10">{label}</div>
      <div className="flex items-end justify-between relative z-10">
        <div className="text-3xl font-extrabold tracking-tighter text-white">{value}</div>
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
