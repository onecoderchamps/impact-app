import React, { useEffect, useState, useCallback } from 'react';
import { getData, postData } from '../../../api/service'; // Now using postData for applying

// --- Helper function: mapApplicantStatus (Keep for potential future use or if API still returns it) ---
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

// --- CampaignDetailModal Component (Influencer View) ---
// Removed initialApplicants, onApplicantStatusChange, onRefreshApplicants props
const CampaignDetailModal = ({ campaign, onClose, onApplySuccess }) => {
  if (!campaign) return null;

  const [loadingAction, setLoadingAction] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false); // New state to track if influencer has applied

  // We might want to check if the current user (influencer) has already applied
  // This would typically involve fetching user-specific application status
  // For this example, let's assume we get this info with the campaign data,
  // or we can add a useEffect to fetch it.
  // For now, let's simulate by setting a flag if `campaign.userHasApplied` is true.
  useEffect(() => {
    // Assuming campaign object might have a property indicating if the current user applied
    if (campaign.userHasApplied) { // This property needs to be fetched/set when campaigns are loaded
      setHasApplied(true);
    } else {
      setHasApplied(false);
    }
  }, [campaign]);


  const handleApply = async () => {
    setLoadingAction(true);
    setActionError(null);
    try {
      // You'll need the influencer's user ID here, likely from authentication context
      // For this example, let's use a placeholder `currentInfluencerId`
      const currentInfluencerId = "influencer123"; // REPLACE WITH ACTUAL USER ID FROM AUTH

      const payload = {
        idCampaign: campaign.id,
        idUser: currentInfluencerId,
        // The API might expect 'status: null' for pending, or just omit it
        // Check your backend's expectation for initial application status
        status: null // Assuming 'null' means pending application
      };

      // Assuming your API endpoint for applying is different, e.g., POST to 'Campaign/Apply'
      const response = await postData("Campaign/registerMember", payload); // Changed to postData

      if (response.code === 200) {
        alert('Anda berhasil melamar campaign ini!');
        setHasApplied(true); // Mark as applied
        if (onApplySuccess) {
          onApplySuccess(campaign.id, currentInfluencerId); // Notify parent of successful application
        }
      } else {
        setActionError(response.Error || 'Gagal melamar campaign. Silakan coba lagi.');
        alert(`Gagal melamar campaign: ${response.Error || 'Terjadi kesalahan.'}`);
      }

    } catch (error) {
      console.error('Error applying for campaign:', error);
      setActionError('Terjadi kesalahan saat berkomunikasi dengan server.');
      alert('Gagal melamar campaign. Silakan coba lagi.');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col relative overflow-hidden transform scale-95 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-4xl font-light leading-none z-10 transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="p-10 flex-grow flex flex-col overflow-y-auto custom-scrollbar">
          {/* Campaign Details (Single Panel) */}
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

            {/* Application Button */}
            <div className="pt-8 mt-8 border-t border-gray-200 text-center">
              {hasApplied ? (
                <button
                  className="bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-xl cursor-not-allowed"
                  disabled
                >
                  Sudah Melamar
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loadingAction}
                >
                  {loadingAction ? 'Melamar...' : 'Lamar Campaign Ini'}
                </button>
              )}
              {actionError && <p className="text-red-600 mt-4 text-sm">{actionError}</p>}
            </div>
          </div>
        </div>
      </div>
      {/* Custom Scrollbar Styles (retained) */}
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

// --- CampaignList Component (Influencer View) ---
export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state to track applications made by the current influencer (mock for now)
  // In a real app, this would come from the user's profile/applications API
  const [myApplications, setMyApplications] = useState(new Set()); // Stores campaign.id for applied campaigns

  // Helper function to simulate fetching `userHasApplied` status
  const checkUserApplicationStatus = useCallback((campaignsData) => {
    // In a real app, you'd fetch the current user's applications
    // and then mark campaigns accordingly.
    // For now, let's assume `myApplications` set is authoritative.
    return campaignsData.map(campaign => ({
      ...campaign,
      userHasApplied: myApplications.has(campaign.id)
    }));
  }, [myApplications]);


  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      // Assuming 'Campaign/all' now returns campaigns suitable for influencers to see
      // and potentially includes a flag if the *current user* has applied.
      // If not, you'd need another API call to fetch user-specific applications.
      const response = await getData("Campaign/all");
      if (response.code === 200 && response.data) {
        // --- NEW: Filter campaigns that are 'Verified' (status: true) and active dates ---
        const now = new Date();
        const verifiedAndActiveCampaigns = response.data.filter(campaign => {
          const startDate = new Date(campaign.startDate);
          const endDate = new Date(campaign.endDate);
          return campaign.status === true && now >= startDate && now <= endDate;
        });

        // If you need to filter campaigns that are already applied by the user,
        // you'd typically fetch user's applied campaigns separately or have the API
        // return this flag directly on each campaign object.
        // For demonstration, let's assume `response.data` has it or we map it.
        setCampaigns(checkUserApplicationStatus(verifiedAndActiveCampaigns)); // Apply status check
        // --- END NEW ---
      } else {
        setError(response.Error || 'Failed to fetch campaigns.');
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err.message || 'An error occurred while fetching campaigns.');
    } finally {
      setLoading(false);
    }
  }, [checkUserApplicationStatus]); // Dependency on checkUserApplicationStatus


  // When `myApplications` changes, re-run fetchCampaigns to update `userHasApplied` flag
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns, myApplications]); // Added myApplications as dependency

  const openCampaignDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeCampaignDetails = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  // Callback for when an influencer successfully applies within the modal
  const handleApplySuccess = useCallback((campaignId, userId) => {
    // Add the campaign ID to the set of applied campaigns for the current user
    setMyApplications(prev => new Set(prev.add(campaignId)));

    // You might want to immediately close the modal or update the UI
    // If we re-fetch campaigns, the card will update automatically.
    // fetchCampaigns(); // Re-fetch all campaigns to update the "Applied" state on cards
    // Or just update the specific campaign's state in `campaigns` list
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(camp =>
        camp.id === campaignId ? { ...camp, userHasApplied: true } : camp
      )
    );
  }, []);


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
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10">Campaign Tersedia</h1>
        {campaigns.length === 0 ? (
          <p className="text-center text-gray-600 text-lg p-6 bg-white rounded-xl shadow-md">Tidak ada campaign tersedia saat ini. Silakan cek kembali nanti!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-200 border border-gray-200"
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{campaign.namaProyek}</h3>
                    <p className="text-md text-gray-600 mb-3 flex items-center gap-2">
                      <span className="font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">{campaign.jenisPekerjaan}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium text-sm">{campaign.tipeKonten}</span>
                    </p>
                    <p className="text-3xl font-extrabold text-emerald-600 my-4">
                      {formatCurrency(campaign.hargaPekerjaan)}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-medium">Periode:</span> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      <span className="font-medium">Arahan Konten:</span> {campaign.arahanKonten}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Dipromosikan: <span className="font-medium text-gray-700">{campaign.tipeProyek}</span>
                    </span>
                    {campaign.userHasApplied ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                        Sudah Dilamar
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                        Lamar Sekarang
                      </span>
                    )}
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
          onClose={closeCampaignDetails}
          onApplySuccess={handleApplySuccess} // Pass the new success handler
        />
      )}
      {/* No loading/error states for applicants specific to modal anymore, as there's no list to fetch */}
    </main>
  );
}