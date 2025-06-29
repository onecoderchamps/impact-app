// src/pages/KolList.jsx
import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../../api/service'; // Make sure the path is correct

// --- Mock Data (Digunakan untuk projects karena API user/kol tidak menyediakan ini) ---
// In a real app, you'd fetch this project data from your API.
const mockProjectData = {
  "code": 200,
  "data": [
    { "id": "49dfcce1-9d69-47a1-9fcd-be8ec8339717", "namaProyek": "ABIGOLD IKLAN" },
    { "id": "2e413457-4a77-4cd5-9df8-a6b74c0ad44d", "namaProyek": "Bear Brand" },
    { "id": "74376d77-2f2c-43cf-a1ad-a1eb6f5248ea", "namaProyek": "asd" },
    { "id": "801e5ad7-d247-4093-9049-27af72cda1d9", "namaProyek": "Proyek Test Jual Emas" },
  ],
  "message": "Projects retrieved successfully"
};

// --- Komponen KolDetailModal (tergabung dalam file yang sama) ---
const KolDetailModal = ({ kol, projects, onClose, onInviteKol }) => {
  const [showInviteSection, setShowInviteSection] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  // State baru untuk tab aktif di rate card
  const [activeRateTab, setActiveRateTab] = useState('');

  if (!kol) return null;

  // Initialize activeRateTab to the first platform if rateCardData exists
  useEffect(() => {
    if (kol.rateCardData && kol.rateCardData.rates) {
      const firstPlatform = Object.keys(kol.rateCardData.rates)[0];
      if (firstPlatform) {
        setActiveRateTab(firstPlatform);
      }
    }
  }, [kol.rateCardData]);

  // Sesuaikan platform berdasarkan data yang mungkin ada dari API atau tambahkan secara generik
  const socialMediaPlatforms = [
    { name: 'tiktok', icon: 'fab fa-tiktok', color: 'text-black' },
    { name: 'instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
    { name: 'youtube', icon: 'fab fa-youtube', color: 'text-red-600' },
    { name: 'facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
    { name: 'linkedin', icon: 'fab fa-linkedin', color: 'text-blue-700' },
  ];

  const handleInvite = async () => {
    if (!selectedProjectId) {
      alert('Pilih project untuk mengundang KOL.');
      return;
    }
    setIsInviting(true);
    try {
      await postData('Campaign/registerByBrand', { IdUser: kol.id, IdCampaign: selectedProjectId });
      alert(`KOL ${kol.fullName} berhasil diundang ke project ${projects.find(p => p.id === selectedProjectId)?.namaProyek || selectedProjectId // Use namaProyek
        }.`);
      setShowInviteSection(false); // Close invitation section
      setSelectedProjectId(''); // Reset selection
      onInviteKol(kol.id, selectedProjectId); // Notify parent component
    } catch (error) {
      console.error('Failed to invite KOL:', error);
      alert(`Gagal mengundang KOL: ${error.message || error}`); // Display specific error message
    } finally {
      setIsInviting(false);
    }
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col relative overflow-hidden transform scale-95 animate-scale-in">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-4xl font-light leading-none z-10 transition-colors duration-200"
          aria-label="Tutup"
        >
          ×
        </button>

        <div className="p-8 flex-grow flex flex-col md:flex-row gap-8 overflow-hidden">
          {/* Panel Kiri: Detail KOL */}
          <div className="md:w-1/2 flex flex-col pr-6 border-r border-gray-100 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center mb-6">
              <img
                src={kol.image || `https://ui-avatars.com/api/?name=${kol.fullName.split(' ').join('+')}&background=random&color=fff&size=200`}
                alt={kol.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-4"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${kol.fullName.split(' ').join('+')}&background=random&color=fff&size=200`; }}
              />
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">{kol.fullName}</h2>
              <p className="text-lg text-gray-600 mt-1">{kol.email}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mt-3">
                {kol.idRole || 'KOL'} {/* Default ke 'KOL' jika tidak ada */}
              </span>
            </div>

            <div className="space-y-6 text-gray-700 text-base leading-relaxed">
              {/* Bagian Kategori */}
              {kol.category && kol.category.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    {kol.category.map((cat, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Profil Media Sosial</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialMediaPlatforms.map(platform => kol.socialMediaProfiles && kol.socialMediaProfiles[platform.name] && (
                  <div key={platform.name} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                    <i className={`${platform.icon} ${platform.color} text-2xl`}></i>
                    <div>
                      <p className="font-semibold text-gray-800 capitalize">{platform.name}</p>
                      <a
                        href={kol.socialMediaProfiles[platform.name].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm truncate block"
                      >
                        {kol.socialMediaProfiles[platform.name].handle || kol.socialMediaProfiles[platform.name].url}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* --- Bagian Rate Card Data dengan Tab Bar --- */}
              {kol.rateCardData && kol.rateCardData.rates && Object.keys(kol.rateCardData.rates).length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Rate Card ({kol.rateCardData.currency || 'IDR'})</h3>

                  {/* Tab Bar */}
                  <div className="flex border-b border-gray-200 mb-4 overflow-x-auto custom-scrollbar-horizontal">
                    {Object.keys(kol.rateCardData.rates).map(platform => (
                      <button
                        key={platform}
                        onClick={() => setActiveRateTab(platform)}
                        className={`py-2 px-4 text-center text-sm font-medium focus:outline-none whitespace-nowrap
                          ${activeRateTab === platform
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
                          } transition-colors duration-200`
                        }
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)} {/* Capitalize platform name */}
                      </button>
                    ))}
                  </div>

                  {/* Konten Tab */}
                  <div className="space-y-4">
                    {activeRateTab && kol.rateCardData.rates[activeRateTab] ? (
                      <div className="bg-blue-50 p-4 rounded-lg animate-fade-in">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2 capitalize">{activeRateTab}</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          {Object.entries(kol.rateCardData.rates[activeRateTab]).map(([item, price]) => (
                            <li key={item} className="flex justify-between items-center text-sm py-1">
                              <span>{item}:</span>
                              <span className="font-medium text-gray-900">{formatRupiah(price)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center p-4 bg-gray-50 rounded-lg">
                        Tidak ada detail rate card untuk platform ini.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel Kanan: Grafik Perkembangan Follower */}
          <div className="md:w-1/2 flex flex-col pl-6 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Perkembangan Follower (7 Hari Terakhir)</h3>
            {/* Karena API baru tidak menyediakan followerHistory, tampilkan pesan ini */}
            <p className="text-gray-600 text-center mt-8 text-lg bg-gray-50 p-6 rounded-lg">
              Data perkembangan follower tidak tersedia dari API.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              {/* Bagian Undangan */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowInviteSection(!showInviteSection)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  {showInviteSection ? 'Batalkan Undangan' : 'Undang KOL ke Project'}
                </button>

                {showInviteSection && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">Pilih Project:</label>
                    <select
                      id="project-select"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      required
                    >
                      <option value="">-- Pilih Project --</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.namaProyek}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleInvite}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                      disabled={!selectedProjectId || isInviting}
                    >
                      {isInviting ? 'Mengirim Undangan...' : 'Kirim Undangan'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gaya Scrollbar Kustom dan Animasi (dapat dipindahkan ke file CSS global) */}
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
        .custom-scrollbar-horizontal::-webkit-scrollbar {
            height: 6px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
            background: #cbd5e0; /* gray-300 */
            border-radius: 10px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
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

// --- Komponen KolList Utama ---
const KolList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKol, setSelectedKol] = useState(null);
  const [isKolModalOpen, setIsKolModalOpen] = useState(false);

  // State for KOL data from API
  const [kolUsers, setKolUsers] = useState([]);
  // State for campaign data (projects) from API
  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch KOL data from API
  const fetchKols = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getData("user/kol");
      if (res?.data) {
        const transformedData = res.data.map(kol => ({
          id: kol.id,
          email: kol.email,
          fullName: kol.fullName,
          image: kol.image,
          idRole: kol.idRole,
          category: kol.categories ? kol.categories.split(',').map(cat => cat.trim()) : [],
          socialMediaProfiles: {
            tiktok: kol.tikTok ? { handle: `@${kol.tikTok}`, url: `https://www.tiktok.com/@${kol.tikTok.replace(/^@/, '')}` } : undefined,
            instagram: kol.instagram ? { handle: `@${kol.instagram}`, url: `https://www.instagram.com/${kol.instagram.replace(/^@/, '')}` } : undefined,
            youtube: kol.youtube ? { handle: kol.youtube, url: `https://www.youtube.com/@${kol.youtube.replace(/^@/, '')}` } : undefined,
            facebook: kol.facebook ? { handle: kol.facebook, url: `https://www.facebook.com/${kol.facebook.replace(/^@/, '')}` } : undefined,
            linkedin: kol.linkedin ? { handle: kol.linkedin, url: `https://www.linkedin.com/in/${kol.linkedin.replace(/^@/, '')}` } : undefined,
          },
          followerHistory: [],
          socialMediaFollowers: {},
          rateCardData: kol.rateCardData || null,
        }));
        setKolUsers(transformedData);
      } else {
        setKolUsers([]);
      }
    } catch (err) {
      console.error("Error fetching KOL data:", err);
      setError("Gagal mengambil data KOL. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch campaign data for the project selection
  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getData("Campaign");
      // Filter campaigns where isVerification is true
      const verifiedCampaigns = res.data.filter(camp => camp.isVerification === true);
      setCampaigns(verifiedCampaigns);
    } catch (err) {
      console.error("Error fetching campaign data:", err);
      setError("Gagal mengambil data kampanye. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchKols and fetchCampaigns when the component mounts
  useEffect(() => {
    fetchKols();
    fetchCampaigns(); // Fetch campaigns here
  }, []);

  const filteredKols = kolUsers.filter(kol =>
    kol.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openKolDetails = (kol) => {
    setSelectedKol(kol);
    setIsKolModalOpen(true);
  };

  const closeKolDetails = () => {
    setIsKolModalOpen(false);
    setSelectedKol(null);
  };

  const handleInviteKol = (kolId, projectId) => {
    console.log(`KOL ${kolId} diundang ke project ${projectId} (dari induk)`);
    // You might want to refresh KOL data or show a notification here
  };

  return (
    <main className="ml-64 mt-20 p-8 bg-gray-100 min-h-screen">

      {/* Input Pencarian */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Cari nama KOL..."
            className="w-full p-4 pl-12 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-lg transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Status Loading, Error, atau No Data */}
      {loading ? (
        <div className="text-center text-gray-600 text-xl py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-r-blue-300 mx-auto mb-4"></div>
          Memuat data KOL...
        </div>
      ) : error ? (
        <p className="text-center text-red-600 text-xl py-10 bg-red-50 border border-red-200 rounded-lg shadow-md">
          {error}
        </p>
      ) : filteredKols.length === 0 ? (
        <p className="text-center text-gray-600 text-xl py-10 bg-white rounded-lg shadow-md">
          {searchTerm ? `Tidak ada KOL dengan nama "${searchTerm}".` : 'Tidak ada data KOL yang tersedia.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredKols.map(kol => (
            <div
              key={kol.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative group flex flex-col cursor-pointer"
              onClick={() => openKolDetails(kol)}
            >
              <div className="w-full h-40 bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                  src={kol.image || `https://ui-avatars.com/api/?name=${kol.fullName.split(' ').join('+')}&background=random&color=fff&size=200`}
                  alt={kol.fullName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${kol.fullName.split(' ').join('+')}&background=random&color=fff&size=200`; }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 text-center flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1 truncate">
                    {kol.fullName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {kol.email}
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-0.5 rounded-full mb-4">
                    {kol.idRole || 'KOL'}
                  </span>
                </div>

                {/* Bagian Kategori pada Kartu */}
                {kol.category && kol.category.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">Kategori:</h3>
                    <div className="flex flex-wrap justify-center gap-1">
                      {kol.category.map((cat, index) => (
                        <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
                  onClick={(e) => { e.stopPropagation(); openKolDetails(kol); }}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail KOL */}
      {isKolModalOpen && (
        <KolDetailModal
          kol={selectedKol}
          projects={campaigns}
          onClose={closeKolDetails}
          onInviteKol={handleInviteKol}
        />
      )}
    </main>
  );
};

export default KolList;