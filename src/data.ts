import { Company, Project, Voucher, Supplier, Customer, BankTransaction, ComplianceTask, ImportBatch, GSTRecord } from './types';

export const companies: Company[] = [
  { id: '1', name: 'Green Valley Developers Pvt Ltd', gstin: '27AABCG1234F1Z5', pan: 'AABCG1234F', financialYear: '2025-26' },
  { id: '2', name: 'Skyline Constructions', gstin: '27AABCS5678G1Z3', pan: 'AABCS5678G', financialYear: '2025-26' },
];

export const projects: Project[] = [
  { id: '1', name: 'Green Valley Residency', location: 'Pune, Maharashtra', totalBudget: 250000000, spent: 128000000, status: 'active', startDate: '2024-01-15', reraNo: 'P52100034567' },
  { id: '2', name: 'Skyline Heights', location: 'Mumbai, Maharashtra', totalBudget: 180000000, spent: 84500000, status: 'active', startDate: '2024-06-01', reraNo: 'P51900028901' },
  { id: '3', name: 'Royal Business Park', location: 'Nashik, Maharashtra', totalBudget: 320000000, spent: 212000000, status: 'active', startDate: '2023-03-10', reraNo: 'P53100019876' },
  { id: '4', name: 'Lake View Villas', location: 'Lonavala, Maharashtra', totalBudget: 95000000, spent: 42000000, status: 'on-hold', startDate: '2024-09-20' },
];

export const vouchers: Voucher[] = [
  { id: '1', voucherNo: 'JR/25-26/001', type: 'journal', date: '2025-04-01', debitAccount: 'Construction Expenses - Steel', creditAccount: 'Accounts Payable - Tata Steel', amount: 4500000, narration: 'Steel procurement for Green Valley Phase 2', project: 'Green Valley Residency', approved: true, createdBy: 'Rajesh Kumar' },
  { id: '2', voucherNo: 'RC/25-26/045', type: 'receipt', date: '2025-04-15', debitAccount: 'HDFC Bank', creditAccount: 'Customer - Rahul Shah', amount: 2500000, narration: '3rd installment - Flat A-702', project: 'Green Valley Residency', approved: true, createdBy: 'Priya Sharma' },
  { id: '3', voucherNo: 'PY/25-26/032', type: 'payment', date: '2025-04-18', debitAccount: 'Accounts Payable - ACC Cement', creditAccount: 'SBI Bank', amount: 1800000, narration: 'Cement bill payment - March', project: 'Skyline Heights', approved: true, createdBy: 'Rajesh Kumar' },
  { id: '4', voucherNo: 'CN/25-26/008', type: 'contra', date: '2025-04-20', debitAccount: 'Cash', creditAccount: 'HDFC Bank', amount: 500000, narration: 'Cash withdrawal for site expenses', project: 'Green Valley Residency', approved: true, createdBy: 'Rajesh Kumar' },
  { id: '5', voucherNo: 'PU/25-26/021', type: 'purchase', date: '2025-04-22', debitAccount: 'Construction Expenses - Plumbing', creditAccount: 'Accounts Payable - Supreme Pipes', amount: 890000, narration: 'Plumbing materials for Tower B', project: 'Skyline Heights', approved: false, createdBy: 'Amit Patel' },
  { id: '6', voucherNo: 'JR/25-26/002', type: 'journal', date: '2025-04-25', debitAccount: 'Construction Expenses - Electrical', creditAccount: 'Accounts Payable - Polycab', amount: 1250000, narration: 'Electrical wiring materials', project: 'Royal Business Park', approved: true, createdBy: 'Priya Sharma' },
  { id: '7', voucherNo: 'RC/25-26/046', type: 'receipt', date: '2025-04-28', debitAccount: 'HDFC Bank', creditAccount: 'Customer - Meena Joshi', amount: 5000000, narration: 'Booking amount - Flat B-1201', project: 'Skyline Heights', approved: true, createdBy: 'Rajesh Kumar' },
  { id: '8', voucherNo: 'PY/25-26/033', type: 'payment', date: '2025-04-30', debitAccount: 'Contractor - M/s Sharma Constructions', creditAccount: 'SBI Bank', amount: 3200000, narration: 'RA Bill #5 - Structure work', project: 'Green Valley Residency', approved: false, createdBy: 'Amit Patel' },
];

export const suppliers: Supplier[] = [
  { id: '1', name: 'Tata Steel Ltd', gstin: '27AAACT2345H1Z8', outstanding: 4500000, totalPurchases: 28500000, lastPayment: '2025-03-15', contact: '9876543210' },
  { id: '2', name: 'ACC Cement', gstin: '27AABCA6789J1Z2', outstanding: 1800000, totalPurchases: 15200000, lastPayment: '2025-04-18', contact: '9876543211' },
  { id: '3', name: 'Supreme Pipes', gstin: '27AABCS1234K1Z5', outstanding: 890000, totalPurchases: 6800000, lastPayment: '2025-02-28', contact: '9876543212' },
  { id: '4', name: 'Polycab India', gstin: '27AABCP5678L1Z3', outstanding: 1250000, totalPurchases: 9200000, lastPayment: '2025-03-20', contact: '9876543213' },
  { id: '5', name: 'M/s Sharma Constructions', gstin: '27AABFS9012M1Z7', outstanding: 8500000, totalPurchases: 42000000, lastPayment: '2025-04-30', contact: '9876543214' },
  { id: '6', name: 'Asian Paints', gstin: '27AABCA3456N1Z1', outstanding: 650000, totalPurchases: 4500000, lastPayment: '2025-04-10', contact: '9876543215' },
  { id: '7', name: 'Kajaria Tiles', gstin: '27AABCK7890O1Z4', outstanding: 1100000, totalPurchases: 7800000, lastPayment: '2025-03-25', contact: '9876543216' },
];

export const customers: Customer[] = [
  { id: '1', name: 'Rahul Shah', project: 'Green Valley Residency', flatNo: 'A-702', agreementValue: 6500000, totalReceived: 2500000, nextInstallment: '2025-06-15', contact: '9822110033', email: 'rahul.shah@email.com' },
  { id: '2', name: 'Meena Joshi', project: 'Skyline Heights', flatNo: 'B-1201', agreementValue: 8200000, totalReceived: 5000000, nextInstallment: '2025-07-01', contact: '9822110044', email: 'meena.j@email.com' },
  { id: '3', name: 'Vikram Desai', project: 'Green Valley Residency', flatNo: 'A-305', agreementValue: 5800000, totalReceived: 5800000, nextInstallment: '', contact: '9822110055', email: 'vikram.d@email.com' },
  { id: '4', name: 'Priyanka Mehta', project: 'Royal Business Park', flatNo: 'C-401', agreementValue: 12500000, totalReceived: 7500000, nextInstallment: '2025-05-30', contact: '9822110066', email: 'priyanka.m@email.com' },
  { id: '5', name: 'Sanjay Kulkarni', project: 'Skyline Heights', flatNo: 'A-905', agreementValue: 7200000, totalReceived: 3600000, nextInstallment: '2025-06-01', contact: '9822110077', email: 'sanjay.k@email.com' },
  { id: '6', name: 'Anita Reddy', project: 'Green Valley Residency', flatNo: 'B-102', agreementValue: 5500000, totalReceived: 2200000, nextInstallment: '2025-05-15', contact: '9822110088', email: 'anita.r@email.com' },
];

export const bankTransactions: BankTransaction[] = [
  { id: '1', date: '2025-04-01', description: 'NEFT - Rahul Shah - Flat A-702', debit: 0, credit: 2500000, balance: 12500000, matched: true, voucherRef: 'RC/25-26/045' },
  { id: '2', date: '2025-04-05', description: 'UPI - ACC Cement Payment', debit: 1800000, credit: 0, balance: 10700000, matched: true, voucherRef: 'PY/25-26/032' },
  { id: '3', date: '2025-04-10', description: 'Cash Withdrawal', debit: 500000, credit: 0, balance: 10200000, matched: true, voucherRef: 'CN/25-26/008' },
  { id: '4', date: '2025-04-15', description: 'NEFT - Meena Joshi - Booking', debit: 0, credit: 5000000, balance: 15200000, matched: true, voucherRef: 'RC/25-26/046' },
  { id: '5', date: '2025-04-18', description: 'IMPS - Polycab India', debit: 750000, credit: 0, balance: 14450000, matched: false },
  { id: '6', date: '2025-04-22', description: 'GST Payment - GSTR-3B March', debit: 385000, credit: 0, balance: 14065000, matched: false },
  { id: '7', date: '2025-04-25', description: 'NEFT - TDS Payment Q4', debit: 225000, credit: 0, balance: 13840000, matched: false },
  { id: '8', date: '2025-04-28', description: 'Salary Disbursement', debit: 480000, credit: 0, balance: 13360000, matched: false },
];

export const complianceTasks: ComplianceTask[] = [
  { id: '1', title: 'GSTR-1 Filing - April 2025', dueDate: '2025-05-11', status: 'pending', assignee: 'Priya Sharma', type: 'GST' },
  { id: '2', title: 'GSTR-3B Filing - April 2025', dueDate: '2025-05-20', status: 'pending', assignee: 'Priya Sharma', type: 'GST' },
  { id: '3', title: 'TDS Return - Q4 FY 2024-25', dueDate: '2025-05-31', status: 'in-progress', assignee: 'Rajesh Kumar', type: 'TDS' },
  { id: '4', title: 'RERA Quarterly Update - Green Valley', dueDate: '2025-05-15', status: 'pending', assignee: 'Amit Patel', type: 'RERA' },
  { id: '5', title: 'TCS Return - Q4 FY 2024-25', dueDate: '2025-05-31', status: 'completed', assignee: 'Rajesh Kumar', type: 'TCS' },
  { id: '6', title: 'Advance Tax - 15 June 2025', dueDate: '2025-06-15', status: 'pending', assignee: 'CA Office', type: 'Income Tax' },
  { id: '7', title: 'ROC Annual Filing - FY 2024-25', dueDate: '2025-10-30', status: 'pending', assignee: 'CA Office', type: 'ROC' },
];

export const importBatches: ImportBatch[] = [
  { id: '1', fileName: 'tally_ledger_export_apr2025.xlsx', type: 'Tally Export', records: 1245, importedAt: '2025-04-01', status: 'completed' },
  { id: '2', fileName: 'supplier_outstanding.csv', type: 'Supplier Ledger', records: 89, importedAt: '2025-04-02', status: 'completed' },
  { id: '3', fileName: 'customer_collections.xlsx', type: 'Customer Register', records: 156, importedAt: '2025-04-03', status: 'completed' },
  { id: '4', fileName: 'hdfc_bank_stmt_apr2025.xlsx', type: 'Bank Statement', records: 342, importedAt: '2025-04-05', status: 'completed' },
  { id: '5', fileName: 'project_expenses_q4.xlsx', type: 'Project Expenses', records: 567, importedAt: '2025-04-08', status: 'partial' },
];

export const gstRecords: GSTRecord[] = [
  { id: '1', invoiceNo: 'INV/25-26/001', date: '2025-04-01', partyName: 'Tata Steel Ltd', gstin: '27AAACT2345H1Z8', taxableValue: 3813559, cgst: 343220, sgst: 343220, igst: 0, total: 4500000, type: 'purchase', itcAvailable: true },
  { id: '2', invoiceNo: 'INV/25-26/002', date: '2025-04-05', partyName: 'ACC Cement', gstin: '27AABCA6789J1Z2', taxableValue: 1525424, cgst: 137288, sgst: 137288, igst: 0, total: 1800000, type: 'purchase', itcAvailable: true },
  { id: '3', invoiceNo: 'SINV/25-26/015', date: '2025-04-15', partyName: 'Rahul Shah', gstin: '', taxableValue: 2118644, cgst: 190678, sgst: 190678, igst: 0, total: 2500000, type: 'sales', itcAvailable: false },
  { id: '4', invoiceNo: 'SINV/25-26/016', date: '2025-04-28', partyName: 'Meena Joshi', gstin: '', taxableValue: 4152542, cgst: 373729, sgst: 373729, igst: 0, total: 5000000, type: 'sales', itcAvailable: false },
  { id: '5', invoiceNo: 'INV/25-26/003', date: '2025-04-22', partyName: 'Supreme Pipes', gstin: '27AABCS1234K1Z5', taxableValue: 754237, cgst: 67881, sgst: 67881, igst: 0, total: 890000, type: 'purchase', itcAvailable: true },
  { id: '6', invoiceNo: 'INV/25-26/004', date: '2025-04-25', partyName: 'Polycab India', gstin: '27AABCP5678L1Z3', taxableValue: 1059322, cgst: 95339, sgst: 95339, igst: 0, total: 1250000, type: 'purchase', itcAvailable: true },
];

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatFullCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
