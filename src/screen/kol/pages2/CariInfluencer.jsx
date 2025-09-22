// src/pages/KolList.jsx
import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../../api/service';

const categoryOptions = [
  "Semua Kategori",
  "Fashion", "Beauty", "Lifestyle", "Travel", "Food",
  "Health", "Fitness", "Parenting", "Technology", "Gaming",
  "Music", "Education", "Finance", "Automotive", "Pets",
  "Photography", "Film", "Comedy", "Professional", "Books"
];

// Helper to generate a consistent avatar URL for placeholders
const getAvatarUrl = (name, color = '059669', background = 'd1fae5') => 
  `https://ui-avatars.com/api/?name=${name.split(" ").join("+")}&background=${background}&color=${color}&size=200&bold=true`;

const KolDetailModal = ({ kol, projects, onClose, onInviteKol }) => {
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  if (!kol) return null;

  const handleSendInvite = async () => {
    if (!selectedProjectId) {
      alert('Pilih project untuk mengundang KOL.');
      return;
    }
    setIsInviting(true);
    try {
      await postData('Campaign/registerByBrand', { IdUser: kol.id, IdCampaign: selectedProjectId });
      alert(`KOL ${kol.fullName} berhasil diundang ke project ${projects.find(p => p.id === selectedProjectId)?.namaProyek || selectedProjectId}.`);
      onClose(); // Close the modal
      setSelectedProjectId(''); // Reset selection
    } catch (error) {
      console.error('Failed to invite KOL:', error);
      alert(`Gagal mengundang KOL: ${error || 'Terjadi kesalahan saat mengundang.'}`); 
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative overflow-hidden transform transition-all duration-300 my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-blue-700">
          <h2 className="text-2xl font-extrabold text-white">Detail KOL</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 transition-colors text-3xl font-light leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Isi */}
        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Profil Section */}
          <div className="flex flex-col sm:flex-row gap-6 items-center border-b pb-6">
            <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg">
              <img
                src={kol.image || getAvatarUrl(kol.fullName)}
                alt={kol.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h3 className="text-3xl font-bold text-gray-900">{kol.fullName}</h3>
              <p className="text-gray-500 text-base">{kol.email}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mt-2">
                {kol.idRole || "KOL"}
              </span>
            </div>
          </div>

          {/* Metrics (Score & Breakdown) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Impact Score */}
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 shadow-inner">
              <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">
                Impact Score
              </h4>
              <p className="text-4xl font-extrabold text-emerald-900">{kol.score || 'N/A'}</p>
            </div>
            
            {/* Breakdown */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
                Breakdown
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {kol.breakdown &&
                  Object.entries(kol.breakdown).map(([key, val]) => (
                    <li key={key} className='flex justify-between'>
                      <span className='capitalize font-medium'>{key.replace(/([A-Z])/g, ' $1').trim()}:</span> 
                      <span>{val}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Kategori & Social Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Kategori */}
            {kol.category && kol.category.length > 0 && (
              <div className='p-4 bg-white rounded-xl border border-gray-200'>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Kategori</h4>
                <div className="flex flex-wrap gap-2">
                  {kol.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Social Media */}
            {kol.socialMediaProfiles?.tiktok && (
              <div className='p-4 bg-white rounded-xl border border-gray-200'>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Media Sosial
                </h4>
                <div className='flex items-center space-x-2'>
                    {/* Placeholder for TikTok Icon */}
                    <div className="text-lg font-bold text-gray-500">
                        {/* 🎵 */} 
                    </div> 
                    <a
                        href={kol.socialMediaProfiles.tiktok.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium truncate"
                    >
                        {kol.socialMediaProfiles.tiktok.handle} (TikTok)
                    </a>
                </div>
              </div>
            )}
          </div>
          

          {/* Undang ke Campaign */}
          {projects && projects.length > 0 && (
            <div className='p-6 bg-blue-50 rounded-xl border border-blue-200'>
              <h4 className="text-xl font-bold text-blue-800 mb-3">
                Undang ke Campaign
              </h4>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="">-- Pilih Campaign --</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.namaProyek}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSendInvite}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                disabled={!selectedProjectId || isInviting}
              >
                {isInviting ? 'Mengirim Undangan...' : 'Kirim Undangan'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const KolList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKol, setSelectedKol] = useState(null);
  const [isKolModalOpen, setIsKolModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [kolUsers, setKolUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch KOL
  const fetchKols = async (category) => {
    if (!category) return;
    setLoading(true);
    setError(null);
    try {
      let res;
      if (category === "Semua Kategori") {
        res = await getData("user/kol");
      } else {
        res = await getData(`user/kol/${category.toLowerCase()}`);
      }

      if (res?.data) {
        const transformedData = res.data.map((kol) => ({
          id: kol.user.id,
          email: kol.user.email,
          fullName: kol.user.fullName,
          image: kol.user.image,
          idRole: kol.user.idRole,
          category: kol.user.categories
            ? kol.user.categories.split(",").map((c) => c.trim())
            : [],
          score: kol.impactScore,
          breakdown: kol.breakdown,
          socialMediaProfiles: {
            tiktok: kol.user.tikTok
              ? {
                  handle: `@${kol.user.tikTok}`,
                  url: `https://www.tiktok.com/@${kol.user.tikTok.replace(
                    /^@/,
                    ""
                  )}`,
                }
              : undefined,
          },
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

  // fetch campaign
  const fetchCampaigns = async () => {
    try {
      const res = await getData("Campaign");
      const verifiedCampaigns = res.data.filter(
        (c) => c.isVerification === true
      );
      setCampaigns(verifiedCampaigns);
    } catch (err) {
      console.error("Error fetching campaign data:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const filteredKols = kolUsers.filter((kol) =>
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

  // This function is still present but not directly used by the Modal's invite logic
  // as the logic was moved inside the modal for simplicity in the original code.
  const handleInviteKol = async (kolId, projectId) => {
    // ... invite logic (kept for completeness if you decide to move the logic back)
  };

  return (
    <main className="ml-64 mt-20 p-8 bg-gray-50 min-h-screen">
      
      {/* Header & Filter Section */}
      <div className='mb-10 bg-white p-6 rounded-xl shadow-lg'>
        <h1 className='text-3xl font-extrabold text-gray-800 mb-5'>Daftar Key Opinion Leader (KOL) 🚀</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* Category Dropdown */}
          <select
            className="w-full sm:w-72 p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            value={selectedCategory}
            onChange={(e) => {
              const cat = e.target.value;
              setSelectedCategory(cat);
              if (cat) fetchKols(cat);
            }}
          >
            <option value="">-- Pilih Kategori KOL --</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={selectedCategory ? "Cari nama KOL..." : "Pilih kategori untuk mencari..."}
              className="w-full p-3 pl-4 pr-4 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!selectedCategory}
            />
          </div>
        </div>
      </div>

      {/* List Container */}
      <div className='mt-8'>
        {loading ? (
          <div className="text-center text-gray-600 text-xl py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-r-blue-300 mx-auto mb-4"></div>
            Memuat data KOL kategori **{selectedCategory}**...
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-xl py-10 bg-red-100 border border-red-300 rounded-xl shadow-md">
            🚨 {error}
          </p>
        ) : !selectedCategory ? (
          <p className="text-center text-gray-600 text-xl py-10 bg-white rounded-xl shadow-md">
            👆 **Silakan pilih kategori** untuk menampilkan daftar KOL yang tersedia.
          </p>
        ) : filteredKols.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10 bg-white rounded-xl shadow-md">
            😔 Tidak ada KOL yang cocok dengan kriteria saat ini untuk kategori **"{selectedCategory}"**.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredKols.map((kol) => (
              <div
                key={kol.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative group flex flex-col cursor-pointer"
                onClick={() => openKolDetails(kol)}
              >
                <div className="w-full h-40 bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={kol.image || getAvatarUrl(kol.fullName, 'ffffff', '059669')}
                    alt={kol.fullName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5 text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 truncate">
                      {kol.fullName}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      {kol.email}
                    </p>
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {kol.idRole || "KOL"}
                    </span>
                  </div>

                  {/* Impact Score Badge */}
                  <div className='my-3'>
                    <span className='inline-flex items-center justify-center bg-emerald-500 text-white text-lg font-extrabold px-4 py-1 rounded-full shadow-md'>
                        ⭐ {kol.score || 'N/A'}
                    </span>
                  </div>

                  {kol.category && kol.category.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">
                        Kategori Utama:
                      </h3>
                      <div className="flex flex-wrap justify-center gap-1">
                        {/* Show only first two categories for cleaner card design */}
                        {kol.category.slice(0, 2).map((cat, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                         {kol.category.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                +{kol.category.length - 2}
                            </span>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openKolDetails(kol);
                    }}
                  >
                    Lihat Detail & Undang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isKolModalOpen && (
        <KolDetailModal
          kol={selectedKol}
          projects={campaigns}
          onClose={closeKolDetails}
          onInviteKol={handleInviteKol} // Passes the function, though its implementation is currently inside the modal
        />
      )}
    </main>
  );
};

export default KolList;