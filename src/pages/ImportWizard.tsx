import { useState } from 'react';
import { importBatches } from '../data';
import { Upload, FileSpreadsheet, FileText, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Shield, Database, RefreshCw } from 'lucide-react';

export default function ImportWizard() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const importTypes = [
    { id: 'tally', label: 'Tally Export', icon: <Database size={24} />, desc: 'XML, Excel or CSV exports from Tally', color: 'bg-blue-100 text-blue-600' },
    { id: 'excel', label: 'Excel / CSV Ledger', icon: <FileSpreadsheet size={24} />, desc: 'Customer, supplier or general ledgers', color: 'bg-emerald-100 text-emerald-600' },
    { id: 'bank', label: 'Bank Statement', icon: <FileText size={24} />, desc: 'HDFC, SBI, ICICI statement formats', color: 'bg-purple-100 text-purple-600' },
    { id: 'booking', label: 'Flat Booking Register', icon: <FileSpreadsheet size={24} />, desc: 'Customer bookings and installments', color: 'bg-amber-100 text-amber-600' },
    { id: 'project', label: 'Project Expenses', icon: <FileSpreadsheet size={24} />, desc: 'Site-wise construction expenses', color: 'bg-red-100 text-red-600' },
    { id: 'opening', label: 'Opening Balances', icon: <Database size={24} />, desc: 'Ledger opening balances for new FY', color: 'bg-teal-100 text-teal-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Data Migration Wizard</h1>
          <p className="text-sm text-gray-500">Import existing data from Excel, Tally exports, bank statements and more</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-6">
          {['Upload Files', 'Map Fields', 'Preview & Validate', 'Import Data', 'Reconcile'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-emerald-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i + 1 < step ? 'bg-emerald-600 text-white' :
                  i + 1 === step ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {i + 1 < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className="text-xs font-medium hidden lg:block">{label}</span>
              </div>
              {i < 4 && <div className={`w-8 lg:w-16 h-0.5 mx-2 ${i + 1 < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Step 1: Select import type and upload files</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {importTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedType === type.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${type.color}`}>
                    {type.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{type.label}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{type.desc}</p>
                </button>
              ))}
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <Upload size={32} className="mx-auto text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700">Drag & drop files here or click to browse</p>
              <p className="text-xs text-gray-500 mt-1">Supports .xlsx, .xls, .csv, .xml formats • Max 50MB per file</p>
              <button className="mt-3 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Browse Files
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700 font-medium flex items-center gap-1"><Shield size={12} /> Safeguard: Original files remain untouched. Import batches can be reversed before accounts are finalized.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Step 2: Map spreadsheet columns to system fields</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-3">File: tally_ledger_export_apr2025.xlsx • 1,245 records detected</p>
              <div className="space-y-2">
                {[
                  { system: 'Date', file: 'Column A (Voucher Date)', confidence: 98 },
                  { system: 'Voucher Number', file: 'Column B (Vch No.)', confidence: 95 },
                  { system: 'Debit Account', file: 'Column C (Ledger Name)', confidence: 88 },
                  { system: 'Credit Account', file: 'Column D (Against)', confidence: 85 },
                  { system: 'Amount', file: 'Column E (Amount)', confidence: 99 },
                  { system: 'Narration', file: 'Column F (Narration)', confidence: 92 },
                  { system: 'GSTIN', file: 'Column G (GSTIN/UIN)', confidence: 78 },
                ].map((mapping, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-2 border border-gray-200">
                    <span className="text-xs font-medium text-gray-700 w-32">{mapping.system}</span>
                    <ArrowRight size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-600 flex-1">{mapping.file}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      mapping.confidence > 90 ? 'bg-emerald-100 text-emerald-700' :
                      mapping.confidence > 80 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{mapping.confidence}% match</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-700 flex items-center gap-1"><AlertTriangle size={12} /> 2 columns need manual mapping. GSTIN column has 22% unmapped values.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Step 3: Preview & validate imported data</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 bg-emerald-50 rounded-lg text-center">
                <p className="text-xl font-bold text-emerald-600">1,241</p>
                <p className="text-xs text-emerald-700">Valid Records</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg text-center">
                <p className="text-xl font-bold text-amber-600">3</p>
                <p className="text-xs text-amber-700">Duplicates Found</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-center">
                <p className="text-xl font-bold text-red-600">1</p>
                <p className="text-xs text-red-700">Unbalanced Entry</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-xl font-bold text-blue-600">5</p>
                <p className="text-xs text-blue-700">New Ledgers Needed</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1 text-gray-500">Row</th>
                    <th className="text-left py-1 text-gray-500">Date</th>
                    <th className="text-left py-1 text-gray-500">Vch No</th>
                    <th className="text-left py-1 text-gray-500">Debit</th>
                    <th className="text-left py-1 text-gray-500">Credit</th>
                    <th className="text-left py-1 text-gray-500">Amount</th>
                    <th className="text-center py-1 text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { row: 1, date: '01-Apr-25', vch: 'JV-001', dr: 'Steel Exp', cr: 'Tata Steel', amt: '45,00,000', status: 'ok' },
                    { row: 2, date: '01-Apr-25', vch: 'JV-002', dr: 'Cement Exp', cr: 'ACC Cement', amt: '18,00,000', status: 'ok' },
                    { row: 45, date: '15-Apr-25', vch: 'RC-012', dr: 'HDFC Bank', cr: 'Rahul Shah', amt: '25,00,000', status: 'dup' },
                    { row: 128, date: '22-Apr-25', vch: 'JV-089', dr: 'Misc Exp', cr: 'Cash', amt: '50,000', status: 'err' },
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-1 text-gray-600">{r.row}</td>
                      <td className="py-1">{r.date}</td>
                      <td className="py-1 font-mono">{r.vch}</td>
                      <td className="py-1">{r.dr}</td>
                      <td className="py-1">{r.cr}</td>
                      <td className="py-1 font-medium">₹{r.amt}</td>
                      <td className="py-1 text-center">
                        {r.status === 'ok' ? <CheckCircle size={12} className="text-emerald-500 inline" /> :
                         r.status === 'dup' ? <span className="text-amber-600">⚠ Dup</span> :
                         <span className="text-red-600">✗ Error</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw size={28} className="text-emerald-600 animate-spin" />
            </div>
            <h3 className="font-semibold text-gray-900">Importing data...</h3>
            <p className="text-sm text-gray-500">Processing 1,241 records in batches. This may take a moment.</p>
            <div className="w-64 mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '75%' }} />
            </div>
            <p className="text-xs text-gray-400">Batch 4 of 5 • 932/1241 records processed</p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={28} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Import Complete!</h3>
              <p className="text-sm text-gray-500">1,241 records imported successfully with batch ID: BATCH-2025-04-001</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-emerald-50 rounded-lg text-center">
                <p className="text-lg font-bold text-emerald-600">✓ Matched</p>
                <p className="text-xs text-emerald-700">Opening balances verified</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-600">✓ Trial Balance</p>
                <p className="text-xs text-blue-700">Debits = Credits confirmed</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-600">✓ Reversible</p>
                <p className="text-xs text-purple-700">Batch can be reversed if needed</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            <ArrowLeft size={14} /> Previous
          </button>
          <button
            onClick={() => setStep(Math.min(5, step + 1))}
            disabled={step === 5}
            className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1 disabled:opacity-50"
          >
            {step === 4 ? 'Processing...' : 'Next'} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Import History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">File Name</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Type</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-600">Records</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Imported</th>
                <th className="text-center px-4 py-2.5 font-medium text-gray-600">Status</th>
                <th className="text-center px-4 py-2.5 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {importBatches.map(batch => (
                <tr key={batch.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-900 text-xs">{batch.fileName}</td>
                  <td className="px-4 py-2.5 text-gray-600">{batch.type}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{batch.records.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-gray-600">{batch.importedAt}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      batch.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      batch.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{batch.status}</span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <button className="text-xs text-blue-600 hover:underline">View</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-xs text-red-600 hover:underline">Reverse</button>
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
