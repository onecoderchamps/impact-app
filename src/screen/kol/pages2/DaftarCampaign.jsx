import React, { useEffect, useState, useCallback } from 'react';
import { getData, putData, postData } from '../../../api/service'; // Pastikan putData dan postData diimpor

// --- Helper function: mapApplicantStatus ---
// Memetakan nilai status API (null, true, false) ke string yang mudah dibaca pengguna.
const mapApplicantStatus = (apiStatus) => {
  if (apiStatus === null) {
    return 'Pending';
  } else if (apiStatus === true) {
    return 'Approved';
  } else if (apiStatus === false) {
    return 'Rejected';
  }
  return 'Unknown'; // Fallback untuk nilai yang tidak terduga
};

// --- Helper function: formatDate ---
// Memformat string tanggal ke format Indonesia yang mudah dibaca.
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  try {
    return new Date(dateString).toLocaleDateString('id-ID', options);
  } catch (e) {
    console.error("Invalid date string:", dateString, e);
    return 'Invalid Date';
  }
};

// --- Helper function: formatCurrency ---
// Memformat angka ke mata uang Rupiah Indonesia.
const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Komponen ActivationModal ---
const ActivationModal = ({ campaign, onClose, onActivateCampaign }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleActivate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint API untuk memverifikasi/mengaktifkan campaign
      const response = await postData(`Campaign/payCampaign`, { idCampaign: campaign.id,hargaPekerjaan: campaign.hargaPekerjaan });

      if (response.code === 200) {
        alert('Campaign berhasil diaktifkan!');
        window.location.href = response.response.paymentUrl;
      } else {
        setError(response.Error || 'Gagal mengaktifkan campaign.');
      }
    } catch (err) {
      console.error('Error activating campaign:', err);
      setError('Terjadi kesalahan saat mengaktifkan campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-light leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Aktifkan Campaign</h2>

        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg mb-3">
            Anda akan mengaktifkan campaign:
          </p>
          <p className="text-2xl font-extrabold text-blue-700 mb-4">
            {campaign.namaProyek}
          </p>
          <p className="text-gray-800 text-xl font-semibold mb-4">
            Total Pembayaran yang Dibutuhkan:
          </p>
          <p className="text-4xl font-extrabold text-emerald-600 mb-6">
            {formatCurrency(campaign.hargaPekerjaan)}
          </p>
          <p className="text-gray-600 text-sm">
            Setelah diaktifkan, campaign ini akan terlihat oleh KOL dan dapat menerima lamaran/undangan.
          </p>
        </div>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-md text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={handleActivate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Aktifkan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Komponen CampaignDetailModal ---
const CampaignDetailModal = ({ campaign, initialApplicants, onClose, onApplicantStatusChange, onRefreshApplicants }) => {
  if (!campaign) return null;

  const [activeTab, setActiveTab] = useState('pending');
  const [modalApplicants, setModalApplicants] = useState(initialApplicants);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    setModalApplicants(initialApplicants);
    // Tentukan tab aktif awal berdasarkan keberadaan pelamar yang tertunda
    if (initialApplicants.some(app => mapApplicantStatus(app.status) === 'Pending')) {
      setActiveTab('pending');
    } else if (initialApplicants.some(app => mapApplicantStatus(app.status) === 'Approved')) {
      setActiveTab('approved');
    } else {
      setActiveTab('rejected');
    }
  }, [initialApplicants]);

  // Fungsi untuk menangani persetujuan atau penolakan pelamar
  // newStatusApiValue akan bernilai true untuk Approved, false untuk Rejected
  const handleStatusChange = async (applicantRegisterMemberId, newStatusApiValue) => {
    setLoadingAction(true);
    setActionError(null);
    try {
      const payload = {
        status: newStatusApiValue ? "Approved" : "Rejected", // Ini akan bernilai true atau false
        idCampaign: campaign.id, // Sertakan ID campaign untuk konteks
        idUser: modalApplicants.find(app => app.id === applicantRegisterMemberId)?.idUser // Dapatkan ID user dari daftar pelamar
      };

      const response = await putData("Campaign/MemberCampaign", payload);

      if (response.code === 200) {
        // Perbarui state lokal: temukan pelamar dan perbarui hanya `status`
        const updatedApplicants = modalApplicants.map(app =>
          app.id === applicantRegisterMemberId
            ? { ...app, status: newStatusApiValue } // Perbarui hanya status
            : app
        );
        setModalApplicants(updatedApplicants);

        // Beri tahu komponen induk tentang perubahan, berikan string status yang dipetakan
        if (onApplicantStatusChange) {
          onApplicantStatusChange(applicantRegisterMemberId, mapApplicantStatus(newStatusApiValue));
        }

        alert(`Pelamar berhasil ${newStatusApiValue ? 'disetujui' : 'ditolak'}.`);

        // Refresh daftar pelamar dari API setelah pembaruan berhasil
        if (onRefreshApplicants) {
          await onRefreshApplicants();
        }

      } else {
        setActionError(response.Error || 'Gagal memperbarui status pelamar.');
        alert(`Gagal memperbarui status pelamar: ${response.Error || 'Terjadi kesalahan.'}`);
      }

    } catch (error) {
      console.error('Error updating applicant status:', error);
      setActionError('Terjadi kesalahan saat berkomunikasi dengan server.');
      alert('Gagal memperbarui status pelamar. Silakan coba lagi.');
    } finally {
      setLoadingAction(false);
    }
  };

  // Filter pelamar berdasarkan status yang dipetakan
  const filteredApplicants = modalApplicants.filter(applicant => {
    return mapApplicantStatus(applicant.status) === activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col relative overflow-hidden transform scale-95 animate-scale-in">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-4xl font-light leading-none z-10 transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="p-10 flex-grow flex flex-col md:flex-row gap-10 overflow-hidden">
          {/* Panel Kiri: Detail Campaign */}
          <div className="md:w-1/2 flex flex-col pr-6 border-r border-gray-100 overflow-y-auto custom-scrollbar">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-blue-500 pb-4">
              {campaign.namaProyek}
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              {campaign.coverProyek && (
                <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-md mb-6">
                  <img
                    src={campaign.coverProyek}
                    alt={`Cover Proyek ${campaign.namaProyek}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x350?text=No+Image'; }}
                  />
                </div>
              )}

              <p className="text-xl font-bold text-blue-700 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base font-semibold">{campaign.jenisPekerjaan}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700 font-medium">{campaign.tipeKonten}</span>
              </p>

              <p className="text-4xl font-extrabold text-emerald-600 my-4">
                {formatCurrency(campaign.hargaPekerjaan)}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Periode:</span>{" "}
                <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-800">Tipe Promosi:</span>{" "}
                <span className="text-blue-600 font-medium">{campaign.tipeProyek}</span>
              </p>

              {campaign.referensiVisual && (
                <p>
                  <span className="font-semibold text-gray-800">Referensi Visual:</span>{" "}
                  <a href={campaign.referensiVisual} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline transition-colors duration-200">
                    Lihat Referensi <span className="inline-block ml-1 text-xs">&#x2197;</span>
                  </a>
                </p>
              )}

              <div>
                <p className="font-semibold text-gray-800 mb-2">Arahan Konten:</p>
                <p className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-base italic">{campaign.arahanKonten}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">Arahan Caption:</p>
                <p className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-base italic">{campaign.arahanCaption}</p>
              </div>

              {campaign.catatan && (
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Catatan Untuk Influencer:</p>
                  <p className="bg-orange-50 text-orange-800 p-4 rounded-lg border border-orange-200 text-base">{campaign.catatan}</p>
                </div>
              )}

              {campaign.website && (
                <p>
                  <span className="font-semibold text-gray-800">Website:</span>{" "}
                  <a href={campaign.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline transition-colors duration-200">
                    {campaign.website} <span className="inline-block ml-1 text-xs">&#x2197;</span>
                  </a>
                </p>
              )}
              {campaign.hashtag && <p><span className="font-semibold text-gray-800">Hashtag Wajib:</span> <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-sm">{campaign.hashtag}</span></p>}
              {campaign.mentionAccount && <p><span className="font-semibold text-gray-800">Akun Mention:</span> <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-sm">{campaign.mentionAccount}</span></p>}

              <div className="pt-4 mt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">Status Campaign:</p>
                {campaign.isVerification ? (
                  <span className="bg-green-100 text-green-700 text-lg px-4 py-2 rounded-full font-bold shadow-sm">
                    Terverifikasi
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 text-lg px-4 py-2 rounded-full font-bold shadow-sm">
                    Menunggu Verifikasi
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Panel Kanan: Daftar Pelamar */}
          <div className="md:w-1/2 flex flex-col pl-6 overflow-hidden">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-blue-500 pb-4">
              Daftar Pelamar
            </h2>

            {/* Tabs untuk Pending, Approved, dan Rejected */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${activeTab === 'pending'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
                  }`}
              >
                Need Approval ({modalApplicants.filter(a => mapApplicantStatus(a.status) === 'Pending').length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${activeTab === 'approved'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
                  }`}
              >
                Approved ({modalApplicants.filter(a => mapApplicantStatus(a.status) === 'Approved').length})
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${activeTab === 'rejected'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
                  }`}
              >
                Rejected ({modalApplicants.filter(a => mapApplicantStatus(a.status) === 'Rejected').length})
              </button>
            </div>

            {loadingAction ? (
              <p className="text-gray-600 text-center mt-8 text-lg bg-gray-50 p-6 rounded-lg">Memperbarui status pelamar...</p>
            ) : actionError ? (
              <p className="text-red-600 text-center mt-8 text-lg bg-red-50 p-6 rounded-lg">Error: {actionError}</p>
            ) : filteredApplicants.length === 0 ? (
              <p className="text-gray-600 text-center mt-8 text-lg bg-gray-50 p-6 rounded-lg">
                {activeTab === 'pending' && 'Tidak ada pelamar menunggu persetujuan.'}
                {activeTab === 'approved' && 'Tidak ada pelamar yang disetujui.'}
                {activeTab === 'rejected' && 'Tidak ada pelamar yang ditolak.'}
              </p>
            ) : (
              <div className="space-y-6 overflow-y-auto custom-scrollbar flex-grow">
                {filteredApplicants.map((applicant) => (
                  <div key={applicant.id} className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center">
                      <img
                        src={applicant.profilePic || `https://ui-avatars.com/api/?name=${applicant.name?.split(' ').join('+') || '?'}&background=random&color=fff&size=64`}
                        alt={applicant.name || 'Pelamar'}
                        className="w-16 h-16 rounded-full object-cover mr-5 border-2 border-blue-300 shadow-sm"
                      />
                      <div>
                        <p className="font-bold text-xl text-gray-900">{applicant.name || 'Nama Pelamar'}</p>
                        <p className="text-md text-gray-600 mt-1">{applicant.socialMedia || 'Social Media N/A'}</p>
                        <p className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full inline-block ${mapApplicantStatus(applicant.status) === 'Approved' ? 'bg-green-100 text-green-700' :
                          mapApplicantStatus(applicant.status) === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          Status: {mapApplicantStatus(applicant.status)}
                        </p>
                      </div>
                    </div>
                    {/* Tombol aksi hanya untuk tab 'Pending' */}
                    {activeTab === 'pending' && (
                      <div className="flex flex-col gap-3">
                        {applicant.inviteBy === "Brand" ? (
                          <div>
                            <p className="text-sm font-semibold mt-2 px-3 py-1 rounded-full inline-block bg-blue-100 text-blue-700">
                              Diundang oleh Brand
                            </p>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStatusChange(applicant.id, true)} // Kirim true untuk Approved
                              className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={loadingAction}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(applicant.id, false)} // Kirim false untuk Rejected
                              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={loadingAction}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Gaya Scrollbar Kustom dan Animasi (dapat ditambahkan ke file CSS utama atau tag <style> di index.html) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0; /* gray-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0; /* gray-400 */
        }

        /* Animasi fade-in dan scale-in */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// --- Komponen CampaignList ---
export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Diubah namanya untuk kejelasan
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false); // State baru untuk modal aktivasi
  const [applicantsForModal, setApplicantsForModal] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [applicantFetchError, setApplicantFetchError] = useState(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getData("Campaign");
      if (response.code === 200 && response.data) {
        setCampaigns(response.data);
      } else {
        setError(response.Error || 'Gagal mengambil campaign.');
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err.message || 'Terjadi kesalahan saat mengambil campaign.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const fetchApplicantsForCampaign = useCallback(async (campaignId) => {
    if (!campaignId) return;

    setLoadingApplicants(true);
    setApplicantFetchError(null);
    try {
      const response = await getData(`Campaign/registerMember/${campaignId}`);
      if (response.code === 200 && response.data) {
        const mappedApplicants = response.data.map(app => ({
          id: app.id,
          idUser: app.idUser,
          idCampaign: app.idCampaign,
          status: app.status,
          name: app.fullName,
          socialMedia: app.email,
          profilePic: app.image,
          inviteBy: app.inviteBy,
        }));
        setApplicantsForModal(mappedApplicants);
      } else {
        setApplicantFetchError(response.Error || 'Gagal mengambil pelamar.');
      }
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setApplicantFetchError(err.message || 'Terjadi kesalahan saat mengambil pelamar.');
    } finally {
      setLoadingApplicants(false);
    }
  }, []);

  // Handler untuk membuka Modal Detail Campaign
  const openCampaignDetails = async (campaign) => {
    setSelectedCampaign(campaign);
    await fetchApplicantsForCampaign(campaign.id);
    setIsDetailModalOpen(true);
  };

  // Handler untuk menutup Modal Detail Campaign
  const closeCampaignDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedCampaign(null);
    setApplicantsForModal([]);
    setApplicantFetchError(null);
  };

  // Handler untuk membuka Modal Aktivasi
  const openActivationModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsActivationModalOpen(true);
  };

  // Handler untuk menutup Modal Aktivasi
  const closeActivationModal = () => {
    setIsActivationModalOpen(false);
    setSelectedCampaign(null); // Bersihkan campaign yang dipilih saat menutup
  };

  // Handler saat campaign berhasil diaktifkan
  const handleCampaignActivation = (activatedCampaignId) => {
    // Perbarui status verifikasi campaign secara optimis di daftar
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(camp =>
        camp.id === activatedCampaignId ? { ...camp, isVerification: true } : camp
      )
    );
    // Opsional, ambil ulang semua campaign untuk memastikan konsistensi data
    // fetchCampaigns();
  };

  // Ini sekarang berlebihan karena modal akan memicu refresh penuh.
  // Tetap dipertahankan untuk saat ini, tetapi dapat dihapus jika hanya refresh penuh yang diinginkan.
  const handleApplicantStatusChange = useCallback((applicantId, newStatusApiValue) => {
    // Logika handler ini harus mencerminkan bagaimana Anda ingin memperbarui state lokal.
    // Mengingat `onRefreshApplicants` sekarang digunakan, pembaruan lokal ini mungkin menjadi kurang penting
    // jika Anda selalu mengandalkan pengambilan ulang penuh setelah perubahan status.
    setApplicantsForModal(prevApplicants =>
      prevApplicants.map(app =>
        app.id === applicantId
          ? { ...app, status: newStatusApiValue }
          : app
      )
    );
  }, []);

  // Fungsi untuk memicu muat ulang daftar pelamar dari API untuk modal detail
  const refreshModalApplicants = useCallback(async () => {
    if (selectedCampaign?.id) {
      await fetchApplicantsForCampaign(selectedCampaign.id);
    }
  }, [selectedCampaign, fetchApplicantsForCampaign]);

  if (loading) {
    return (
      <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Memuat daftar campaign...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="ml-64 mt-20 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-full mx-auto">
        {campaigns.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Belum ada campaign tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-200"
                // Tidak ada onClick di seluruh kartu untuk memungkinkan klik tombol
              >
                {campaign.coverProyek && (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={campaign.coverProyek}
                      alt={`Cover Proyek ${campaign.namaProyek}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x350?text=No+Image'; }}
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.namaProyek}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">{campaign.jenisPekerjaan}</span> • {campaign.tipeKonten}
                    </p>
                    <p className="text-2xl font-extrabold text-blue-600 mb-4">
                      {formatCurrency(campaign.hargaPekerjaan)}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-medium">Periode:</span> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      <span className="font-medium">Arahan Konten:</span> {campaign.arahanKonten}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>Dipromosikan: <span className="font-medium text-gray-700">{campaign.tipeProyek}</span></span>
                      {campaign.isVerification ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Terverifikasi</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Menunggu Verifikasi</span>
                      )}
                    </div>
                    {/* Tombol Aktivasi */}
                    {!campaign.isVerification ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); openActivationModal(campaign); }}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md text-sm"
                      >
                        Aktifkan Campaign
                      </button>
                    ) : ( // Tampilkan "Lihat Detail" jika sudah terverifikasi
                         <button
                         onClick={(e) => { e.stopPropagation(); openCampaignDetails(campaign); }}
                         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm"
                       >
                         Lihat Detail
                       </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isDetailModalOpen && selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          initialApplicants={applicantsForModal}
          onClose={closeCampaignDetails}
          onApplicantStatusChange={handleApplicantStatusChange}
          onRefreshApplicants={refreshModalApplicants}
        />
      )}
      {/* State loading untuk mengambil pelamar di modal */}
      {isDetailModalOpen && loadingApplicants && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex items-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-gray-700">Memuat data pelamar...</p>
          </div>
        </div>
      )}
      {/* State error untuk mengambil pelamar di modal */}
      {isDetailModalOpen && !loadingApplicants && applicantFetchError && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-red-50 p-8 rounded-lg shadow-xl text-red-700 border border-red-200">
            <p className="text-lg font-semibold mb-2">Gagal memuat pelamar!</p>
            <p>{applicantFetchError}</p>
            <button onClick={closeCampaignDetails} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Tutup</button>
          </div>
        </div>
      )}

      {/* Modal Aktivasi */}
      {isActivationModalOpen && selectedCampaign && (
        <ActivationModal
          campaign={selectedCampaign}
          onClose={closeActivationModal}
          onActivateCampaign={handleCampaignActivation}
        />
      )}
    </main>
  );
}