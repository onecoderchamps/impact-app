import React from 'react';

const CampaignDashboard = () => {
  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">Campaigns</div>
      <h3 className="text-xl font-bold mb-4">Hi Hilyathul Wahid</h3>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Campaigns</h4>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search Campaigns"
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search Brand"
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 py-2 font-semibold">Nama Campaign</th>
                <th className="px-4 py-2 font-semibold">Nama Brand</th>
                <th className="px-4 py-2 font-semibold">Campaign Aktif</th>
                <th className="px-4 py-2 font-semibold">Remaining Content Submission</th>
                <th className="px-4 py-2 font-semibold">Net Amount</th>
                <th className="px-4 py-2 font-semibold">Paid (IDR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  Tidak Ada Catatan
                </td>
              </tr>
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

export default CampaignDashboard;
