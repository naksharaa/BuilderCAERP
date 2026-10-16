import { useState } from 'react';
import { vouchers } from '../data';
import { formatFullCurrency } from '../data';
import { Plus, Filter, CheckCircle, Clock, Eye, Download } from 'lucide-react';

export default function Accounting() {
  const [filter, setFilter] = useState<string>('all');
  const [showNewVoucher, setShowNewVoucher] = useState(false);

  const filteredVouchers = filter === 'all' ? vouchers : vouchers.filter(v => v.type === filter);

  const typeColors: Record<string, string> = {
    journal: 'bg-blue-100 text-blue-700',
    receipt: 'bg-emerald-100 text-emerald-700',
    payment: 'bg-red-100 text-red-700',
    contra: 'bg-purple-100 text-purple-700',
    purchase: 'bg-orange-100 text-orange-700',
    sales: 'bg-teal-100 text-teal-700',
    'credit-note': 'bg-pink-100 text-pink-700',
    'debit-note': 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
          <p className="text-sm text-gray-500">Double-entry voucher management • Journal, Receipt, Payment, Contra</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1.5">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowNewVoucher(true)} className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1.5 font-medium">
            <Plus size={16} /> New Voucher
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500">Total Vouchers</p>
          <p className="text-xl font-bold text-gray-900">{vouchers.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500">Approved</p>
          <p className="text-xl font-bold text-emerald-600">{vouchers.filter(v => v.approved).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500">Pending Approval</p>
          <p className="text-xl font-bold text-amber-600">{vouchers.filter(v => !v.approved).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500">Total Value</p>
          <p className="text-xl font-bold text-gray-900">{formatFullCurrency(vouchers.reduce((s, v) => s + v.amount, 0))}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={16} className="text-gray-400" />
        {['all', 'journal', 'receipt', 'payment', 'contra', 'purchase', 'sales'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
              filter === type ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Voucher Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Voucher No</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Debit Account</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Credit Account</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Project</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map(v => (
                <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900">{v.voucherNo}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[v.type]}`}>
                      {v.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{v.date}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{v.debitAccount}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{v.creditAccount}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatFullCurrency(v.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.project || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    {v.approved ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12} /> Approved</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600"><Clock size={12} /> Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-1 text-gray-400 hover:text-gray-700"><Eye size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Voucher Modal */}
      {showNewVoucher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">New Voucher Entry</h2>
              <button onClick={() => setShowNewVoucher(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Voucher Type</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Journal</option>
                    <option>Receipt</option>
                    <option>Payment</option>
                    <option>Contra</option>
                    <option>Purchase</option>
                    <option>Sales</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" defaultValue="2025-04-30" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Debit Account</label>
                <input type="text" placeholder="Select or type account name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Credit Account</label>
                <input type="text" placeholder="Select or type account name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Amount (₹)</label>
                  <input type="number" placeholder="0.00" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Project Allocation</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Green Valley Residency</option>
                    <option>Skyline Heights</option>
                    <option>Royal Business Park</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Narration</label>
                <textarea placeholder="Enter description..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-20 resize-none" />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700 font-medium">✓ Double-entry validation: Debit = Credit</p>
                <p className="text-xs text-blue-600 mt-1">This entry will be balanced and ready for approval workflow.</p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowNewVoucher(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">Save & Submit for Approval</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
