"use client";
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, ChevronDown, Package } from 'lucide-react';

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CATEGORIES = ['All', 'Electronics', 'Peripherals', 'Storage', 'Accessories', 'Cables', 'Chargers', 'Networking'];

const DUMMY_PRODUCTS = [
  { id: 'PRD-001', name: 'NVIDIA GeForce RTX 4090', category: 'Electronics', stock: 45, min_stock: 10, price: 1599.99, status: 'active' },
  { id: 'PRD-002', name: 'AMD Ryzen 9 7950X', category: 'Electronics', stock: 30, min_stock: 10, price: 699.99, status: 'active' },
  { id: 'PRD-003', name: 'Razer Viper V3 Pro', category: 'Peripherals', stock: 120, min_stock: 25, price: 159.99, status: 'active' },
  { id: 'PRD-004', name: 'Samsung 990 PRO 2TB', category: 'Storage', stock: 85, min_stock: 15, price: 179.99, status: 'active' },
  { id: 'PRD-005', name: 'USB-C Hub 7-in-1', category: 'Accessories', stock: 2, min_stock: 10, price: 49.99, status: 'low' },
  { id: 'PRD-006', name: 'HDMI 2.1 Cable 2m', category: 'Cables', stock: 1, min_stock: 20, price: 24.99, status: 'low' },
  { id: 'PRD-007', name: 'MagSafe Charger 15W', category: 'Chargers', stock: 3, min_stock: 15, price: 39.99, status: 'low' },
  { id: 'PRD-008', name: 'Logitech MX Master 3S', category: 'Peripherals', stock: 67, min_stock: 20, price: 99.99, status: 'active' },
  { id: 'PRD-009', name: 'TP-Link AX6000 Router', category: 'Networking', stock: 18, min_stock: 5, price: 329.99, status: 'active' },
  { id: 'PRD-010', name: 'Corsair K100 RGB Keyboard', category: 'Peripherals', stock: 42, min_stock: 10, price: 229.99, status: 'active' },
  { id: 'PRD-011', name: 'WD Black SN850X 1TB', category: 'Storage', stock: 55, min_stock: 10, price: 89.99, status: 'active' },
  { id: 'PRD-012', name: 'Webcam Logitech Brio 4K', category: 'Peripherals', stock: 4, min_stock: 10, price: 199.99, status: 'low' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = DUMMY_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Manage your inventory items and stock levels.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
          <input
            className="search-input w-full"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                category === cat
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:bg-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card !p-4 flex items-center gap-4">
          <div className="p-2 bg-blue-500/10 rounded-lg"><Package className="w-5 h-5 text-blue-400" /></div>
          <div>
            <div className="text-2xl font-bold">{DUMMY_PRODUCTS.length}</div>
            <div className="text-slate-500 text-xs">Total Products</div>
          </div>
        </div>
        <div className="stat-card !p-4 flex items-center gap-4">
          <div className="p-2 bg-emerald-500/10 rounded-lg"><Package className="w-5 h-5 text-emerald-400" /></div>
          <div>
            <div className="text-2xl font-bold">{formatNumber(DUMMY_PRODUCTS.reduce((a, p) => a + p.stock, 0))}</div>
            <div className="text-slate-500 text-xs">Total Units</div>
          </div>
        </div>
        <div className="stat-card !p-4 flex items-center gap-4">
          <div className="p-2 bg-rose-500/10 rounded-lg"><Package className="w-5 h-5 text-rose-400" /></div>
          <div>
            <div className="text-2xl font-bold">{DUMMY_PRODUCTS.filter(p => p.stock < p.min_stock).length}</div>
            <div className="text-slate-500 text-xs">Low Stock</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-table">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="p-4 font-mono text-xs text-slate-500">{p.id}</td>
                <td className="p-4 font-semibold text-sm">{p.name}</td>
                <td className="p-4"><span className="badge-category">{p.category}</span></td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${p.stock < p.min_stock ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {p.stock}
                    </span>
                    {p.stock < p.min_stock && <span className="badge badge-out text-[9px]">LOW</span>}
                  </div>
                </td>
                <td className="p-4 text-slate-300 font-medium">${p.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`badge ${p.stock < p.min_stock ? 'badge-out' : 'badge-in'}`}>
                    {p.stock < p.min_stock ? 'LOW' : 'OK'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center text-sm text-slate-500">
        <span>Showing {filtered.length} of {DUMMY_PRODUCTS.length} products</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30 hover:bg-slate-700/50 transition-all">Previous</button>
          <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">1</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30 hover:bg-slate-700/50 transition-all">2</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30 hover:bg-slate-700/50 transition-all">Next</button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 w-[500px] space-y-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold">Add New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Product Name</label>
                <input className="form-input" placeholder="Enter product name..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-select">
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Price ($)</label>
                  <input className="form-input" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Initial Stock</label>
                  <input className="form-input" type="number" placeholder="0" />
                </div>
                <div>
                  <label className="form-label">Min. Stock Alert</label>
                  <input className="form-input" type="number" placeholder="5" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
