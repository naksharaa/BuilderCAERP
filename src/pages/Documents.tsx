import { FolderOpen, FileText, Image, Upload, Search, Filter } from 'lucide-react';

const documents = [
  { name: 'Tata Steel - Invoice #INV-2025-0456.pdf', type: 'bill', size: '2.4 MB', date: '2025-04-01', project: 'Green Valley', category: 'Purchase Bills' },
  { name: 'ACC Cement - March Bill.pdf', type: 'bill', size: '1.8 MB', date: '2025-04-05', project: 'Skyline Heights', category: 'Purchase Bills' },
  { name: 'Flat A-702 - Agreement.pdf', type: 'agreement', size: '5.2 MB', date: '2025-03-15', project: 'Green Valley', category: 'Agreements' },
  { name: 'Flat B-1201 - Agreement.pdf', type: 'agreement', size: '4.8 MB', date: '2025-04-10', project: 'Skyline Heights', category: 'Agreements' },
  { name: 'HDFC Bank Statement - April 2025.xlsx', type: 'bank', size: '890 KB', date: '2025-04-30', project: 'All', category: 'Bank Statements' },
  { name: 'SBI Bank Statement - April 2025.xlsx', type: 'bank', size: '756 KB', date: '2025-04-30', project: 'All', category: 'Bank Statements' },
  { name: 'GST Payment Challan - March 2025.pdf', type: 'challan', size: '340 KB', date: '2025-04-20', project: 'All', category: 'GST Challans' },
  { name: 'TDS Challan - Q4 FY24-25.pdf', type: 'challan', size: '280 KB', date: '2025-04-25', project: 'All', category: 'TDS Challans' },
  { name: 'Sharma Constructions - RA Bill #5.pdf', type: 'bill', size: '3.1 MB', date: '2025-04-28', project: 'Green Valley', category: 'Contractor Bills' },
  { name: 'Site Photo - Tower B Progress.jpg', type: 'photo', size: '4.5 MB', date: '2025-04-22', project: 'Skyline Heights', category: 'Site Photos' },
  { name: 'Quotation - Elevator Installation.pdf', type: 'quotation', size: '1.2 MB', date: '2025-04-18', project: 'Royal Business', category: 'Quotations' },
  { name: 'RERA Registration Certificate.pdf', type: 'legal', size: '2.8 MB', date: '2024-01-15', project: 'Green Valley', category: 'Legal Documents' },
];

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-sm text-gray-500">Bills, agreements, bank statements, challans, quotations and PDFs</p>
        </div>
        <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1.5 font-medium">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search documents..." className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1.5">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Category Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { name: 'Purchase Bills', count: 45, icon: '📄' },
          { name: 'Agreements', count: 12, icon: '📋' },
          { name: 'Bank Statements', count: 24, icon: '🏦' },
          { name: 'GST Challans', count: 18, icon: '🧾' },
          { name: 'Contractor Bills', count: 32, icon: '👷' },
          { name: 'Site Photos', count: 67, icon: '📸' },
        ].map(cat => (
          <div key={cat.name} className="bg-white rounded-lg border border-gray-200 p-3 text-center hover:shadow-sm cursor-pointer">
            <span className="text-2xl">{cat.icon}</span>
            <p className="text-xs font-medium text-gray-900 mt-1">{cat.name}</p>
            <p className="text-lg font-bold text-gray-700">{cat.count}</p>
          </div>
        ))}
      </div>

      {/* Document List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Document</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Project</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Size</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${
                        doc.type === 'bill' ? 'bg-blue-100' :
                        doc.type === 'agreement' ? 'bg-purple-100' :
                        doc.type === 'bank' ? 'bg-emerald-100' :
                        doc.type === 'challan' ? 'bg-amber-100' :
                        doc.type === 'photo' ? 'bg-pink-100' :
                        'bg-gray-100'
                      }`}>
                        {doc.type === 'photo' ? <Image size={14} className="text-pink-600" /> : <FileText size={14} className="text-gray-600" />}
                      </div>
                      <span className="text-gray-900 font-medium text-xs">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{doc.category}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{doc.project}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{doc.date}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{doc.size}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-xs text-blue-600 hover:underline">View</button>
                      <button className="text-xs text-emerald-600 hover:underline">Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Storage Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FolderOpen size={18} className="text-amber-600" /> Storage Summary
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Files</p>
            <p className="text-lg font-bold text-gray-900">198</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Storage Used</p>
            <p className="text-lg font-bold text-gray-900">2.4 GB</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last Backup</p>
            <p className="text-lg font-bold text-emerald-600">Today, 6:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
