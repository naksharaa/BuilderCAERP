import { customers } from '../data';
import { formatFullCurrency } from '../data';
import { Users, Building2, Home, Calendar, Mail, Phone } from 'lucide-react';

export default function Customers() {
  const totalAgreement = customers.reduce((s, c) => s + c.agreementValue, 0);
  const totalReceived = customers.reduce((s, c) => s + c.totalReceived, 0);
  const totalBalance = totalAgreement - totalReceived;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers & Flat Sales</h1>
          <p className="text-sm text-gray-500">Flat bookings, installment schedules, receipts, refunds and outstanding</p>
        </div>
        <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">+ New Booking</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Agreement Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatFullCurrency(totalAgreement)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Received</p>
          <p className="text-2xl font-bold text-emerald-600">{formatFullCurrency(totalReceived)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Balance Receivable</p>
          <p className="text-2xl font-bold text-red-600">{formatFullCurrency(totalBalance)}</p>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(customer => {
          const balance = customer.agreementValue - customer.totalReceived;
          const percentPaid = (customer.totalReceived / customer.agreementValue) * 100;
          return (
            <div key={customer.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{customer.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={9} />{customer.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Project</p>
                  <p className="text-xs font-medium text-gray-900 flex items-center gap-1"><Building2 size={10} />{customer.project}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Flat</p>
                  <p className="text-xs font-medium text-gray-900 flex items-center gap-1"><Home size={10} />{customer.flatNo}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Agreement Value</span>
                  <span className="font-semibold text-gray-900">{formatFullCurrency(customer.agreementValue)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Total Received</span>
                  <span className="font-semibold text-emerald-600">{formatFullCurrency(customer.totalReceived)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Balance</span>
                  <span className="font-semibold text-red-600">{formatFullCurrency(balance)}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>Collection Progress</span>
                  <span>{percentPaid.toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percentPaid}%` }} />
                </div>
              </div>

              {customer.nextInstallment && (
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 flex items-center gap-1"><Calendar size={10} />Next Due</span>
                  <span className="text-xs font-medium text-amber-600">{customer.nextInstallment}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Collection Forecast */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Collection Forecast (Next 3 Months)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-xs text-emerald-600 font-medium">May 2025</p>
            <p className="text-xl font-bold text-emerald-700">₹1.25 Cr</p>
            <p className="text-[10px] text-emerald-600">3 installments due</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-medium">June 2025</p>
            <p className="text-xl font-bold text-blue-700">₹1.85 Cr</p>
            <p className="text-[10px] text-blue-600">4 installments due</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-600 font-medium">July 2025</p>
            <p className="text-xl font-bold text-purple-700">₹95 L</p>
            <p className="text-[10px] text-purple-600">2 installments due</p>
          </div>
        </div>
      </div>
    </div>
  );
}
