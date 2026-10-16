import { projects } from '../data';
import { formatCurrency } from '../data';
import { Building2, MapPin, Calendar, IndianRupee, TrendingUp } from 'lucide-react';

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Construction Projects</h1>
          <p className="text-sm text-gray-500">Site-wise expenses, budgets, cost tracking and profitability</p>
        </div>
        <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">+ Add Project</button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => {
          const percentUsed = (project.spent / project.totalBudget) * 100;
          return (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Building2 size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{project.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{project.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Budget</p>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(project.totalBudget)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Spent</p>
                  <p className="text-sm font-bold text-emerald-600">{formatCurrency(project.spent)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Remaining</p>
                  <p className="text-sm font-bold text-blue-600">{formatCurrency(project.totalBudget - project.spent)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Budget Utilization</span>
                  <span>{percentUsed.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${percentUsed > 80 ? 'bg-red-500' : percentUsed > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${percentUsed}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={10} /> Started: {project.startDate}</span>
                {project.reraNo && <span className="text-purple-600 font-medium">RERA: {project.reraNo}</span>}
              </div>

              {/* Expense Categories */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-600 mb-2">Expense Categories</p>
                <div className="flex gap-1.5 flex-wrap">
                  {['Steel', 'Cement', 'Labour', 'Electrical', 'Tiles', 'Plumbing'].map(cat => (
                    <span key={cat} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">{cat}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Profitability Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-emerald-600" /> Project Profitability Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Project</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Total Revenue</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Total Expenses</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Profit/Loss</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Green Valley Residency', revenue: 185000000, expenses: 128000000 },
                { name: 'Skyline Heights', revenue: 120000000, expenses: 84500000 },
                { name: 'Royal Business Park', revenue: 280000000, expenses: 212000000 },
                { name: 'Lake View Villas', revenue: 45000000, expenses: 42000000 },
              ].map((p, i) => {
                const profit = p.revenue - p.expenses;
                const margin = (profit / p.revenue) * 100;
                return (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(p.revenue)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(p.expenses)}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${profit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrency(profit)}
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold ${margin > 15 ? 'text-emerald-600' : margin > 5 ? 'text-amber-600' : 'text-red-600'}`}>
                      {margin.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
