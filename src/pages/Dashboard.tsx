import { Page } from '../types';
import { projects, vouchers, suppliers, customers, complianceTasks, bankTransactions } from '../data';
import { formatCurrency } from '../data';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock,
  ArrowRight, Building2, IndianRupee, FileCheck, CreditCard
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const totalReceivables = customers.reduce((sum, c) => sum + (c.agreementValue - c.totalReceived), 0);
const totalPayables = suppliers.reduce((sum, s) => sum + s.outstanding, 0);
const upcomingPayments = vouchers.filter(v => !v.approved).reduce((sum, v) => sum + v.amount, 0);
const pendingCompliance = complianceTasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;

const projectData = projects.map(p => ({
  name: p.name.split(' ').slice(0, 2).join(' '),
  spent: p.spent / 10000000,
  budget: p.totalBudget / 10000000,
}));

const monthlyData = [
  { month: 'Nov', collections: 85, expenses: 62 },
  { month: 'Dec', collections: 92, expenses: 78 },
  { month: 'Jan', collections: 78, expenses: 85 },
  { month: 'Feb', collections: 105, expenses: 72 },
  { month: 'Mar', collections: 118, expenses: 95 },
  { month: 'Apr', collections: 95, expenses: 88 },
];

const expenseBreakdown = [
  { name: 'Steel', value: 35, color: '#10b981' },
  { name: 'Cement', value: 22, color: '#3b82f6' },
  { name: 'Labour', value: 18, color: '#f59e0b' },
  { name: 'Electrical', value: 12, color: '#8b5cf6' },
  { name: 'Plumbing', value: 8, color: '#ef4444' },
  { name: 'Others', value: 5, color: '#6b7280' },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Builder Finance ERP</h1>
          <p className="text-sm text-gray-500">Accounting & project control center — FY 2025-26</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNavigate('import')} className="px-4 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-medium">
            Import Data
          </button>
          <button onClick={() => onNavigate('reports')} className="px-4 py-2 text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors font-medium">
            Reports
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Customer Receivables"
          value={formatCurrency(totalReceivables)}
          subtitle="Outstanding from flat buyers"
          icon={<IndianRupee size={20} />}
          color="emerald"
          trend="+12%"
          trendUp={true}
          onClick={() => onNavigate('customers')}
        />
        <KPICard
          title="Supplier Payables"
          value={formatCurrency(totalPayables)}
          subtitle="Outstanding to vendors"
          icon={<CreditCard size={20} />}
          color="blue"
          trend="-5%"
          trendUp={false}
          onClick={() => onNavigate('suppliers')}
        />
        <KPICard
          title="Pending Approvals"
          value={formatCurrency(upcomingPayments)}
          subtitle={`${vouchers.filter(v => !v.approved).length} vouchers awaiting`}
          icon={<Clock size={20} />}
          color="amber"
          trend="2 urgent"
          trendUp={false}
          onClick={() => onNavigate('accounting')}
        />
        <KPICard
          title="Pending Compliance"
          value={`${pendingCompliance} tasks`}
          subtitle="GST, TDS, RERA deadlines"
          icon={<FileCheck size={20} />}
          color="red"
          trend="2 due this week"
          trendUp={false}
          onClick={() => onNavigate('compliance')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project-wise Expenses */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Project-wise Financial Overview</h3>
            <button onClick={() => onNavigate('projects')} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => [`₹${value.toFixed(2)} Cr`, '']} />
              <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} name="Spent (Cr)" />
              <Bar dataKey="budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Budget (Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={expenseBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {expenseBreakdown.map(item => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600">{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Cash Flow */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Cash Flow (₹ Lakhs)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="collections" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Collections" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            <button onClick={() => onNavigate('accounting')} className="text-sm text-emerald-600 hover:text-emerald-700">View all</button>
          </div>
          <div className="space-y-3">
            {vouchers.slice(0, 5).map(v => (
              <div key={v.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  v.type === 'receipt' ? 'bg-emerald-100 text-emerald-600' :
                  v.type === 'payment' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {v.type === 'receipt' ? <TrendingUp size={14} /> : v.type === 'payment' ? <TrendingDown size={14} /> : <Building2 size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{v.narration}</p>
                  <p className="text-[10px] text-gray-500">{v.date} • {v.voucherNo}</p>
                </div>
                <span className={`text-xs font-semibold ${v.type === 'receipt' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {v.type === 'receipt' ? '+' : '-'}{formatCurrency(v.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Compliance */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Upcoming Compliance Deadlines</h3>
            <button onClick={() => onNavigate('compliance')} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {complianceTasks.filter(t => t.status !== 'completed').slice(0, 4).map(task => (
              <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                task.status === 'overdue' ? 'border-red-200 bg-red-50' :
                task.status === 'pending' ? 'border-amber-200 bg-amber-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                {task.status === 'overdue' ? <AlertTriangle size={16} className="text-red-500" /> :
                 task.status === 'completed' ? <CheckCircle2 size={16} className="text-emerald-500" /> :
                 <Clock size={16} className="text-amber-500" />}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">Due: {task.dueDate} • {task.assignee}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  task.type === 'GST' ? 'bg-emerald-100 text-emerald-700' :
                  task.type === 'TDS' ? 'bg-blue-100 text-blue-700' :
                  task.type === 'RERA' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>{task.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Bank Reconciliation Status</h3>
            <button onClick={() => onNavigate('bank')} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Reconcile <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-emerald-50 rounded-lg p-3">
              <p className="text-xs text-emerald-600 font-medium">Matched</p>
              <p className="text-lg font-bold text-emerald-700">{bankTransactions.filter(t => t.matched).length}</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-xs text-amber-600 font-medium">Unmatched</p>
              <p className="text-lg font-bold text-amber-700">{bankTransactions.filter(t => !t.matched).length}</p>
            </div>
          </div>
          <div className="space-y-2">
            {bankTransactions.filter(t => !t.matched).slice(0, 3).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-gray-900">{tx.description}</p>
                  <p className="text-[10px] text-gray-500">{tx.date}</p>
                </div>
                <span className={`text-xs font-semibold ${tx.credit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.credit > 0 ? '+' : '-'}{formatCurrency(tx.credit || tx.debit)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400">Illustrative dashboard only. Figures are examples, not actual builder-office financial data.</p>
      </div>
    </div>
  );
}

function KPICard({ title, value, subtitle, icon, color, trend, trendUp, onClick }: {
  title: string; value: string; subtitle: string; icon: React.ReactNode;
  color: string; trend: string; trendUp: boolean; onClick: () => void;
}) {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    amber: 'bg-amber-50 border-amber-200 text-amber-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  };
  const iconBg: Record<string, string> = {
    emerald: 'bg-emerald-100',
    blue: 'bg-blue-100',
    amber: 'bg-amber-100',
    red: 'bg-red-100',
  };

  return (
    <div onClick={onClick} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg[color]} ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
          trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
        }`}>{trend}</span>
      </div>
    </div>
  );
}
