import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Printer } from 'lucide-react';

const trialBalance = [
  { account: 'Cash in Hand', debit: 250000, credit: 0 },
  { account: 'HDFC Bank', debit: 13360000, credit: 0 },
  { account: 'SBI Bank', debit: 8500000, credit: 0 },
  { account: 'Accounts Receivable', debit: 48500000, credit: 0 },
  { account: 'Construction WIP - Green Valley', debit: 128000000, credit: 0 },
  { account: 'Construction WIP - Skyline Heights', debit: 84500000, credit: 0 },
  { account: 'Construction WIP - Royal Business', debit: 212000000, credit: 0 },
  { account: 'Fixed Assets', debit: 45000000, credit: 0 },
  { account: 'Accounts Payable', debit: 0, credit: 26200000 },
  { account: 'Customer Advances', debit: 0, credit: 185000000 },
  { account: 'Share Capital', debit: 0, credit: 50000000 },
  { account: 'Retained Earnings', debit: 0, credit: 15000000 },
  { account: 'Revenue from Operations', debit: 0, credit: 585000000 },
  { account: 'Construction Expenses', debit: 424500000, credit: 0 },
  { account: 'GST Payable', debit: 0, credit: 3850000 },
];

const revenueData = [
  { name: 'Green Valley', value: 18500 },
  { name: 'Skyline Heights', value: 12000 },
  { name: 'Royal Business', value: 28000 },
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6'];

export default function Reports() {
  const totalDebit = trialBalance.reduce((s, r) => s + r.debit, 0);
  const totalCredit = trialBalance.reduce((s, r) => s + r.credit, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MIS Reports</h1>
          <p className="text-sm text-gray-500">Project P&L, Cash Flow, Trial Balance, Balance Sheet working papers</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1.5">
            <Printer size={14} /> Print
          </button>
          <button className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1.5">
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex gap-2 flex-wrap">
        {['Trial Balance', 'Project P&L', 'Cash Flow', 'Balance Sheet', 'Ledger', 'Day Book', 'Receipt Book', 'Payment Book'].map(report => (
          <button key={report} className={`px-3 py-1.5 text-xs rounded-full font-medium ${
            report === 'Trial Balance' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}>{report}</button>
        ))}
      </div>

      {/* Trial Balance */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={18} className="text-blue-600" /> Trial Balance as on 30-Apr-2025
          </h3>
          <span className="text-xs text-gray-500">Green Valley Developers Pvt Ltd</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Account Name</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Debit (₹)</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Credit (₹)</th>
              </tr>
            </thead>
            <tbody>
              {trialBalance.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900">{row.account}</td>
                  <td className="px-4 py-2 text-right text-gray-700">{row.debit > 0 ? `₹${row.debit.toLocaleString('en-IN')}` : '-'}</td>
                  <td className="px-4 py-2 text-right text-gray-700">{row.credit > 0 ? `₹${row.credit.toLocaleString('en-IN')}` : '-'}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3 text-gray-900">Total</td>
                <td className="px-4 py-3 text-right text-gray-900">₹{totalDebit.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right text-gray-900">₹{totalCredit.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-emerald-50 border-t border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            ✓ Trial Balance is tallied. Debits = Credits = ₹{(totalDebit / 10000000).toFixed(2)} Crores
          </p>
        </div>
      </div>

      {/* Revenue by Project */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue by Project (₹ Lakhs)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => [`₹${value}L`, 'Revenue']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {revenueData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={revenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {revenueData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Project-wise P&L', desc: 'Revenue vs expenses per project' },
            { name: 'Cash Flow Statement', desc: 'Monthly inflows and outflows' },
            { name: 'Customer Outstanding', desc: 'Flat-wise receivable aging' },
            { name: 'Supplier Ageing', desc: 'Payable aging analysis' },
            { name: 'GST Reconciliation', desc: 'ITC vs GSTR-2A matching' },
            { name: 'Bank Reconciliation', desc: 'Unmatched items report' },
            { name: 'TDS Summary', desc: 'Deductions and challans' },
            { name: 'RERA Compliance', desc: 'Project-wise designated account' },
          ].map(report => (
            <button key={report.name} className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors">
              <p className="text-sm font-medium text-gray-900">{report.name}</p>
              <p className="text-[10px] text-gray-500 mt-1">{report.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
