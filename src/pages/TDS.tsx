import { FileText, Download, AlertTriangle, CheckCircle } from 'lucide-react';

const tdsRecords = [
  { section: '194C', party: 'M/s Sharma Constructions', amount: 3200000, rate: 2, deducted: 64000, deposited: true, challanNo: 'BSR-001', date: '2025-04-15' },
  { section: '194C', party: 'M/s Patel Electricals', amount: 1250000, rate: 2, deducted: 25000, deposited: true, challanNo: 'BSR-002', date: '2025-04-15' },
  { section: '194C', party: 'M/s Gupta Plumbing', amount: 890000, rate: 2, deducted: 17800, deposited: false, challanNo: '-', date: '-' },
  { section: '194I', party: 'M/s Office Rent LLP', amount: 500000, rate: 10, deducted: 50000, deposited: true, challanNo: 'BSR-003', date: '2025-04-20' },
  { section: '194J', party: 'Architect Design Studio', amount: 750000, rate: 10, deducted: 75000, deposited: false, challanNo: '-', date: '-' },
  { section: '194C', party: 'M/s Transport Co.', amount: 450000, rate: 2, deducted: 9000, deposited: true, challanNo: 'BSR-004', date: '2025-04-25' },
];

export default function TDS() {
  const totalDeducted = tdsRecords.reduce((s, r) => s + r.deducted, 0);
  const totalDeposited = tdsRecords.filter(r => r.deposited).reduce((s, r) => s + r.deducted, 0);
  const pendingDeposit = totalDeducted - totalDeposited;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TDS / TCS Management</h1>
          <p className="text-sm text-gray-500">Deduction calculation, challan tracking, reconciliation and return preparation</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 flex items-center gap-1.5">
            <Download size={14} /> Form 26Q
          </button>
          <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">+ Deduct TDS</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total TDS Deducted</p>
          <p className="text-xl font-bold text-gray-900">₹{totalDeducted.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Deposited to Govt</p>
          <p className="text-xl font-bold text-emerald-600">₹{totalDeposited.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Pending Deposit</p>
          <p className="text-xl font-bold text-amber-600">₹{pendingDeposit.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Next Due Date</p>
          <p className="text-xl font-bold text-red-600">31 May</p>
          <p className="text-[10px] text-gray-500">TDS return Q4</p>
        </div>
      </div>

      {/* TDS Records */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={18} className="text-blue-600" /> TDS Deduction Register — April 2025
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Section</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Party</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Payment</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Rate %</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">TDS Deducted</th>
                <th className="text-center px-4 py-2.5 font-medium text-gray-600">Deposited</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Challan</th>
              </tr>
            </thead>
            <tbody>
              {tdsRecords.map((record, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{record.section}</span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-900 font-medium">{record.party}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">₹{record.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-right text-gray-600">{record.rate}%</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-900">₹{record.deducted.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-center">
                    {record.deposited ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12} /> Yes</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600"><AlertTriangle size={12} /> No</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{record.challanNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Deposits Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle size={20} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">2 TDS deductions pending deposit</p>
            <p className="text-xs text-amber-700 mt-1">₹{pendingDeposit.toLocaleString('en-IN')} needs to be deposited by 7th of next month to avoid interest under Section 201(1A).</p>
          </div>
          <button className="ml-auto px-3 py-1.5 text-xs bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium">Generate Challan</button>
        </div>
      </div>

      {/* Section-wise Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Section-wise TDS Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-blue-600 font-medium">194C (Contractors)</p>
            <p className="text-lg font-bold text-blue-700">₹1,15,800</p>
            <p className="text-[10px] text-blue-600">4 deductions</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <p className="text-xs text-purple-600 font-medium">194I (Rent)</p>
            <p className="text-lg font-bold text-purple-700">₹50,000</p>
            <p className="text-[10px] text-purple-600">1 deduction</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg text-center">
            <p className="text-xs text-pink-600 font-medium">194J (Professional)</p>
            <p className="text-lg font-bold text-pink-700">₹75,000</p>
            <p className="text-[10px] text-pink-600">1 deduction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
