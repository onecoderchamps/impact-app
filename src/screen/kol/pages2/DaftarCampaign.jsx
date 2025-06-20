import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../../api/service'; // Assuming getData is for fetching, postData for actions

// --- New Component: CampaignDetailModal ---
const CampaignDetailModal = ({ campaign, applicants: initialApplicants, onClose, onApplicantStatusChange }) => {
  if (!campaign) return null;

  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'approved', or 'rejected'
  const [modalApplicants, setModalApplicants] = useState(initialApplicants); // State to manage applicants within the modal

  useEffect(() => {
    setModalApplicants(initialApplicants);
    // Set default tab to 'pending' if there are pending applicants, otherwise 'approved'
    if (initialApplicants.some(app => app.status === 'Pending')) {
      setActiveTab('pending');
    } else if (initialApplicants.some(app => app.status === 'Approved')) {
      setActiveTab('approved');
    } else {
      setActiveTab('rejected'); // Fallback if no pending or approved
    }
  }, [initialApplicants]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = async (applicantId) => {
    try {
      // Replace with your actual API call to approve the applicant
      // Example: await postData(`/applicants/${applicantId}/approve`, { campaignId: campaign.id });
      console.log(`Approving applicant ${applicantId} for campaign ${campaign.id}`);
      alert(`Pelamar ${applicantId} disetujui untuk campaign ${campaign.namaProyek}`);
      // Update local state and propagate to parent
      setModalApplicants(prevApplicants =>
        prevApplicants.map(app =>
          app.id === applicantId ? { ...app, status: 'Approved' } : app
        )
      );
      if (onApplicantStatusChange) {
        onApplicantStatusChange(applicantId, 'Approved');
      }
    } catch (error) {
      console.error('Error approving applicant:', error);
      alert('Gagal menyetujui pelamar.');
    }
  };

  const handleReject = async (applicantId) => {
    try {
      // Replace with your actual API call to reject the applicant
      // Example: await postData(`/applicants/${applicantId}/reject`, { campaignId: campaign.id });
      console.log(`Rejecting applicant ${applicantId} for campaign ${campaign.id}`);
      alert(`Pelamar ${applicantId} ditolak untuk campaign ${campaign.namaProyek}`);
      // Update local state and propagate to parent
      setModalApplicants(prevApplicants =>
        prevApplicants.map(app =>
          app.id === applicantId ? { ...app, status: 'Rejected' } : app
        )
      );
      if (onApplicantStatusChange) {
        onApplicantStatusChange(applicantId, 'Rejected');
      }
    } catch (error) {
      console.error('Error rejecting applicant:', error);
      alert('Gagal menolak pelamar.');
    }
  };

  const filteredApplicants = modalApplicants.filter(applicant => {
    if (activeTab === 'pending') {
      return applicant.status === 'Pending';
    } else if (activeTab === 'approved') {
      return applicant.status === 'Approved';
    } else if (activeTab === 'rejected') {
      return applicant.status === 'Rejected';
    }
    return true; // Fallback, though tabs should cover all states
  });


  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col relative overflow-hidden transform scale-95 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-4xl font-light leading-none z-10 transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="p-10 flex-grow flex flex-col md:flex-row gap-10 overflow-hidden">
          {/* Left Panel: Campaign Details */}
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

          {/* Right Panel: Applicant List */}
          <div className="md:w-1/2 flex flex-col pl-6 overflow-hidden">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-blue-500 pb-4">
              Daftar Pelamar
            </h2>

            {/* Tabs for Pending, Approved, and Rejected */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                  activeTab === 'pending'
                    ? 'border-b-4 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
                }`}
              >
                Need Approval ({modalApplicants.filter(a => a.status === 'Pending').length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                  activeTab === 'approved'
                    ? 'border-b-4 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
                }`}
              >
                Approved ({modalApplicants.filter(a => a.status === 'Approved').length})
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                  activeTab === 'rejected'
                    ? 'border-b-4 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
                }`}
              >
                Rejected ({modalApplicants.filter(a => a.status === 'Rejected').length})
              </button>
            </div>

            {filteredApplicants.length === 0 ? (
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
                        src={applicant.profilePic || `https://ui-avatars.com/api/?name=${applicant.name.split(' ').join('+')}&background=random&color=fff&size=64`}
                        alt={applicant.name}
                        className="w-16 h-16 rounded-full object-cover mr-5 border-2 border-blue-300 shadow-sm"
                      />
                      <div>
                        <p className="font-bold text-xl text-gray-900">{applicant.name}</p>
                        <p className="text-md text-gray-600 mt-1">{applicant.socialMedia}</p>
                        <p className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full inline-block ${
                          applicant.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          applicant.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          Status: {applicant.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleApprove(applicant.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={applicant.status === 'Approved' || applicant.status === 'Rejected'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(applicant.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={applicant.status === 'Approved' || applicant.status === 'Rejected'}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Custom Scrollbar Styles (can be added to your main CSS file or a <style> tag in index.html) */}
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

        /* Fade-in and Scale-in animations */
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
// --- End New Component: CampaignDetailModal ---


export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicants, setApplicants] = useState([]); // State for applicants specific to the selected campaign

  // Mock applicant data (replace with actual API fetch)
  const mockApplicants = [
    { id: 'app1', name: 'Budi Santoso', socialMedia: '@budisantoso_official', profilePic: 'https://i.pravatar.cc/150?img=1', status: 'Pending' },
    { id: 'app2', name: 'Citra Dewi', socialMedia: '@citradewi_vlog', profilePic: 'https://i.pravatar.cc/150?img=2', status: 'Pending' },
    { id: 'app3', name: 'Dion Permana', socialMedia: '@dion_creator', profilePic: 'https://i.pravatar.cc/150?img=3', status: 'Approved' },
    { id: 'app4', name: 'Endahwati', socialMedia: '@endahwati_beauty', profilePic: 'https://i.pravatar.cc/150?img=4', status: 'Pending' },
    { id: 'app5', name: 'Fajar Kurniawan', socialMedia: '@fajar_kreatif', profilePic: 'https://i.pravatar.cc/150?img=5', status: 'Rejected' },
    { id: 'app6', name: 'Gita Lestari', socialMedia: '@gita_glam', profilePic: 'https://i.pravatar.cc/150?img=6', status: 'Approved' },
  ];

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        // Assuming 'getData' is defined in 'service.js' for GET requests
        const response = await getData("Campaign"); // Replace with your actual endpoint
        if (response.code === 200 && response.data) {
          setCampaigns(response.data);
        } else {
          setError(response.Error || 'Failed to fetch campaigns.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching campaigns.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const openCampaignDetails = (campaign) => {
    setSelectedCampaign(campaign);
    // In a real app, you'd fetch applicants for this specific campaign ID
    // For now, we'll use mock data
    setApplicants(mockApplicants); // Replace with: await getData(`Campaign/${campaign.id}/applicants`);
    setIsModalOpen(true);
  };

  const closeCampaignDetails = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
    setApplicants([]);
  };

  const handleApplicantStatusChange = (applicantId, newStatus) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(app =>
        app.id === applicantId ? { ...app, status: newStatus } : app
      )
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
    <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-full mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Daftar Campaign</h2> {/* Added heading */}
        {campaigns.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Belum ada campaign tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={() => openCampaignDetails(campaign)}
              >
                {campaign.coverProyek && (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={campaign.coverProyek}
                      alt={`Cover Proyek ${campaign.namaProyek}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
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
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Dipromosikan: <span className="font-medium text-gray-700">{campaign.tipeProyek}</span></span>
                      {campaign.isVerification ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Terverifikasi</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Menunggu Verifikasi</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          applicants={applicants}
          onClose={closeCampaignDetails}
          onApplicantStatusChange={handleApplicantStatusChange}
        />
      )}
    </main>
  );
}