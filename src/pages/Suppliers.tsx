import { suppliers } from '../data';
import { formatFullCurrency } from '../data';
import { Truck, Phone, AlertTriangle, Clock } from 'lucide-react';

export default function Suppliers() {
  const totalOutstanding = suppliers.reduce((s, sup) => s + sup.outstanding, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-sm text-gray-500">Purchase bills, outstanding, advances, ageing and payment history</p>
        </div>
        <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">+ Add Supplier</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Suppliers</p>
          <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Outstanding</p>
          <p className="text-2xl font-bold text-red-600">{formatFullCurrency(totalOutstanding)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Purchases (FY)</p>
          <p className="text-2xl font-bold text-gray-900">{formatFullCurrency(suppliers.reduce((s, sup) => s + sup.totalPurchases, 0))}</p>
        </div>
      </div>

      {/* Supplier Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Supplier</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">GSTIN</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Outstanding</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Total Purchases</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Last Payment</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Contact</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Ageing</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(sup => {
                const daysSince = Math.floor((Date.now() - new Date(sup.lastPayment).getTime()) / 86400000);
                const ageing = daysSince > 60 ? 'critical' : daysSince > 30 ? 'warning' : 'normal';
                return (
                  <tr key={sup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Truck size={14} className="text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{sup.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{sup.gstin}</td>
                    <td className="px-4 py-3 text-right font-semibold text-red-600">{formatFullCurrency(sup.outstanding)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatFullCurrency(sup.totalPurchases)}</td>
                    <td className="px-4 py-3 text-gray-600">{sup.lastPayment}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-gray-600"><Phone size={12} />{sup.contact}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        ageing === 'critical' ? 'bg-red-100 text-red-700' :
                        ageing === 'warning' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {ageing === 'critical' ? <AlertTriangle size={10} /> : ageing === 'warning' ? <Clock size={10} /> : null}
                        {daysSince}d
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ageing Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Ageing Analysis</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <p className="text-xs text-emerald-600 font-medium">0-30 Days</p>
            <p className="text-lg font-bold text-emerald-700">₹18.5L</p>
            <p className="text-[10px] text-emerald-600">2 suppliers</p>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <p className="text-xs text-amber-600 font-medium">31-60 Days</p>
            <p className="text-lg font-bold text-amber-700">₹32.4L</p>
            <p className="text-[10px] text-amber-600">3 suppliers</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="text-xs text-orange-600 font-medium">61-90 Days</p>
            <p className="text-lg font-bold text-orange-700">₹8.5L</p>
            <p className="text-[10px] text-orange-600">1 supplier</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-red-600 font-medium">90+ Days</p>
            <p className="text-lg font-bold text-red-700">₹6.5L</p>
            <p className="text-[10px] text-red-600">1 supplier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
