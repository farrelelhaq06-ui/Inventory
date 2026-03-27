"use client";
import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Search, Plus, Filter, Calendar, ChevronRight } from 'lucide-react';

const DUMMY_TRANSACTIONS = [
  { id: 'TRX-9830', product: 'NVIDIA GeForce RTX 4090', type: 'in', quantity: 200, note: 'Restocking from supplier batch #45', date: '27 Mar 2026, 09:14', user: 'Admin' },
  { id: 'TRX-9829', product: 'Razer Viper V3 Pro', type: 'out', quantity: 5, note: 'Sold to customer order #ORD-1282', date: '27 Mar 2026, 08:45', user: 'Staff A' },
  { id: 'TRX-9828', product: 'Thunderbolt Dock Pro 4', type: 'out', quantity: 2, note: 'Internal use - IT department', date: '26 Mar 2026, 16:30', user: 'Admin' },
  { id: 'TRX-9827', product: 'Samsung 990 PRO 2TB', type: 'in', quantity: 50, note: 'New shipment received', date: '26 Mar 2026, 14:22', user: 'Staff B' },
  { id: 'TRX-9826', product: 'Corsair K100 RGB Keyboard', type: 'in', quantity: 100, note: 'Bulk order arrival', date: '26 Mar 2026, 11:05', user: 'Admin' },
  { id: 'TRX-9825', product: 'Logitech MX Master 3S', type: 'out', quantity: 12, note: 'B2B order - Company XYZ', date: '25 Mar 2026, 17:20', user: 'Staff A' },
  { id: 'TRX-9824', product: 'WD Black SN850X 1TB', type: 'in', quantity: 75, note: 'Regular scheduled restock', date: '25 Mar 2026, 10:14', user: 'Admin' },
  { id: 'TRX-9823', product: 'USB-C Hub 7-in-1', type: 'out', quantity: 8, note: 'Online store fulfillment', date: '24 Mar 2026, 15:33', user: 'Staff B' },
  { id: 'TRX-9822', product: 'AMD Ryzen 9 7950X', type: 'in', quantity: 30, note: 'New stock from distributor', date: '24 Mar 2026, 09:00', user: 'Admin' },
  { id: 'TRX-9821', product: 'MagSafe Charger 15W', type: 'out', quantity: 20, note: 'Retail partner order', date: '23 Mar 2026, 14:50', user: 'Staff A' },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = DUMMY_TRANSACTIONS.filter(t => {
    const matchSearch = t.product.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalIn = DUMMY_TRANSACTIONS.filter(t => t.type === 'in').reduce((a, t) => a + t.quantity, 0);
  const totalOut = DUMMY_TRANSACTIONS.filter(t => t.type === 'out').reduce((a, t) => a + t.quantity, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">Track all stock movements — incoming and outgoing.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-5 h-5" />
          <span>New Transaction</span>
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card !p-4 flex items-center gap-4">
          <div className="p-2.5 bg-emerald-500/10 rounded-lg"><ArrowDownLeft className="w-5 h-5 text-emerald-400" /></div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">{totalIn}</div>
            <div className="text-slate-500 text-xs">Units In</div>
          </div>
        </div>
        <div className="stat-card !p-4 flex items-center gap-4">
          <div className="p-2.5 bg-rose-500/10 rounded-lg"><ArrowUpRight className="w-5 h-5 text-rose-400" /></div>
          <div>
            <div className="text-2xl font-bold text-rose-400">{totalOut}</div>
            <div className="text-slate-500 text-xs">Units Out</div>
          </div>
        </div>
        <div className="stat-card !p-4 flex items-center gap-4">
          <div className="p-2.5 bg-blue-500/10 rounded-lg"><Calendar className="w-5 h-5 text-blue-400" /></div>
          <div>
            <div className="text-2xl font-bold">{DUMMY_TRANSACTIONS.length}</div>
            <div className="text-slate-500 text-xs">This Week</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
          <input
            className="search-input w-full"
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'in', 'out'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all uppercase ${
                typeFilter === type
                  ? type === 'in' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : type === 'out' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:bg-slate-700/50'
              }`}
            >
              {type === 'all' ? 'All' : type === 'in' ? '↓ Stock In' : '↑ Stock Out'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-table">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">TRX ID</th>
              <th className="p-4">Product</th>
              <th className="p-4 text-center">Type</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Note</th>
              <th className="p-4">By</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="p-4 font-mono text-xs text-slate-500">{t.id}</td>
                <td className="p-4 font-semibold text-sm">{t.product}</td>
                <td className="p-4 text-center">
                  <span className={`badge ${t.type === 'in' ? 'badge-in' : 'badge-out'}`}>
                    {t.type === 'in' ? '↓ IN' : '↑ OUT'}
                  </span>
                </td>
                <td className="p-4 font-bold">{t.quantity}</td>
                <td className="p-4 text-slate-400 text-xs max-w-[200px] truncate">{t.note}</td>
                <td className="p-4">
                  <span className="badge-category">{t.user}</span>
                </td>
                <td className="p-4 text-slate-500 text-xs">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 w-[500px] space-y-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold">New Transaction</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Product</label>
                <select className="form-select">
                  <option>Select product...</option>
                  <option>NVIDIA GeForce RTX 4090</option>
                  <option>AMD Ryzen 9 7950X</option>
                  <option>Razer Viper V3 Pro</option>
                  <option>Samsung 990 PRO 2TB</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Type</label>
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">↓ Stock In</button>
                    <button className="flex-1 py-3 rounded-xl text-sm font-semibold bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:bg-rose-500/15 hover:text-rose-400 hover:border-rose-500/30 transition-all">↑ Stock Out</button>
                  </div>
                </div>
                <div>
                  <label className="form-label">Quantity</label>
                  <input className="form-input" type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="form-label">Note</label>
                <input className="form-input" placeholder="Transaction note..." />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
