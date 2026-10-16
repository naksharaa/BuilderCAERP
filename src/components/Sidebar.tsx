import { Page } from '../types';
import {
  LayoutDashboard, BookOpen, Building2, Truck, Users, Receipt,
  Landmark, Upload, CalendarCheck, BarChart3, FileText, FolderOpen,
  Settings, ChevronLeft, ChevronRight, Shield
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems: { page: Page; label: string; icon: React.ReactNode; category: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, category: 'Main' },
  { page: 'accounting', label: 'Accounting', icon: <BookOpen size={20} />, category: 'Core' },
  { page: 'projects', label: 'Projects', icon: <Building2 size={20} />, category: 'Core' },
  { page: 'suppliers', label: 'Suppliers', icon: <Truck size={20} />, category: 'Core' },
  { page: 'customers', label: 'Customers & Flats', icon: <Users size={20} />, category: 'Core' },
  { page: 'gst', label: 'GST Management', icon: <Receipt size={20} />, category: 'Compliance' },
  { page: 'tds', label: 'TDS / TCS', icon: <FileText size={20} />, category: 'Compliance' },
  { page: 'bank', label: 'Bank Reconciliation', icon: <Landmark size={20} />, category: 'Operations' },
  { page: 'import', label: 'Import Data', icon: <Upload size={20} />, category: 'Operations' },
  { page: 'compliance', label: 'Compliance Calendar', icon: <CalendarCheck size={20} />, category: 'Compliance' },
  { page: 'reports', label: 'MIS Reports', icon: <BarChart3 size={20} />, category: 'Reports' },
  { page: 'documents', label: 'Documents', icon: <FolderOpen size={20} />, category: 'Operations' },
  { page: 'settings', label: 'Settings', icon: <Settings size={20} />, category: 'Admin' },
];

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggle }: SidebarProps) {
  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white flex flex-col transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-700">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-white whitespace-nowrap">Builder CA ERP</h1>
            <p className="text-[10px] text-slate-400 whitespace-nowrap">Accounting & Projects</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {categories.map(category => (
          <div key={category} className="mb-3">
            {!collapsed && (
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-1">{category}</p>
            )}
            {menuItems.filter(item => item.category === category).map(item => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  currentPage === item.page
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-700">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-emerald-400">RK</div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">Rajesh Kumar</p>
              <p className="text-[10px] text-slate-400 truncate">Super Admin</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
