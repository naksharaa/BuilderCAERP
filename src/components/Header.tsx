import { Search, Bell, Plus, Download } from 'lucide-react';

interface HeaderProps {
  company: string;
  financialYear: string;
  onCompanyChange: (company: string) => void;
  onFYChange: (fy: string) => void;
}

export default function Header({ company, financialYear, onCompanyChange, onFYChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      {/* Left: Company & FY Selector */}
      <div className="flex items-center gap-3">
        <select
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="text-sm font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option>Green Valley Developers Pvt Ltd</option>
          <option>Skyline Constructions</option>
        </select>
        <select
          value={financialYear}
          onChange={(e) => onFYChange(e.target.value)}
          className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option>2025-26</option>
          <option>2024-25</option>
          <option>2023-24</option>
        </select>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vouchers, projects, suppliers, invoices..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          <Plus size={16} />
          New Voucher
        </button>
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download size={16} />
          Import
        </button>
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
