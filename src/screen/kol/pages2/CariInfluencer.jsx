import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Mock Data (Ganti dengan data API Anda) ---
const initialKolData = {
  "code": 200,
  "data": [
    {
      "id": "a29886ac-f9fd-4933-974b-596580baa3ef",
      "email": "hilmanzutech@gmail.com",
      "fullName": "Gen Halilintar",
      "image": "https://beres-backend-609517395039.asia-southeast2.run.app/api/v1/file/review/68333845226d836a9b5eb15c",
      "idRole": "KOL",
      "category": ["Family Vlogs", "Music"], // Contoh kategori
      "socialMediaFollowers": { // Ringkasan untuk kartu daftar
        "tiktok": "15.2M", "instagram": "20.5M", "youtube": "17.8M", "twitter": "1.2M", "facebook": "5.1M", "linkedin": "50K"
      },
      "socialMediaProfiles": { // Detail profil untuk modal
        "tiktok": { handle: "@genhalilintar", url: "https://www.tiktok.com/@genhalilintar" },
        "instagram": { handle: "@genhalilintar", url: "https://www.instagram.com/genhalilintar" },
        "youtube": { handle: "GenHalilintar", url: "https://www.youtube.com/user/GenHalilintar" },
        "twitter": { handle: "@genhalilintar", url: "https://twitter.com/genhalilintar" },
        "facebook": { handle: "GenHalilintarOfficial", url: "https://www.facebook.com/GenHalilintarOfficial" },
        "linkedin": { handle: "Gen Halilintar", url: "https://id.linkedin.com/in/gen-halilintar" }
      },
      "followerHistory": [ // Mock riwayat 7 hari untuk grafik (dalam ribuan)
        { date: "Day 1", tiktok: 15100, instagram: 20400, youtube: 17700 },
        { date: "Day 2", tiktok: 15150, instagram: 20450, youtube: 17750 },
        { date: "Day 3", tiktok: 15200, instagram: 20500, youtube: 17800 },
        { date: "Day 4", tiktok: 15250, instagram: 20550, youtube: 17850 },
        { date: "Day 5", tiktok: 15300, instagram: 20600, youtube: 17900 },
        { date: "Day 6", tiktok: 15350, instagram: 20650, youtube: 17950 },
        { date: "Day 7", tiktok: 15400, instagram: 20700, youtube: 18000 }
      ]
    },
    {
      "id": "b30997bd-g0ge-5044-985c-607691cbb4fg",
      "email": "sarah.influencer@example.com",
      "fullName": "Sarah Wijayanto",
      "image": "https://i.pravatar.cc/150?img=48",
      "idRole": "KOL",
      "category": ["Fashion", "Lifestyle", "Beauty"], // Contoh kategori
      "socialMediaFollowers": {
        "tiktok": "8.1M", "instagram": "12.3M", "youtube": "5.9M", "twitter": "750K", "facebook": "2.8M", "linkedin": "20K"
      },
      "socialMediaProfiles": {
        "tiktok": { handle: "@sarah.id", url: "https://www.tiktok.com/@sarah.id" },
        "instagram": { handle: "@sarahwijayanto", url: "https://www.instagram.com/sarahwijayanto" },
        "youtube": { handle: "SarahWijayanto", url: "https://www.youtube.com/user/SarahWijayanto" },
        "twitter": { handle: "@sarahwijayanto", url: "https://twitter.com/sarahwijayanto" },
        "facebook": { handle: "SarahWijayantoOfficial", url: "https://www.facebook.com/sarahwijayanto" },
        "linkedin": { handle: "Sarah Wijayanto", url: "https://id.linkedin.com/in/sarah-wijayanto" }
      },
      "followerHistory": [
        { date: "Day 1", tiktok: 8000, instagram: 12200, youtube: 5800 },
        { date: "Day 2", tiktok: 8050, instagram: 12250, youtube: 5850 },
        { date: "Day 3", tiktok: 8100, instagram: 12300, youtube: 5900 },
        { date: "Day 4", tiktok: 8150, instagram: 12350, youtube: 5950 },
        { date: "Day 5", tiktok: 8200, instagram: 12400, youtube: 6000 },
        { date: "Day 6", tiktok: 8250, instagram: 12450, youtube: 6050 },
        { date: "Day 7", tiktok: 8300, instagram: 12500, youtube: 6100 }
      ]
    },
    {
      "id": "c41008ce-h1hf-5155-996d-618702dcc5gh",
      "email": "david.vlog@example.com",
      "fullName": "David Gadgetin",
      "image": "https://i.pravatar.cc/150?img=65",
      "idRole": "KOL",
      "category": ["Technology", "Gadgets"], // Contoh kategori
      "socialMediaFollowers": {
        "tiktok": "3.5M", "instagram": "4.8M", "youtube": "10.1M", "twitter": "900K", "facebook": "1.5M", "linkedin": "30K"
      },
      "socialMediaProfiles": {
        "tiktok": { handle: "@davidgadgetin", url: "https://www.tiktok.com/@davidgadgetin" },
        "instagram": { handle: "@davidgadgetin", url: "https://www.instagram.com/davidgadgetin" },
        "youtube": { handle: "Gadgetin", url: "https://www.youtube.com/user/gadgetin" },
        "twitter": { handle: "@gadgetin", url: "https://twitter.com/gadgetin" },
        "facebook": { handle: "GadgetinOfficial", url: "https://www.facebook.com/GadgetinOfficial" },
        "linkedin": { handle: "David Gadgetin", url: "https://id.linkedin.com/in/david-gadgetin" }
      },
      "followerHistory": [
        { date: "Day 1", tiktok: 3400, instagram: 4700, youtube: 10000 },
        { date: "Day 2", tiktok: 3450, instagram: 4750, youtube: 10050 },
        { date: "Day 3", tiktok: 3500, instagram: 4800, youtube: 10100 },
        { date: "Day 4", tiktok: 3550, instagram: 4850, youtube: 10150 },
        { date: "Day 5", tiktok: 3600, instagram: 4900, youtube: 10200 },
        { date: "Day 6", tiktok: 3650, instagram: 4950, youtube: 10250 },
        { date: "Day 7", tiktok: 3700, instagram: 5000, youtube: 10300 }
      ]
    },
    {
      "id": "d52119df-i2ig-5266-007e-629813eed6hi",
      "email": "putri.beauty@example.com",
      "fullName": "Putri Modifikasi",
      "image": "https://i.pravatar.cc/150?img=26",
      "idRole": "KOL",
      "category": ["Otomotif", "Modifikasi"], // Contoh kategori
      "socialMediaFollowers": {
        "tiktok": "1.9M", "instagram": "6.2M", "youtube": "2.7M", "twitter": "300K", "facebook": "800K", "linkedin": "10K"
      },
      "socialMediaProfiles": {
        "tiktok": { handle: "@putrimodifikasi", url: "https://www.tiktok.com/@putrimodifikasi" },
        "instagram": { handle: "@putrimodifikasi", url: "https://www.instagram.com/putrimodifikasi" },
        "youtube": { handle: "PutriModifikasi", url: "https://www.youtube.com/user/PutriModifikasi" },
        "twitter": { handle: "@putrimodif", url: "https://twitter.com/putrimodif" },
        "facebook": { handle: "PutriModifikasiOfficial", url: "https://www.facebook.com/PutriModifikasiOfficial" },
        "linkedin": { handle: "Putri Modifikasi", url: "https://id.linkedin.com/in/putri-modifikasi" }
      },
      "followerHistory": [
        { date: "Day 1", tiktok: 1800, instagram: 6100, youtube: 2600 },
        { date: "Day 2", tiktok: 1850, instagram: 6150, youtube: 2650 },
        { date: "Day 3", tiktok: 1900, instagram: 6200, youtube: 2700 },
        { date: "Day 4", tiktok: 1950, instagram: 6250, youtube: 2750 },
        { date: "Day 5", tiktok: 2000, instagram: 6300, youtube: 2800 },
        { date: "Day 6", tiktok: 2050, instagram: 6350, youtube: 2850 },
        { date: "Day 7", tiktok: 2100, instagram: 6400, youtube: 2900 }
      ]
    },
    {
      "id": "e63220eg-j3jh-5377-118f-630924ffe7ij",
      "email": "rizal.travel@example.com",
      "fullName": "Rizal Jalan-Jalan",
      "image": "https://i.pravatar.cc/150?img=12",
      "idRole": "KOL",
      "category": ["Traveling", "Food"], // Contoh kategori
      "socialMediaFollowers": {
        "tiktok": "500K", "instagram": "1.8M", "youtube": "1.1M", "twitter": "150K", "facebook": "400K", "linkedin": "5K"
      },
      "socialMediaProfiles": {
        "tiktok": { handle: "@rizaljalanjalan", url: "https://www.tiktok.com/@rizaljalanjalan" },
        "instagram": { handle: "@rizaljalanjalan", url: "https://www.instagram.com/rizaljalanjalan" },
        "youtube": { handle: "RizalJalanJalan", url: "https://www.youtube.com/user/RizalJalanJalan" },
        "twitter": { handle: "@rizaltravel", url: "https://twitter.com/rizaltravel" },
        "facebook": { handle: "RizalJalanJalanOfficial", url: "https://www.facebook.com/RizalJalanJalanOfficial" },
        "linkedin": { handle: "Rizal Jalan-Jalan", url: "https://id.linkedin.com/in/rizal-jalan-jalan" }
      },
      "followerHistory": [
        { date: "Day 1", tiktok: 480, instagram: 1700, youtube: 1000 },
        { date: "Day 2", tiktok: 490, instagram: 1720, youtube: 1020 },
        { date: "Day 3", tiktok: 500, instagram: 1740, youtube: 1040 },
        { date: "Day 4", tiktok: 510, instagram: 1760, youtube: 1060 },
        { date: "Day 5", tiktok: 520, instagram: 1780, youtube: 1080 },
        { date: "Day 6", tiktok: 530, instagram: 1800, youtube: 1100 },
        { date: "Day 7", tiktok: 540, instagram: 1820, youtube: 1120 }
      ]
    }
  ],
  "message": "Data Add Complete"
};

const mockProjectData = {
  "code": 200,
  "data": [
    { "id": "proj1", "name": "Kampanye Produk Terbaru Q3" },
    { "id": "proj2", "name": "Promosi Event Grand Opening" },
    { "id": "proj3", "name": "Launch Aplikasi Mobile V2" },
    { "id": "proj4", "name": "Campaign Social Media Ramadhan" },
  ],
  "message": "Projects retrieved successfully"
};

// --- Komponen KolDetailModal (tergabung dalam file yang sama) ---
const KolDetailModal = ({ kol, projects, onClose, onInviteKol }) => {
  const [showInviteSection, setShowInviteSection] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  if (!kol) return null;

  const socialMediaPlatforms = [
    { name: 'tiktok', icon: 'fab fa-tiktok', color: 'text-black' },
    { name: 'instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
    { name: 'youtube', icon: 'fab fa-youtube', color: 'text-red-600' },
    { name: 'twitter', icon: 'fab fa-twitter', color: 'text-blue-400' },
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
      // Simulasi panggilan API untuk mengundang KOL
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi penundaan jaringan
      // Di aplikasi nyata, Anda akan mengirim permintaan ke backend Anda:
      // const response = await postData('/api/invitations', { kolId: kol.id, projectId: selectedProjectId });
      onInviteKol(kol.id, selectedProjectId); // Memberi tahu komponen induk
      alert(`KOL ${kol.fullName} berhasil diundang ke project ${
        projects.data.find(p => p.id === selectedProjectId)?.name || selectedProjectId
      }.`);
      setShowInviteSection(false); // Tutup bagian undangan
      setSelectedProjectId(''); // Reset pilihan
    } catch (error) {
      console.error('Gagal mengundang KOL:', error);
      alert('Gagal mengundang KOL. Silakan coba lagi.');
    } finally {
      setIsInviting(false);
    }
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
                {kol.idRole}
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
                      {projects.data.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
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

          {/* Panel Kanan: Grafik Perkembangan Follower */}
          <div className="md:w-1/2 flex flex-col pl-6 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Perkembangan Follower (7 Hari Terakhir)</h3>
            {kol.followerHistory && kol.followerHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={kol.followerHistory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-sm" />
                  <YAxis tickFormatter={(value) => `${value / 1000}K`} axisLine={false} tickLine={false} className="text-sm" />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} formatter={(value) => [`${value / 1000}K`, 'Followers']} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  {/* Bar untuk setiap platform media sosial */}
                  {Object.keys(kol.followerHistory[0] || {}).filter(key => key !== 'date').map(platformKey => (
                     <Bar
                       key={platformKey}
                       dataKey={platformKey}
                       fill={
                         platformKey === 'tiktok' ? '#333333' :
                         platformKey === 'instagram' ? '#E1306C' :
                         platformKey === 'youtube' ? '#FF0000' :
                         '#8884d8' // Warna default jika tidak ditentukan
                       }
                       name={platformKey.charAt(0).toUpperCase() + platformKey.slice(1)} // Huruf kapital untuk legenda
                       barSize={15}
                       radius={[10, 10, 0, 0]}
                     />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-600 text-center mt-8 text-lg bg-gray-50 p-6 rounded-lg">
                Data perkembangan follower tidak tersedia.
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Lainnya</h3>
                <p className="text-gray-700">Bagian ini dapat digunakan untuk wawasan atau metrik tambahan yang relevan dengan KOL, seperti tingkat keterlibatan, demografi audiens, atau kinerja kampanye sebelumnya.</p>
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

// --- Komponen KolList ---
const KolList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKol, setSelectedKol] = useState(null);
  const [isKolModalOpen, setIsKolModalOpen] = useState(false);
  const kolUsers = initialKolData.data; // Akses array 'data' secara langsung
  const projects = mockProjectData; // Data proyek mock

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
    // Fungsi ini dapat digunakan untuk memperbarui state apa pun di KolList jika diperlukan
    console.log(`KOL ${kolId} diundang ke project ${projectId} (dari induk)`);
    // Dalam aplikasi nyata, Anda mungkin akan mengambil ulang daftar KOL atau memperbarui state lokal jika status undangan perlu direfleksikan
  };

  // Fungsi pembantu untuk merender ikon media sosial dan jumlah follower untuk kartu (tampilan ringkasan)
  const renderSocialMediaFollowersSummary = (followers) => {
    const platforms = [
      { name: 'tiktok', icon: 'fab fa-tiktok', color: 'text-black' },
      { name: 'instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
      { name: 'youtube', icon: 'fab fa-youtube', color: 'text-red-600' },
      { name: 'twitter', icon: 'fab fa-twitter', color: 'text-blue-400' },
      { name: 'facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
      { name: 'linkedin', icon: 'fab fa-linkedin', color: 'text-blue-700' },
    ];

    return (
      <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-sm">
        {platforms.map(platform => followers[platform.name] && (
          <div key={platform.name} className="flex items-center gap-1.5">
            <i className={`${platform.icon} ${platform.color} text-base`}></i>
            <span className="text-gray-700 font-medium text-xs">{followers[platform.name]}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Daftar Key Opinion Leaders (KOL)</h1>

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

      {/* Kartu KOL */}
      {filteredKols.length === 0 ? (
        <p className="text-center text-gray-600 text-xl py-10 bg-white rounded-lg shadow-md">
          Tidak ada KOL dengan nama "{searchTerm}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Jarak disesuaikan agar terasa sedikit lebih kecil */}
          {filteredKols.map(kol => (
            <div
              key={kol.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative group flex flex-col cursor-pointer"
              onClick={() => openKolDetails(kol)} // Klik kartu membuka modal detail
            >
              <div className="w-full h-40 bg-gray-200 overflow-hidden flex items-center justify-center"> {/* Tinggi gambar sedikit lebih kecil */}
                <img
                  src={kol.image || `https://ui-avatars.com/api/?name=${kol.fullName.split(' ').join('+')}&background=random&color=fff&size=200`}
                  alt={kol.fullName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${kol.fullName.split(' ').join('+')}&background=random&color=fff&size=200`; }}
                />
                {/* Overlay untuk efek hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 text-center flex-grow flex flex-col justify-between"> {/* Padding disesuaikan */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1 truncate"> {/* Judul lebih kecil */}
                    {kol.fullName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 font-medium"> {/* Teks email lebih kecil */}
                    {kol.email}
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-0.5 rounded-full mb-4"> {/* Badge peran lebih kecil */}
                    {kol.idRole}
                  </span>
                </div>
                
                {/* Bagian Follower Media Sosial (Ringkasan) */}
                {kol.socialMediaFollowers && (
                  <div className="mt-3 pt-3 border-t border-gray-200"> {/* Margin/padding disesuaikan */}
                    <h3 className="text-base font-semibold text-gray-800 mb-2">Follower:</h3> {/* Judul lebih kecil */}
                    {renderSocialMediaFollowersSummary(kol.socialMediaFollowers)}
                  </div>
                )}

                {/* Tombol "Lihat Detail" memicu pembukaan modal */}
                <button
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm" // Tombol lebih kecil
                  onClick={(e) => { e.stopPropagation(); openKolDetails(kol); }} // Hentikan propagasi untuk mencegah klik kartu terpicu dua kali
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
          projects={projects} // Kirim data proyek mock
          onClose={closeKolDetails}
          onInviteKol={handleInviteKol}
        />
      )}
    </main>
  );
};

export default KolList;