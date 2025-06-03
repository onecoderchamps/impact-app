import React from 'react';
import { Plus } from 'lucide-react'; // Gunakan lucide-react atau icon lain sesuai kebutuhan

const InvoicePage = () => {
  const invoices = []; // Data kosong sebagai placeholder

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">Digital Wallet &gt; Invoice</div>

      {/* Header */}
      <h1 className="text-2xl font-semibold">Hilyathul Wahid !</h1>

      {/* Subheading */}
      <div>
        <h2 className="text-lg font-semibold mt-4">Invoicing</h2>
        <p className="text-sm text-gray-500">Create and manage professional invoices for your services.</p>
      </div>

      {/* Create Invoice Button + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Customer"
            className="w-full border rounded px-4 py-2"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        <button className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-md text-indigo-600 border border-indigo-100 hover:shadow-lg">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-indigo-50">
            <tr>
              <th className="py-3 px-4">No Invoice</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Nama Campaign</th>
              <th className="py-3 px-4">Jumlah</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Tidak Ada Catatan
                </td>
              </tr>
            ) : (
              invoices.map((invoice, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{invoice.no}</td>
                  <td className="px-4 py-2">{invoice.customer}</td>
                  <td className="px-4 py-2">{invoice.campaign}</td>
                  <td className="px-4 py-2">{invoice.amount}</td>
                  <td className="px-4 py-2">{invoice.dueDate}</td>
                  <td className="px-4 py-2">{invoice.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Tunjukkan 1 To 10 Of Entries</span>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-black">&laquo;</button>
          <button className="text-gray-400 hover:text-black">&lsaquo;</button>
          <button className="text-gray-400 hover:text-black">&rsaquo;</button>
          <button className="text-gray-400 hover:text-black">&raquo;</button>
          <select className="border rounded px-2 py-1 ml-4">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
