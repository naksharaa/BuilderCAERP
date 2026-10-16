import { bankTransactions } from '../data';
import { formatFullCurrency } from '../data';
import { Landmark, CheckCircle, XCircle, Link2, Upload } from 'lucide-react';

export default function BankReconciliation() {
  const matched = bankTransactions.filter(t => t.matched);
  const unmatched = bankTransactions.filter(t => !t.matched);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Reconciliation</h1>
          <p className="text-sm text-gray-500">Bank statement import, transaction matching and unmatched items</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 flex items-center gap-1.5">
            <Upload size={14} /> Upload Statement
          </button>
          <button className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1.5">
            <Link2 size={14} /> Auto-Match
          </button>
        </div>
      </div>

      {/* Bank Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Bank Balance (as per statement)</p>
          <p className="text-xl font-bold text-gray-900">{formatFullCurrency(13360000)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Book Balance</p>
          <p className="text-xl font-bold text-gray-900">{formatFullCurrency(13585000)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Matched</p>
          <p className="text-xl font-bold text-emerald-600">{matched.length} transactions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Difference</p>
          <p className="text-xl font-bold text-amber-600">{formatFullCurrency(225000)}</p>
        </div>
      </div>

      {/* Reconciliation Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Landmark size={18} className="text-blue-600" /> HDFC Bank - Current Account
          </h3>
          <span className="text-xs text-gray-500">Statement Period: April 2025</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Reconciliation Progress</span>
            <span>{((matched.length / bankTransactions.length) * 100).toFixed(0)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(matched.length / bankTransactions.length) * 100}%` }} />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Description</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Debit</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Credit</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Balance</th>
                <th className="text-center px-4 py-2.5 font-medium text-gray-600">Status</th>
                <th className="text-center px-4 py-2.5 font-medium text-gray-600">Voucher Ref</th>
              </tr>
            </thead>
            <tbody>
              {bankTransactions.map(tx => (
                <tr key={tx.id} className={`border-b border-gray-100 ${tx.matched ? '' : 'bg-amber-50/50'}`}>
                  <td className="px-4 py-2.5 text-gray-600">{tx.date}</td>
                  <td className="px-4 py-2.5 text-gray-900 font-medium text-xs">{tx.description}</td>
                  <td className="px-4 py-2.5 text-right text-red-600">{tx.debit > 0 ? formatFullCurrency(tx.debit) : '-'}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600">{tx.credit > 0 ? formatFullCurrency(tx.credit) : '-'}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{formatFullCurrency(tx.balance)}</td>
                  <td className="px-4 py-2.5 text-center">
                    {tx.matched ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12} /> Matched</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600"><XCircle size={12} /> Unmatched</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono text-xs text-gray-600">{tx.voucherRef || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unmatched Items */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <XCircle size={18} className="text-amber-600" /> Unmatched Items ({unmatched.length})
        </h3>
        <div className="space-y-2">
          {unmatched.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                <p className="text-xs text-gray-500">{tx.date} • {tx.credit > 0 ? 'Credit' : 'Debit'}: {formatFullCurrency(tx.credit || tx.debit)}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">Match</button>
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Create Voucher</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
