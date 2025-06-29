import React, { useEffect, useState, useCallback } from 'react';
import { getData, putData } from '../../../api/service'; // Make sure putData is imported

// --- Helper function: mapApplicantStatus ---
// Maps API status values (null, true, false) to user-friendly strings.
const mapApplicantStatus = (apiStatus) => {
  if (apiStatus === null) {
    return 'Pending';
  } else if (apiStatus === true) {
    return 'Approved';
  } else if (apiStatus === false) {
    return 'Rejected';
  }
  return 'Unknown'; // Fallback for unexpected values
};

// --- Helper function: formatDate ---
// Formats date strings into a readable Indonesian format.
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
// Formats numbers into Indonesian Rupiah currency.
const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- CampaignDetailModal Component ---
// Added onRefreshApplicants prop
const CampaignDetailModal = ({ campaign, initialApplicants, onClose, onApplicantStatusChange, onRefreshApplicants }) => {
  if (!campaign) return null;

  const [activeTab, setActiveTab] = useState('pending');
  const [modalApplicants, setModalApplicants] = useState(initialApplicants);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    setModalApplicants(initialApplicants);
    // Determine initial active tab based on the presence of pending applicants
    if (initialApplicants.some(app => mapApplicantStatus(app.status) === 'Pending')) {
      setActiveTab('pending');
    } else if (initialApplicants.some(app => mapApplicantStatus(app.status) === 'Approved')) {
      setActiveTab('approved');
    } else {
      setActiveTab('rejected');
    }
  }, [initialApplicants]);

  // Function to handle approving or rejecting an applicant
  // newStatusApiValue will be true for Approved, false for Rejected
  const handleStatusChange = async (applicantRegisterMemberId, newStatusApiValue) => {
    setLoadingAction(true);
    setActionError(null);
    try {
      const payload = {
        status: newStatusApiValue, // This will be true or false
        idCampaign: campaign.id, // Include campaign ID for context
        idUser: modalApplicants.find(app => app.id === applicantRegisterMemberId)?.idUser // Get the user ID from the applicants list
      };

      const response = await putData("Campaign/MemberCampaign", payload);

      if (response.code === 200) {
        // Update local state: find the applicant and only update `status`
        const updatedApplicants = modalApplicants.map(app =>
          app.id === applicantRegisterMemberId
            ? { ...app, status: newStatusApiValue } // Update only status
            : app
        );
        setModalApplicants(updatedApplicants);

        // Notify the parent component about the change, passing the mapped status string
        if (onApplicantStatusChange) {
          onApplicantStatusChange(applicantRegisterMemberId, mapApplicantStatus(newStatusApiValue));
        }

        alert(`Pelamar berhasil ${newStatusApiValue ? 'disetujui' : 'ditolak'}.`);

        // --- NEW: Refresh applicants list from API after successful update ---
        if (onRefreshApplicants) {
          await onRefreshApplicants();
        }
        // --- END NEW ---

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

  // Filter applicants based on the mapped status
  const filteredApplicants = modalApplicants.filter(applicant => {
    return mapApplicantStatus(applicant.status) === activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
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
                {/* campaign.status is used here, ensure it's mapped correctly for display */}
                {campaign.status ? (
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
                    {applicant.inviteBy == "Brand" && (
                      <div>
                        <p className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full inline-block ${mapApplicantStatus(applicant.status) === 'Approved' ? 'bg-green-100 text-green-700' :
                          mapApplicantStatus(applicant.status) === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          Invited by Brand
                        </p>
                      </div>
                    )}
                    {/* Action buttons only for 'Pending' tab */}
                    {activeTab === 'pending' && applicant.inviteBy != "Brand" && (
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => handleStatusChange(applicant.id, 'Approved')} // Send true for Approved
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loadingAction}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(applicant.id, 'Rejected')} // Send false for Rejected
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loadingAction}
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

// --- CampaignList Component ---
export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        setError(response.Error || 'Failed to fetch campaigns.');
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err.message || 'An error occurred while fetching campaigns.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // This function is now responsible for fetching applicants for the currently selected campaign
  const fetchApplicantsForCampaign = useCallback(async (campaignId) => {
    if (!campaignId) return; // Ensure a campaignId is provided

    setLoadingApplicants(true);
    setApplicantFetchError(null);
    try {
      const response = await getData(`Campaign/registerMember/${campaignId}`);
      if (response.code === 200 && response.data) {
        // Map the raw API data to the structure expected by the modal
        const mappedApplicants = response.data.map(app => ({
          id: app.id, // This is the `registerMember` ID (for update operations)
          idUser: app.idUser,
          idCampaign: app.idCampaign,
          status: app.status, // Use the 'status' field directly from the API for the boolean/null value
          name: app.fullName, // Use actual fullName
          socialMedia: app.email, // Use actual email or relevant social media field
          profilePic: app.image, // Use actual image
          inviteBy: app.inviteBy, // Include inviteBy field
        }));
        setApplicantsForModal(mappedApplicants);
      } else {
        setApplicantFetchError(response.Error || 'Failed to fetch applicants.');
      }
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setApplicantFetchError(err.message || 'An error occurred while fetching applicants.');
    } finally {
      setLoadingApplicants(false);
    }
  }, []);

  const openCampaignDetails = async (campaign) => {
    setSelectedCampaign(campaign);
    // Fetch applicants using the campaign.id
    await fetchApplicantsForCampaign(campaign.id);
    setIsModalOpen(true);
  };

  const closeCampaignDetails = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
    setApplicantsForModal([]); // Clear applicants when closing
    setApplicantFetchError(null);
  };

  // This is now redundant since modal will trigger a full refresh.
  // Keeping it for now but might be removed if only full refresh is desired.
  const handleApplicantStatusChange = useCallback((applicantId, newStatus) => {
    setApplicantsForModal(prevApplicants =>
      prevApplicants.map(app =>
        app.id === applicantId
          ? {
            ...app,
            status: // This conversion from string to boolean/null should be done in the modal
              // if the modal is passing the string 'Approved'/'Rejected'/'Pending'
              // However, the modal now passes the boolean 'true'/'false'
              newStatus === true ? true :
                newStatus === false ? false :
                  null // For 'Pending'
          }
          : app
      )
    );
  }, []);

  // --- NEW: Function to trigger applicant list reload from API ---
  const refreshModalApplicants = useCallback(async () => {
    if (selectedCampaign?.id) {
      await fetchApplicantsForCampaign(selectedCampaign.id);
    }
  }, [selectedCampaign, fetchApplicantsForCampaign]);
  // --- END NEW ---

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
                onClick={() => openCampaignDetails(campaign)}
              >
                {campaign.coverProyek && (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={campaign.coverProyek}
                      alt={`Cover Proyek ${campaign.namaProyek}`}
                      className="w-full h-full object-cover"

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

      {isModalOpen && selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          initialApplicants={applicantsForModal}
          onClose={closeCampaignDetails}
          onApplicantStatusChange={(applicantId, newStatusApiValue) => handleApplicantStatusChange(applicantId, newStatusApiValue)}
          onRefreshApplicants={refreshModalApplicants}
        />
      )}
      {/* Loading state for fetching applicants in modal */}
      {isModalOpen && loadingApplicants && (
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
      {/* Error state for fetching applicants in modal */}
      {isModalOpen && !loadingApplicants && applicantFetchError && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-red-50 p-8 rounded-lg shadow-xl text-red-700 border border-red-200">
            <p className="text-lg font-semibold mb-2">Gagal memuat pelamar!</p>
            <p>{applicantFetchError}</p>
            <button onClick={closeCampaignDetails} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Tutup</button>
          </div>
        </div>
      )}
    </main>
  );
}