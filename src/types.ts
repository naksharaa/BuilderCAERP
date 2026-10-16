export type Page = 'dashboard' | 'accounting' | 'projects' | 'suppliers' | 'customers' | 'gst' | 'bank' | 'import' | 'compliance' | 'reports' | 'tds' | 'documents' | 'settings';

export interface Company {
  id: string;
  name: string;
  gstin: string;
  pan: string;
  financialYear: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  totalBudget: number;
  spent: number;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  reraNo?: string;
}

export interface Voucher {
  id: string;
  voucherNo: string;
  type: 'journal' | 'receipt' | 'payment' | 'contra' | 'purchase' | 'sales' | 'credit-note' | 'debit-note';
  date: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  narration: string;
  project?: string;
  approved: boolean;
  createdBy: string;
}

export interface Supplier {
  id: string;
  name: string;
  gstin: string;
  outstanding: number;
  totalPurchases: number;
  lastPayment: string;
  contact: string;
}

export interface Customer {
  id: string;
  name: string;
  project: string;
  flatNo: string;
  agreementValue: number;
  totalReceived: number;
  nextInstallment: string;
  contact: string;
  email: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  matched: boolean;
  voucherRef?: string;
}

export interface ComplianceTask {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignee: string;
  type: 'GST' | 'TDS' | 'TCS' | 'RERA' | 'ROC' | 'Income Tax';
}

export interface ImportBatch {
  id: string;
  fileName: string;
  type: string;
  records: number;
  importedAt: string;
  status: 'completed' | 'partial' | 'failed' | 'pending';
}

export interface GSTRecord {
  id: string;
  invoiceNo: string;
  date: string;
  partyName: string;
  gstin: string;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  type: 'purchase' | 'sales';
  itcAvailable: boolean;
}
