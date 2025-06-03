import React from 'react';

const ContractPage = () => {
  const contracts = []; // Contoh: data kosong

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">Campaigns &gt; Contract</div>

      {/* Greeting */}
      <h1 className="text-2xl font-semibold">Hi Hilyathul Wahid !</h1>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Waiting for you" count={0} color="border-l-4 border-blue-600" />
        <SummaryCard label="Waiting for other" count={0} color="border-l-4 border-yellow-500" />
        <SummaryCard label="Completed" count={0} color="border-l-4 border-green-600" />
      </div>

      {/* Contract Table */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:justify-end gap-2">
          <input
            type="text"
            placeholder="Search Campaign"
            className="border rounded px-3 py-2 w-full md:w-64"
          />
          <input
            type="text"
            placeholder="Search Brand"
            className="border rounded px-3 py-2 w-full md:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-3 px-4 font-semibold text-sm">Campaign Name</th>
                <th className="py-3 px-4 font-semibold text-sm">Brand Name</th>
                <th className="py-3 px-4 font-semibold text-sm">Signer 1 (Agency)</th>
                <th className="py-3 px-4 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Tidak Ada Catatan
                  </td>
                </tr>
              ) : (
                contracts.map((c, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{c.campaign}</td>
                    <td className="px-4 py-2">{c.brand}</td>
                    <td className="px-4 py-2">{c.signer}</td>
                    <td className="px-4 py-2">{c.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div>Tunjukkan 1 To 10 Of Entries</div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 rounded border text-gray-500">«</button>
            <button className="px-2 py-1 rounded border text-gray-500">‹</button>
            <button className="px-2 py-1 rounded border text-gray-500">›</button>
            <button className="px-2 py-1 rounded border text-gray-500">»</button>
            <select className="ml-2 border rounded p-1 text-gray-700">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, count, color }) => (
  <div className={`bg-gray-50 p-4 rounded shadow-sm flex items-center ${color}`}>
    <div className="ml-2">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="text-xl font-bold">{count}</div>
    </div>
  </div>
);

export default ContractPage;
