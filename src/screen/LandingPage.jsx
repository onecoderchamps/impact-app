import React from 'react';
// Anda bisa menambahkan import untuk ikon atau gambar kustom di sini jika diperlukan
// Contoh: import { FaSearch, FaDollarSign, FaChartLine, FaTasks, FaBullseye, FaCreditCard } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <a href="/" className="text-3xl font-extrabold text-blue-700 animate-fade-in-down">
            Impact.<span className="text-purple-600">id</span>
          </a>
          <nav className="space-x-4 md:space-x-6 hidden md:flex items-center">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Fitur Kami</a>
            <a href="#marketplace" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Marketplace</a>
            <a href="#gallery" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Galeri Sukses</a>
            <a href="#brands" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Brand Partner</a>
            <a href="/login" className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition duration-300 font-semibold">Login</a>
            <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 font-semibold shadow-lg">Register</a>
          </nav>
          {/* Mobile menu button (tambahan, jika diperlukan untuk responsivitas penuh) */}
          <button className="md:hidden text-gray-700 text-2xl">
            ☰
          </button>
        </div>
      </header>

      {/* Hero/Banner Section */}
      <section className="bg-gradient-to-br from-blue-700 to-purple-700 text-white py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Tambahan: Pola latar belakang abstrak */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 drop-shadow-lg animate-fade-in-up">
            Maksimalkan <span className="text-yellow-300">Dampak</span> Bisnis Anda dengan <br/> Kolaborasi KOL Terbaik
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto opacity-95 animate-fade-in-up delay-200">
            **Impact.id** adalah platform terkemuka yang menghubungkan brand inovatif dengan Key Opinion Leaders (KOL) paling berpengaruh di Indonesia. Kami tak hanya memfasilitasi kolaborasi, tapi juga mengelola *invoicing* dan laporan performa secara akurat untuk **pertumbuhan terukur** Anda.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center animate-fade-in-up delay-400">
            <a href="/register" className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-4 rounded-full text-xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              Mulai Kolaborasi Sekarang!
            </a>
            <a href="#features" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-10 py-4 rounded-full text-xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              Pelajari Fitur Unggulan
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Detail */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">Fitur Unggulan Impact.id</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Fitur 1: Creator Discovery (Pencarian KOL Cerdas) */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <div className="text-6xl text-blue-600 mb-6">🔍</div> {/* Ikon bisa diganti */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pencarian KOL Cerdas & Seamless</h3>
              <p className="text-gray-600 text-lg">Temukan ribuan KOL berpengaruh dengan filter canggih: kategori, demografi audiens, tingkat *engagement*, dan performa historis. Pastikan kolaborasi Anda tepat sasaran.</p>
            </div>

            {/* Fitur 2: Campaign Management (Manajemen Kampanye Terpadu) */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <div className="text-6xl text-orange-600 mb-6">⚙️</div> {/* Ikon bisa diganti */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Manajemen Kampanye End-to-End</h3>
              <p className="text-gray-600 text-lg">Dari pembuatan brief hingga persetujuan konten, kelola seluruh proses kampanye KOL dengan mudah melalui satu *dashboard* terpusat. Hemat waktu dan tenaga Anda.</p>
            </div>

            {/* Fitur 3: Invoicing & Payment (Manajemen Keuangan Otomatis) */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <div className="text-6xl text-green-600 mb-6">💵</div> {/* Ikon bisa diganti */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Invoicing & Pembayaran Efisien</h3>
              <p className="text-gray-600 text-lg">Sistem *invoicing* dan pembayaran otomatis kami menghilangkan kerumitan administrasi. Lacak semua transaksi dan pastikan pembayaran KOL tepat waktu dan transparan.</p>
            </div>

            {/* Fitur 4: Performance Analytics (Laporan Performa Mendalam) */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <div className="text-6xl text-purple-600 mb-6">📈</div> {/* Ikon bisa diganti */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Laporan & Analitik Performa Akurat</h3>
              <p className="text-gray-600 text-lg">Dapatkan wawasan mendalam dengan laporan real-time tentang *reach*, *engagement*, konversi, dan ROI kampanye. Optimalkan strategi Anda berdasarkan data yang akurat.</p>
            </div>

            {/* Fitur 5: Performance-Based Pricing (Opsional, jika relevan) */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <div className="text-6xl text-yellow-600 mb-6">🎯</div> {/* Ikon bisa diganti */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Jaminan Hasil (Performance-Based)</h3>
              <p className="text-gray-600 text-lg">Dengan opsi harga berbasis performa (misalnya, berdasarkan *impression* atau konversi), Anda hanya membayar untuk hasil nyata yang dicapai. Investasi pemasaran yang lebih aman dan terukur.</p>
            </div>

            {/* Fitur 6: Dedicated Support / Managed Service (Opsional) */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <div className="text-6xl text-red-600 mb-6">✨</div> {/* Ikon bisa diganti */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Layanan Terkelola Penuh (Managed Service)</h3>
              <p className="text-gray-600 text-lg">Butuh bantuan ekstra? Tim ahli kami siap mendukung Anda dari riset pasar, strategi, hingga eksekusi dan optimasi kampanye untuk hasil maksimal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <hr className="border-t-2 border-gray-200 my-10 max-w-7xl mx-auto" />

      {/* KOL Marketplace Section (Optional, if you want to highlight this as a separate section) */}
      <section id="marketplace" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Jelajahi Creator Marketplace Impact.id</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
            Temukan talenta-talenta digital terbaik dari berbagai *niche*. Dengan *marketplace* kami, proses pencarian dan seleksi KOL menjadi lebih cepat, transparan, dan berdasarkan data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-start gap-4">
              <div className="text-4xl text-blue-500">🌟</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kurasi KOL Berkualitas</h3>
                <p className="text-gray-600">Akses daftar KOL yang telah terverifikasi dengan data performa yang transparan untuk setiap platform media sosial.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-start gap-4">
              <div className="text-4xl text-purple-500">⚡</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Proses Perekrutan Cepat</h3>
                <p className="text-gray-600">Mulai kampanye Anda dalam hitungan menit dengan *brief* yang terstruktur dan komunikasi langsung dengan KOL.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="/marketplace" className="bg-indigo-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-indigo-700 transition-colors duration-300 shadow-lg transform hover:scale-105 active:scale-95">
              Lihat Daftar KOL Kami
            </a>
          </div>
        </div>
      </section>

      {/* Separator */}
      <hr className="border-t-2 border-gray-200 my-10 max-w-7xl mx-auto" />

      {/* Brands Partner Section */}
      <section id="brands" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">Dipercaya Oleh Brand Ternama Indonesia</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Kami bangga menjadi mitra strategis bagi brand-brand terkemuka yang ingin memperluas jangkauan dan pengaruh mereka di pasar digital.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6 items-center justify-center max-w-7xl mx-auto">
            {/* Ganti dengan logo brand asli Anda */}
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Mode" alt="Brand Mode" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+FnB" alt="Brand F&B" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Tech" alt="Brand Tech" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Travel" alt="Brand Travel" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Otomotif" alt="Brand Otomotif" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Beauty" alt="Brand Beauty" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Edukasi" alt="Brand Edukasi" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Fintech" alt="Brand Fintech" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Sport" alt="Brand Sport" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
            <img src="https://via.placeholder.com/180x90/e0e0e0/ffffff?text=Brand+Health" alt="Brand Health" className="mx-auto w-36 md:w-44 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* Separator */}
      <hr className="border-t-2 border-gray-200 my-10 max-w-7xl mx-auto" />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">Galeri Kolaborasi Berdampak Kami</h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Lihat bagaimana Impact.id membantu brand dan KOL menciptakan kampanye yang tak hanya indah, tapi juga menghasilkan **hasil nyata**.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Ganti dengan gambar kolaborasi atau testimoni nyata */}
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl">
              <img src="https://via.placeholder.com/700x500?text=Campaign+Mode" alt="Kampanye Fashion" className="w-full h-72 object-cover object-center" />
              <div className="p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fashion Forward: Kolaborasi Gaya</h3>
                <p className="text-gray-600 text-base mb-3">Kolaborasi dengan KOL Fashion untuk peluncuran koleksi terbaru.</p>
                <p className="text-sm text-blue-600 font-semibold">"Peningkatan penjualan 25% dalam 1 bulan!" - Brand Mode XYZ</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl">
              <img src="https://via.placeholder.com/700x500?text=Campaign+Travel" alt="Kampanye Travel" className="w-full h-72 object-cover object-center" />
              <div className="p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Explore Indonesia: Destinasi Impian</h3>
                <p className="text-gray-600 text-base mb-3">Mempromosikan destinasi wisata eksotis bersama travel vlogger.</p>
                <p className="text-sm text-blue-600 font-semibold">"Reservasi meningkat signifikan setelah kampanye." - Agensi Pariwisata</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl">
              <img src="https://via.placeholder.com/700x500?text=Campaign+Tech" alt="Kampanye Teknologi" className="w-full h-72 object-cover object-center" />
              <div className="p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inovasi di Genggaman: Gadget Terbaru</h3>
                <p className="text-gray-600 text-base mb-3">Review dan unboxing produk teknologi oleh tech enthusiast terkemuka.</p>
                <p className="text-sm text-blue-600 font-semibold">"Jangkauan yang luar biasa dan konversi yang tinggi." - Perusahaan Gadget</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <a href="#" className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105 active:scale-95">
              Lihat Lebih Banyak Kisah Sukses
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) - Final */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight drop-shadow-lg">
            Siap Menciptakan <span className="text-yellow-300">Dampak</span> Nyata?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-95">
            Bergabunglah dengan Impact.id hari ini dan transformasikan strategi pemasaran Anda dengan kekuatan kolaborasi KOL yang terukur dan efisien.
          </p>
          <a href="/register" className="bg-white text-purple-700 hover:bg-gray-100 px-12 py-5 rounded-full text-2xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
            Daftar Gratis untuk Brand atau KOL!
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <a href="/" className="text-2xl font-extrabold text-blue-400 mb-4 md:mb-0">
              Impact.<span className="text-purple-400">id</span>
            </a>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Kebijakan Privasi</a>
              <a href="/term" className="text-gray-400 hover:text-white transition-colors duration-200">Syarat & Ketentuan</a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Hubungi Kami</a> */}
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">&copy; {new Date().getFullYear()} Impact.id. Semua Hak Dilindungi.</p>
        </div>
      </footer>

      {/* Tailwind CSS Custom Animations (optional, can be moved to index.css) */}
      <style>{`
        @keyframes fadeInFromBottom {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInFromTop {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInFromBottom 0.8s ease-out forwards;
        }
        .animate-fade-in-down {
          animation: fadeInFromTop 0.8s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        /* Background Pattern (example, you might use an actual SVG or image) */
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default LandingPage;