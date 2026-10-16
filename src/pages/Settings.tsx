import { useState } from 'react';
import { Settings as SettingsIcon, Users, Shield, Database, Bell, Download, Upload, RefreshCw } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company Setup', icon: <Database size={16} /> },
    { id: 'users', label: 'Users & Roles', icon: <Users size={16} /> },
    { id: 'backup', label: 'Backup & Restore', icon: <RefreshCw size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  ];

  const users = [
    { name: 'Rajesh Kumar', role: 'Super Admin', email: 'rajesh@gvdev.com', status: 'active', lastLogin: '2025-04-30 09:15' },
    { name: 'Priya Sharma', role: 'CA', email: 'priya@cafirm.com', status: 'active', lastLogin: '2025-04-30 10:30' },
    { name: 'Amit Patel', role: 'Accountant', email: 'amit@gvdev.com', status: 'active', lastLogin: '2025-04-29 17:45' },
    { name: 'Suresh Menon', role: 'Site Manager', email: 'suresh@gvdev.com', status: 'active', lastLogin: '2025-04-28 14:20' },
    { name: 'CA Office (Read)', role: 'Auditor', email: 'audit@cafirm.com', status: 'active', lastLogin: '2025-04-25 11:00' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Company configuration, user management, backup and system preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-md font-medium transition-colors ${
              activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Company Setup */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2"><SettingsIcon size={18} /> Company Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Company Name</label>
              <input type="text" defaultValue="Green Valley Developers Pvt Ltd" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">GSTIN</label>
              <input type="text" defaultValue="27AABCG1234F1Z5" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">PAN</label>
              <input type="text" defaultValue="AABCG1234F" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">CIN</label>
              <input type="text" defaultValue="U70100MH2015PTC123456" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Financial Year</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>2025-26 (01-Apr-2025 to 31-Mar-2026)</option>
                <option>2024-25 (01-Apr-2024 to 31-Mar-2025)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Registered Address</label>
              <input type="text" defaultValue="101, Business Park, Pune 411001" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">Save Changes</button>
          </div>
        </div>
      )}

      {/* Users & Roles */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Users size={18} /> User Management</h3>
              <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">+ Add User</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Email</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Role</th>
                    <th className="text-center px-4 py-2.5 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-medium text-gray-900">{user.name}</td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{user.email}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'Super Admin' ? 'bg-red-100 text-red-700' :
                          user.role === 'CA' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'Accountant' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'Site Manager' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{user.role}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Active
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{user.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roles */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Shield size={18} /> Role Permissions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { role: 'Super Admin', perms: 'Full access to all modules' },
                { role: 'Builder Owner', perms: 'All reports, approvals, settings' },
                { role: 'CA', perms: 'Accounting, GST, TDS, Reports, Compliance' },
                { role: 'Accountant', perms: 'Voucher entry, ledgers, reconciliation' },
                { role: 'Site Manager', perms: 'Project expenses, material tracking' },
                { role: 'Auditor', perms: 'Read-only access to all modules' },
              ].map(r => (
                <div key={r.role} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{r.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.perms}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><RefreshCw size={18} /> Automatic Backup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm font-medium text-emerald-800">Daily Backup</p>
                <p className="text-xs text-emerald-700 mt-1">Last run: Today at 6:00 AM IST</p>
                <p className="text-xs text-emerald-600 mt-1">Size: 245 MB • Status: ✓ Success</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Monthly Archive</p>
                <p className="text-xs text-blue-700 mt-1">Last archive: 01-Apr-2025</p>
                <p className="text-xs text-blue-600 mt-1">Size: 1.2 GB • Versions: 12</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1.5">
                <Download size={14} /> Backup Now
              </button>
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5">
                <Upload size={14} /> Full Export (JSON/CSV)
              </button>
              <button className="px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-1.5">
                <RefreshCw size={14} /> Test Restore
              </button>
            </div>
          </div>

          {/* Backup History */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Backup History</h3>
            <div className="space-y-2">
              {[
                { date: '2025-04-30 06:00', size: '245 MB', type: 'Daily', status: 'success' },
                { date: '2025-04-29 06:00', size: '243 MB', type: 'Daily', status: 'success' },
                { date: '2025-04-28 06:00', size: '241 MB', type: 'Daily', status: 'success' },
                { date: '2025-04-01 00:00', size: '1.2 GB', type: 'Monthly Archive', status: 'success' },
                { date: '2025-03-01 00:00', size: '1.1 GB', type: 'Monthly Archive', status: 'success' },
              ].map((backup, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{backup.date}</p>
                      <p className="text-xs text-gray-500">{backup.type} • {backup.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-600 hover:underline">Download</button>
                    <button className="text-xs text-emerald-600 hover:underline">Restore</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Bell size={18} /> Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'Compliance deadline reminders', desc: 'Get notified 7 days and 3 days before due dates', enabled: true },
              { label: 'Voucher approval requests', desc: 'When a voucher is submitted for your approval', enabled: true },
              { label: 'Backup completion alerts', desc: 'Daily backup status notifications', enabled: true },
              { label: 'Import batch completion', desc: 'When data import finishes processing', enabled: true },
              { label: 'Payment due reminders', desc: 'Supplier payment due date alerts', enabled: false },
              { label: 'Customer installment reminders', desc: 'Upcoming flat installment due dates', enabled: false },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                  <p className="text-xs text-gray-500">{pref.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer ${pref.enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${pref.enabled ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
