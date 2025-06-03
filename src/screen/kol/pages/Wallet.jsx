export default function Wallet() {
  return (
    <main className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <p className="font-medium text-gray-700 mb-2">Slice Digital Wallet</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="font-bold">0</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <p className="font-bold">0</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700 font-medium mb-2">Contracts & Signatures</p>
          <p className="text-lg font-bold">0</p>
          <a href="#" className="text-sm text-blue-600">Sign Now</a>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700 font-medium mb-2">Campaigns</p>
          <p className="text-sm">0 out of 0 content</p>
          <a href="#" className="text-sm text-blue-600">View Campaigns</a>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700 font-medium mb-2">Invoices</p>
          <p className="text-sm">Overdue: 0 | Sent: 0 | Paid: 0</p>
          <a href="#" className="text-sm text-blue-600">Track Now</a>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">Academy</p>
            <p className="text-sm text-gray-500">Slice Webinar - Septian (@ruangsepri)</p>
            <a href="#" className="text-sm text-blue-600">See Now</a>
          </div>
          <img src="https://via.placeholder.com/100x60" alt="Webinar" className="rounded" />
        </div>
      </section>
    </main>
  );
}
