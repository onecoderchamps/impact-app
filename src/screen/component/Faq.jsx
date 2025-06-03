import React from 'react';

const KolFaqAndPromo = () => {
  return (
    <div className="px-4 md:px-16 py-20 bg-white text-center">
      {/* FAQ Section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-12">Let’s get things cleared up</h2>
      
      <div className="max-w-3xl mx-auto text-left space-y-10">
        {/* FAQ Item 1 */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800 mb-2">Apa itu KOL.ID ?</h3>
          <p className="text-gray-600 text-sm">
            KOL.ID adalah platform teknologi pemasaran pertama di Indonesia yang memanfaatkan kecerdasan buatan (AI)
            untuk mendukung kolaborasi antara Key Opinion Leaders (KOL) dan bisnis. Platform ini menyediakan solusi lengkap
            untuk kebutuhan pemasaran di Instagram, TikTok, dan YouTube, semuanya terintegrasi dalam satu tempat. <br /><br />
            Salah satu fitur utama KOL.ID adalah pembuatan rate card otomatis bagi para KOL. Dengan menggunakan data real-time
            dari berbagai platform media sosial, KOL.ID membantu KOL menentukan harga layanan mereka secara akurat dan adil,
            sehingga mereka dapat fokus pada kreativitas dan peningkatan engagement. <br /><br />
            Selain itu, KOL.ID menawarkan berbagai alat analisis, seperti kalkulator engagement rate untuk TikTok, Instagram,
            dan YouTube, yang membantu KOL dan bisnis memahami performa akun media sosial dan membuat keputusan yang lebih
            baik dalam kampanye pemasaran. <br /><br />
            KOL.ID juga berperan dalam mendukung perkembangan profesi KOL di Indonesia dengan menyediakan program pelatihan
            dan kelas untuk menjadi KOL sukses, yang dilatih langsung oleh KOL atau content creator ternama. <br /><br />
            Dengan berbagai fitur dan layanan yang ditawarkan, KOL.ID menjadi platform yang andal bagi KOL dan bisnis dalam
            menjalankan kampanye pemasaran yang efektif dan efisien.
          </p>
        </div>

        {/* FAQ Item 2 */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800">Apa saja Fitur yang disediakan oleh KOL.ID ?</h3>
          {/* Bisa tambahkan konten tambahan di sini */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 bg-blue-600 text-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
        <div className="text-left max-w-md">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight">
            Empower your brand's <br /> growth journey with KOL.ID
          </h3>
          <p className="text-sm mb-6">
            Equip yourself with an all-inclusive suite of tools for initiating and expanding influencer marketing campaigns.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm px-6 py-2 rounded shadow">
            Try KOL.ID for Free
          </button>
        </div>
        <div className="relative">
          <img src="/images/kol-promo.png" alt="KOL.ID Promo" className="h-56 md:h-64 rounded-lg" />
          {/* Tambahkan box followers, reach, avg likes dll sebagai overlay jika dibutuhkan */}
        </div>
      </div>

      {/* Rating */}
      <div className="mt-16">
        <p className="text-gray-800 text-sm mb-2">How helpful was this content?</p>
        <p className="text-gray-500 text-xs mb-4">Click on a star below to rate our tool out of 5 stars</p>
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl cursor-pointer">★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KolFaqAndPromo;
