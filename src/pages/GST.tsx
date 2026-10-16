import { gstRecords } from '../data';
import { formatFullCurrency } from '../data';
import { Receipt, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

export default function GST() {
  const purchaseGST = gstRecords.filter(r => r.type === 'purchase');
  const salesGST = gstRecords.filter(r => r.type === 'sales');
  const totalITC = purchaseGST.reduce((s, r) => s + r.cgst + r.sgst + r.igst, 0);
  const totalOutput = salesGST.reduce((s, r) => s + r.cgst + r.sgst + r.igst, 0);
  const netPayable = totalOutput - totalITC;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GST Management</h1>
          <p className="text-sm text-gray-500">Purchase/Sales registers, ITC reconciliation, GSTR-1 & GSTR-3B working papers</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100">GSTR-1</button>
          <button className="px-3 py-2 text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100">GSTR-3B</button>
        </div>
      </div>

      {/* GST Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Output GST (Sales)</p>
          <p className="text-xl font-bold text-red-600">{formatFullCurrency(totalOutput)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Input Tax Credit</p>
          <p className="text-xl font-bold text-emerald-600">{formatFullCurrency(totalITC)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Net Payable</p>
          <p className="text-xl font-bold text-gray-900">{formatFullCurrency(netPayable)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">ITC Mismatches</p>
          <p className="text-xl font-bold text-amber-600">2</p>
          <p className="text-[10px] text-amber-500">Needs review</p>
        </div>
      </div>

      {/* ITC Reconciliation */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-emerald-600" /> ITC Reconciliation Status
        </h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-emerald-600">4</p>
            <p className="text-xs text-emerald-700">Matched</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-600">2</p>
            <p className="text-xs text-amber-700">Mismatch</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-xs text-blue-700">Missing in 2A</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-red-600">0</p>
            <p className="text-xs text-red-700">Blocked ITC</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-600" />
            <p className="text-xs text-amber-700 font-medium">2 invoices have GSTIN mismatch between GSTR-2A and purchase register</p>
          </div>
        </div>
      </div>

      {/* GST Register Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">GST Register - April 2025</h3>
          <div className="flex gap-2">
            <button className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded font-medium">Purchase</button>
            <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded font-medium">Sales</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Invoice</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Party</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">GSTIN</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Taxable</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">CGST</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">SGST</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Total</th>
                <th className="text-center px-4 py-2.5 font-medium text-gray-600">ITC</th>
              </tr>
            </thead>
            <tbody>
              {gstRecords.map(record => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${record.type === 'purchase' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {record.type === 'purchase' ? 'P' : 'S'}
                    </span>
                    <span className="ml-2 font-mono text-xs">{record.invoiceNo}</span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{record.date}</td>
                  <td className="px-4 py-2.5 text-gray-900 font-medium">{record.partyName}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{record.gstin || 'N/A'}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{formatFullCurrency(record.taxableValue)}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{formatFullCurrency(record.cgst)}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{formatFullCurrency(record.sgst)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-900">{formatFullCurrency(record.total)}</td>
                  <td className="px-4 py-2.5 text-center">
                    {record.itcAvailable ? (
                      <CheckCircle size={14} className="text-emerald-500 inline" />
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
