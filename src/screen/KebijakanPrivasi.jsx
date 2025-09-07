import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Kebijakan Privasi</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <section>
          <p className="text-sm text-gray-500 mb-2">Terakhir Diperbarui: 7 September 2025</p>
          <p>
            Selamat datang di Impact.id. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda bagikan dengan kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Komitmen Kami terhadap Keamanan Data</h2>
          <p>
            Kami mengambil langkah-langkah serius untuk memastikan bahwa semua data yang kami tangani, termasuk data pribadi pengguna dan data kinerja kampanye, tetap aman dan rahasia. Kami berkomitmen untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>
              <strong>Enkripsi Data:</strong> Semua data sensitif, baik saat transit maupun saat disimpan, dienkripsi menggunakan protokol keamanan standar industri (seperti SSL/TLS).
            </li>
            <li>
              <strong>Akses Terbatas:</strong> Akses ke data pribadi sangat dibatasi hanya untuk personel yang berwenang, yang telah dilatih dalam praktik keamanan data.
            </li>
            <li>
              <strong>Infrastruktur Aman:</strong> Kami menggunakan infrastruktur hosting yang aman dan terkemuka yang mematuhi standar keamanan internasional.
            </li>
            <li>
              <strong>Pengujian Keamanan:</strong> Kami secara rutin melakukan audit dan pengujian keamanan untuk mengidentifikasi dan memperbaiki potensi kerentanan.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Pengumpulan Informasi</h2>
          <p>
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, serta informasi yang kami peroleh secara otomatis saat Anda menggunakan Layanan kami.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>
              <strong>Data Pribadi:</strong> Informasi seperti nama, alamat email, dan nomor telepon yang Anda berikan saat mendaftar.
            </li>
            <li>
              <strong>Data Kinerja:</strong> Informasi yang Anda izinkan untuk kami akses dari platform media sosial pihak ketiga (seperti YouTube, TikTok, dll.) untuk menampilkan kinerja Anda di dashboard kami. Data ini hanya digunakan untuk tujuan analitik dan tidak dibagikan dengan pihak lain tanpa persetujuan eksplisit Anda.
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Penggunaan Informasi</h2>
          <p>
            Kami menggunakan informasi yang kami kumpulkan untuk:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>Menyediakan dan memelihara Layanan kami.</li>
            <li>Meningkatkan, mempersonalisasi, dan memperluas Layanan kami.</li>
            <li>Memahami dan menganalisis bagaimana Anda menggunakan Layanan kami.</li>
            <li>Mengembangkan produk, layanan, fitur, dan fungsionalitas baru.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Pengungkapan Informasi</h2>
          <p>
            Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya dapat mengungkapkan informasi Anda kepada:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>Penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan Layanan, yang terikat oleh perjanjian kerahasiaan.</li>
            <li>Pihak berwenang jika diwajibkan oleh hukum.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Keamanan Data</h2>
          <p>
            Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan data pribadi Anda. Namun, tidak ada metode transmisi atau penyimpanan elektronik yang 100% aman. Kami tidak dapat menjamin keamanan mutlak dari informasi Anda.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Perubahan Kebijakan Privasi</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang setiap perubahan dengan memposting Kebijakan Privasi yang baru di halaman ini. Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:
            <br />
            Email: <a href="mailto:privacy@impact.id" className="text-blue-600 hover:underline">privacy@impact.id</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;