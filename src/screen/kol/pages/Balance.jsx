import React from 'react';
import { ArrowUpToLine, Download } from 'lucide-react'; // Bisa ganti dengan ikon lain jika pakai library berbeda

const BalancePage = () => {
  const transactions = []; // Kosongkan data dulu

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">Digital Wallet &gt; Balance</div>

      {/* Header */}
      <h1 className="text-2xl font-semibold">Hi, Hilyathul Wahid !</h1>

      {/* Balance + Penarikan + Download */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-6">
        {/* Balance Info */}
        <div className="bg-white shadow rounded-lg p-4 w-full md:w-1/2 flex items-center gap-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-sm text-gray-600">Current Balance Amount (IDR)</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-xs text-gray-400">Total amount of general and campaign balance</p>
          </div>
        </div>

        {/* Penarikan & Download */}
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-end">
          <div className="bg-gray-50 border border-dashed border-gray-200 p-4 rounded-lg flex items-center justify-center w-full md:w-48 h-20 text-center text-gray-400">
            <div className="flex flex-col items-center text-xs">
              <ArrowUpToLine className="w-5 h-5 mb-1" />
              Penarikan
            </div>
          </div>
          <button className="text-indigo-600 text-sm hover:underline flex items-center gap-1">
            <Download className="w-4 h-4" />
            Download .csv
          </button>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">ID Transaksi</th>
                <th className="py-3 px-4">Authorize by</th>
                <th className="py-3 px-4">Deskripsi</th>
                <th className="py-3 px-4">Jumlah</th>
                <th className="py-3 px-4">Balance (IDR)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Tidak Ada Catatan
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{tx.date}</td>
                    <td className="px-4 py-2">{tx.id}</td>
                    <td className="px-4 py-2">{tx.authorizedBy}</td>
                    <td className="px-4 py-2">{tx.description}</td>
                    <td className="px-4 py-2">{tx.amount}</td>
                    <td className="px-4 py-2">{tx.balance}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

export default BalancePage;
