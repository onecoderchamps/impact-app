import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy Data untuk Dashboard
// Anda akan mengganti ini dengan data aktual dari API Anda
const dummyData = {
  totalProjects: 25,
  activeProjects: 18,
  completedProjects: 5,
  draftProjects: 2,
  
  newInfluencerRegistrations: 150, // Bulan ini
  totalPlatformInfluencers: 4200,

  pendingPaymentsAmount: 15750000, // Rupiah
  pendingInvoicesCount: 5,
  dueTodayInvoicesCount: 3,

  walletBalance: 20000000, // Rupiah
  lastTopUpAmount: 10000000,
  lastTopUpDate: '10 Juni 2025',

  campaignStatusData: [
    { name: 'Aktif', value: 18, color: '#3B82F6' },
    { name: 'Selesai', value: 5, color: '#10B981' },
    { name: 'Draft', value: 2, color: '#F59E0B' },
    { name: 'Menunggu Persetujuan', value: 3, color: '#6366F1' },
  ],

  monthlySpendingData: [
    { name: 'Jan', spending: 12000000 },
    { name: 'Feb', spending: 15000000 },
    { name: 'Mar', spending: 10000000 },
    { name: 'Apr', spending: 18000000 },
    { name: 'Mei', spending: 22000000 },
    { name: 'Jun', spending: 15000000 },
  ],

  latestCampaigns: [
    { id: 1, name: 'Promo Ramadhan 2025', date: '01 Juni 2025', status: 'Aktif', budget: 'Rp 25.000.000', kolCount: 15 },
    { id: 2, name: 'Peluncuran Produk X', date: '20 Mei 2025', status: 'Selesai', budget: 'Rp 50.000.000', kolCount: 20 },
    { id: 3, name: 'Diskon Akhir Tahun', date: '15 Juni 2025', status: 'Draft', budget: 'Rp 30.000.000', kolCount: 0 },
  ],

  pendingInvoices: [
    { id: 101, number: 'INV-2025-001', dueDate: '20 Juni 2025', amount: 5000000, status: 'Jatuh Tempo' },
    { id: 102, number: 'INV-2025-002', dueDate: '25 Juni 2025', amount: 7500000, status: 'Tertunda' },
    { id: 103, number: 'INV-2025-003', dueDate: '30 Juni 2025', amount: 3250000, status: 'Tertunda' },
  ],

  influencerRecommendations: [
    { id: 201, name: 'Jessica Tan', niche: 'Fashion', followers: '500K', img: 'https://via.placeholder.com/50/FFD700/000000?text=JT' },
    { id: 202, name: 'David Lee', niche: 'Food Vlogger', followers: '750K', img: 'https://via.placeholder.com/50/FF6347/FFFFFF?text=DL' },
    { id: 203, name: 'Siti Aminah', niche: 'Beauty', followers: '300K', img: 'https://via.placeholder.com/50/8A2BE2/FFFFFF?text=SA' },
  ]
};

const DashboardBrand = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('role');

      if (!accessToken || userRole !== 'Brand') {
        navigate('/login'); // Redirect jika tidak login atau bukan Brand
        return;
      }

      // TODO: Ganti dengan panggilan API Anda yang sebenarnya
      // Contoh: const response = await getData('dashboard/brand');
      // setDashboardData(response.data);
      
      // Untuk demonstrasi, gunakan dummyData
      setTimeout(() => { // Simulasi loading API
        setDashboardData(dummyData);
        setLoading(false);
      }, 1000);

      // Pastikan Anda menangani error dari API
      // try {
      //   const response = await getData('dashboard/brand');
      //   if (response.success) { // Asumsi API mengembalikan { success: true, data: ... }
      //     setDashboardData(response.data);
      //   } else {
      //     setError(response.message || 'Gagal mengambil data dashboard.');
      //   }
      // } catch (err) {
      //   console.error("Error fetching dashboard data:", err);
      //   setError('Terjadi kesalahan saat mengambil data dashboard.');
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-blue-600 text-lg font-semibold flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Memuat Dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-600 text-lg">
        {error}
      </div>
    );
  }

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const radius = outerRadius + 15; // Jarak label dari pie
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill={dashboardData.campaignStatusData[index].color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-semibold text-sm">
        {`${dashboardData.campaignStatusData[index].name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="ml-64 mt-20 p-8 bg-gray-100 min-h-screen">

      {/* 1. Ringkasan Performa Utama (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Proyek */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105 duration-300">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Total Proyek</div>
            <div className="text-4xl font-extrabold text-blue-600">{dashboardData.totalProjects}</div>
            <div className="text-xs text-gray-500 mt-2">
              <span className="text-blue-500">{dashboardData.activeProjects} Aktif</span> •{' '}
              <span className="text-green-500">{dashboardData.completedProjects} Selesai</span> •{' '}
              <span className="text-yellow-500">{dashboardData.draftProjects} Draft</span>
            </div>
          </div>
        </div>

        {/* Total Influencer Terdaftar */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105 duration-300">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Pendaftar Influencer Baru (Bulan Ini)</div>
            <div className="text-4xl font-extrabold text-purple-600">{dashboardData.newInfluencerRegistrations}</div>
            <div className="text-xs text-gray-500 mt-2">
              Total Influencer di Platform: <span className="font-semibold">{dashboardData.totalPlatformInfluencers.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Total Butuh Pembayaran */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105 duration-300">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Butuh Pembayaran</div>
            <div className="text-4xl font-extrabold text-red-600">{formatRupiah(dashboardData.pendingPaymentsAmount)}</div>
            <div className="text-xs text-gray-500 mt-2">
              <span className="text-red-500">{dashboardData.pendingInvoicesCount} Invoice Tertunda</span> •{' '}
              <span className="text-red-700">{dashboardData.dueTodayInvoicesCount} Jatuh Tempo Hari Ini</span>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">Bayar Sekarang</button>
        </div>

        {/* Sisa Saldo Dompet Digital */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105 duration-300">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Saldo Dompet Digital</div>
            <div className="text-4xl font-extrabold text-green-600">{formatRupiah(dashboardData.walletBalance)}</div>
            <div className="text-xs text-gray-500 mt-2">
              Top Up Terakhir: {formatRupiah(dashboardData.lastTopUpAmount)} ({dashboardData.lastTopUpDate})
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition">Top Up Saldo</button>
        </div>
      </div>

      {/* 2. Status Kampanye & Pengeluaran Bulanan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Grafik Status Proyek */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Kampanye</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.campaignStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {dashboardData.campaignStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} proyek`, name]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Pengeluaran Bulanan */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pengeluaran Bulanan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.monthlySpendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => formatRupiah(value)} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => formatRupiah(value)} />
              <Legend />
              <Bar dataKey="spending" name="Pengeluaran" fill="#8884d8" barSize={30} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Proyek Terbaru & Tagihan Mendatang */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daftar Proyek Terbaru */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Proyek Terbaru</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Proyek</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anggaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KOL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.latestCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'Aktif' ? 'bg-blue-100 text-blue-800' :
                        campaign.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.budget}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.kolCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 transition">Lihat Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daftar Tagihan Mendatang/Tertunda */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tagihan Mendatang & Tertunda</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jatuh Tempo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.pendingInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatRupiah(invoice.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'Jatuh Tempo' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 transition mr-2">Bayar</button>
                      <button className="text-gray-600 hover:text-gray-900 transition">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Notifikasi Penting (Opsional, bisa diintegrasikan ke Header juga) */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg shadow-md" role="alert">
        <p className="font-bold">Perhatian Penting:</p>
        <ul className="list-disc list-inside text-sm mt-1">
          <li>Invoice #INV-2025-001 senilai {formatRupiah(5000000)} jatuh tempo hari ini.</li>
          <li>Kampanye "Promo Lebaran" membutuhkan persetujuan konten dari 3 KOL.</li>
          <li>Saldo Dompet Digital Anda {formatRupiah(dashboardData.walletBalance)} - pertimbangkan untuk top up.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardBrand;