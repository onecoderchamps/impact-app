import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Syarat & Ketentuan Penggunaan</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <section>
          <p className="text-sm text-gray-500 mb-2">Terakhir Diperbarui: 7 September 2025</p>
          <p>
            Selamat datang di Impact.id. Dengan mengakses atau menggunakan situs web dan layanan kami ("Layanan"), Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan semua syarat, jangan gunakan Layanan kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Deskripsi Layanan</h2>
          <p>
            Impact.id adalah platform yang menyediakan alat analitik dan manajemen bagi pembuat konten untuk melacak kinerja mereka di berbagai platform media sosial. Layanan ini mencakup dashboard analitik, alat pelaporan, dan fitur lain yang mungkin kami tambahkan dari waktu ke waktu.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Akun Pengguna</h2>
          <p>
            Untuk menggunakan Layanan kami, Anda harus mendaftar dan membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi Anda dan untuk semua aktivitas yang terjadi di bawah akun Anda. Anda setuju untuk segera memberitahu kami tentang setiap penggunaan akun yang tidak sah.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Hak Kekayaan Intelektual</h2>
          <p>
            Semua konten, logo, desain, dan fitur di Layanan adalah milik Impact.id atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta dan merek dagang. Anda tidak boleh mereproduksi, mendistribusikan, memodifikasi, atau membuat karya turunan dari Layanan kami tanpa izin tertulis dari kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Batasan Penggunaan</h2>
          <p>
            Anda setuju untuk tidak:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>Menggunakan Layanan untuk tujuan ilegal atau yang melanggar hukum.</li>
            <li>Mengganggu, merusak, atau menyabotase fungsionalitas Layanan.</li>
            <li>Mencoba mendapatkan akses tidak sah ke sistem kami atau akun pengguna lain.</li>
            <li>Menggunakan Layanan untuk mengirim spam atau materi yang tidak diinginkan.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Penafian Jaminan</h2>
          <p>
            Layanan kami disediakan "sebagaimana adanya" dan "sebagaimana tersedia". Kami tidak membuat jaminan, baik tersurat maupun tersirat, mengenai keandalan, akurasi, atau ketersediaan Layanan. Kami tidak menjamin bahwa Layanan akan bebas dari kesalahan atau bahwa cacat akan diperbaiki.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Batasan Tanggung Jawab</h2>
          <p>
            Sejauh diizinkan oleh hukum, Impact.id tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan Layanan kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Perubahan pada Syarat & Ketentuan</h2>
          <p>
            Kami berhak untuk mengubah Syarat & Ketentuan ini kapan saja. Kami akan memberitahu Anda tentang perubahan signifikan dengan mempostingnya di situs web kami. Penggunaan Layanan Anda secara terus-menerus setelah perubahan berarti Anda menerima syarat-syarat yang telah direvisi.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Hukum yang Berlaku</h2>
          <p>
            Syarat & Ketentuan ini diatur oleh hukum Republik Indonesia, tanpa memperhatikan pertentangan ketentuan hukum.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di:
            <br />
            Email: <a href="mailto:contact@impact.id" className="text-blue-600 hover:underline">contact@impact.id</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;