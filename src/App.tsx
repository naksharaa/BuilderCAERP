import { useState } from 'react';
import { Page } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Accounting from './pages/Accounting';
import Projects from './pages/Projects';
import Suppliers from './pages/Suppliers';
import Customers from './pages/Customers';
import GST from './pages/GST';
import BankReconciliation from './pages/BankReconciliation';
import ImportWizard from './pages/ImportWizard';
import Compliance from './pages/Compliance';
import Reports from './pages/Reports';
import TDS from './pages/TDS';
import Documents from './pages/Documents';
import Settings from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [company, setCompany] = useState('Green Valley Developers Pvt Ltd');
  const [financialYear, setFinancialYear] = useState('2025-26');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'accounting': return <Accounting />;
      case 'projects': return <Projects />;
      case 'suppliers': return <Suppliers />;
      case 'customers': return <Customers />;
      case 'gst': return <GST />;
      case 'bank': return <BankReconciliation />;
      case 'import': return <ImportWizard />;
      case 'compliance': return <Compliance />;
      case 'reports': return <Reports />;
      case 'tds': return <TDS />;
      case 'documents': return <Documents />;
      case 'settings': return <Settings />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          company={company}
          financialYear={financialYear}
          onCompanyChange={setCompany}
          onFYChange={setFinancialYear}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
