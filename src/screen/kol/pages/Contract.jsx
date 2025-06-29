import React, { useEffect, useState, useCallback } from 'react';
import { getData, putData } from '../../../api/service'; // Pastikan putData diimpor
import { format } from 'date-fns'; // Untuk format tanggal
import { id } from 'date-fns/locale'; // Untuk format tanggal Indonesia

// --- Helper function: formatDate ---
// Memformat string tanggal ke format Indonesia yang mudah dibaca.
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: id });
  } catch (e) {
    console.error("Invalid date string:", dateString, e);
    return 'Invalid Date';
  }
};

// --- Helper function: formatCurrency ---
// Memformat angka ke mata uang Rupiah Indonesia.
const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp0'; // Handle non-numeric or NaN input
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Komponen ContractSignModal ---
const ContractSignModal = ({ contract, onClose, onSignSuccess }) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignContract = async () => {
    if (!agreed) {
      alert('Anda harus menyetujui kontrak untuk melanjutkan.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Endpoint API untuk tanda tangan kontrak. Asumsi API memerlukan id kontrak
      // dan mengupdate statusnya. Sesuaikan payload dan endpoint jika berbeda.
      const payload = {
        id: contract._id, // Menggunakan _id dari objek kontrak
        isVerification: true, // Asumsi ini yang menandai kontrak sudah ditandatangani/diverifikasi
        // Anda mungkin perlu mengirim IdUser juga jika API membutuhkannya
        IdUser: contract.IdUser // Kirim IdUser yang ada di kontrak
      };

      const response = await putData("Campaign/Kontrak", payload); // Menggunakan putData untuk update

      if (response.code === 200) {
        alert('Kontrak berhasil ditandatangani!');
        onSignSuccess(contract._id, true); // Memberi tahu parent bahwa tanda tangan berhasil
        onClose();
      } else {
        setError(response.Error || 'Gagal menandatangani kontrak.');
      }
    } catch (err) {
      console.error('Error signing contract:', err);
      setError('Terjadi kesalahan saat menandatangani kontrak. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col relative overflow-hidden transform scale-95 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-4xl font-light leading-none z-10 transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="p-8 flex-grow flex flex-col overflow-hidden">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-blue-500 pb-3">
            Tanda Tangan Kontrak
          </h2>

          <div className="flex-grow overflow-y-auto custom-scrollbar p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 leading-relaxed mb-6">
            {/* Isi Kontrak - Ini adalah contoh statis. Anda perlu menggantinya dengan konten kontrak yang sebenarnya.
                Idealnya, konten kontrak diambil dari API atau dinamis berdasarkan `contract.IdCampaign` atau `contract._id`. */}
            <h3 className="text-xl font-bold mb-3">Perjanjian Kerjasama Influencer</h3>
            <p className="mb-2">Yang bertanda tangan di bawah ini:</p>
            <p className="ml-4 mb-2">Nama Brand: [Nama Brand]</p>
            <p className="ml-4 mb-2">Nama Influencer: {contract.IdUser || 'N/A'}</p> {/* Contoh: tampilkan ID user */}
            <p className="mb-4">Terkait dengan kampanye: {contract.IdCampaign || 'N/A'}</p> {/* Contoh: tampilkan ID campaign */}

            <p className="mb-4">Dengan ini menyatakan persetujuan terhadap ketentuan-ketentuan berikut:</p>

            <ol className="list-decimal list-inside space-y-2 mb-6">
              <li>Pihak Influencer akan mempromosikan produk/layanan sesuai arahan yang diberikan dalam kampanye `{contract.IdCampaign}`.</li>
              <li>Konten yang dibuat harus sesuai dengan pedoman yang telah disepakati dan mencerminkan nilai-nilai brand.</li>
              {/* Di sini, kita asumsikan contract memiliki properti 'harga' atau 'amount' yang relevan */}
              <li>Pembayaran akan dilakukan sebesar {formatCurrency(contract.HargaPekerjaan || 0)} setelah pekerjaan diselesaikan dan diverifikasi. (Sesuaikan ini dengan data harga campaign)</li>
              <li>Perjanjian ini berlaku sejak tanggal penandatanganan hingga berakhirnya periode kampanye pada `{formatDate(new Date())}`.</li> {/* Contoh tanggal saat ini */}
              <li>Kedua belah pihak setuju untuk menyelesaikan setiap perselisihan secara musyawarah mufakat.</li>
            </ol>

            <p className="text-sm italic text-gray-600">
              Dokumen ini dihasilkan secara otomatis. Dengan menekan tombol "Setuju dan Tanda Tangan Kontrak", Anda menyetujui semua ketentuan yang tertera di atas.
            </p>
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-md text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="agreeToContract"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="agreeToContract" className="ml-3 text-lg font-medium text-gray-900 cursor-pointer">
              Saya telah membaca dan menyetujui semua ketentuan kontrak ini.
            </label>
          </div>

          <button
            onClick={handleSignContract}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading || !agreed}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Setuju dan Tanda Tangan Kontrak
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Komponen ContractList ---
export default function ContractList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getData("Campaign/Kontrak"); // Endpoint API untuk daftar kontrak
      if (response.code === 200 && response.data) {
        setContracts(response.data);
      } else {
        setError(response.Error || 'Gagal mengambil daftar kontrak.');
      }
    } catch (err) {
      console.error('Error fetching contracts:', err);
      setError(err.message || 'Terjadi kesalahan saat mengambil daftar kontrak.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const openSignModal = (contract) => {
    setSelectedContract(contract);
    setIsSignModalOpen(true);
  };

  const closeSignModal = () => {
    setIsSignModalOpen(false);
    setSelectedContract(null);
  };

  const handleSignSuccess = (signedContractId, newVerificationStatus) => {
    // Perbarui status kontrak di daftar lokal setelah berhasil ditandatangani
    setContracts(prevContracts =>
      prevContracts.map(contract =>
        contract._id === signedContractId
          ? { ...contract, IsVerification: newVerificationStatus, Status: newVerificationStatus } // Asumsi IsVerification dan Status berubah
          : contract
      )
    );
    // Opsional: fetch ulang semua kontrak untuk memastikan data paling baru
    // fetchContracts();
  };

  if (loading) {
    return (
      <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Memuat daftar kontrak...</p>
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
        {contracts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Belum ada kontrak tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <div
                key={contract._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Menggunakan _id untuk menampilkan ID Kontrak */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Kontrak ID: {contract.id.substring(0, 8)}...</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">ID User:</span> {contract.IdUser || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">ID Campaign:</span> {contract.IdCampaign || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Dibuat:</span> {formatDate(contract.CreatedAt)}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      <span className="font-medium">Terakhir Diperbarui:</span> {contract.UpdatedAt ? formatDate(contract.UpdatedAt) : 'Belum pernah'}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>Status Aktif: <span className={`font-medium ${contract.IsActive ? 'text-green-600' : 'text-red-600'}`}>{contract.IsActive ? 'Aktif' : 'Tidak Aktif'}</span></span>
                      <span>Dibuat Oleh: <span className="font-medium text-gray-700">{contract.InviteBy || 'N/A'}</span></span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>Verifikasi:
                        {contract.IsVerification === true ? (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full ml-2">Terverifikasi</span>
                        ) : contract.IsVerification === false ? (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full ml-2">Ditolak</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full ml-2">Menunggu</span>
                        )}
                      </span>
                      <span>Status Kontrak:
                        {contract.Status === true ? (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full ml-2">Disetujui</span>
                        ) : contract.Status === false ? (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full ml-2">Ditolak</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full ml-2">Pending</span>
                        )}
                      </span>
                    </div>

                    {/* Tombol Tanda Tangan Kontrak */}
                    {contract.IsVerification !== true ? ( // Tampilkan jika belum diverifikasi
                      <button
                        onClick={() => openSignModal(contract)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm"
                      >
                        Tanda Tangan Kontrak
                      </button>
                    ) : (
                      <button
                        className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold cursor-not-allowed text-sm"
                        disabled
                      >
                        Kontrak Sudah Ditandatangani
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isSignModalOpen && selectedContract && (
        <ContractSignModal
          contract={selectedContract}
          onClose={closeSignModal}
          onSignSuccess={handleSignSuccess}
        />
      )}

      {/* Gaya Scrollbar Kustom dan Animasi */}
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
    </main>
  );
}