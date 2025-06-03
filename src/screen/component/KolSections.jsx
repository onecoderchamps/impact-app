import React from 'react';

const KolSection = () => {
  // Gambar dummy (sama untuk contoh sementara)
  const dummyImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s';

  return (
    <div className="py-16 px-4 md:px-16 bg-white text-center">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Penuhi Semua Kebutuhan KOL Anda</h2>
        <p className="text-gray-500">Bisa bikin, cek, dan bandingkan rate card KOL</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-indigo-700 font-semibold text-lg">
        <div>
          <span className="text-2xl">17.6M+</span>
          <div className="text-sm text-gray-600">KOL di Indonesia</div>
        </div>
        <div>
          <span className="text-2xl">87.275+</span>
          <div className="text-sm text-gray-600">KOL Telah Bergabung</div>
        </div>
        <div>
          <span className="text-2xl">85.793+</span>
          <div className="text-sm text-gray-600">KOL Create Rate Card</div>
        </div>
        <div>
          <span className="text-2xl">3.211+</span>
          <div className="text-sm text-gray-600">Brand Telah Bergabung</div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-8 md:flex-row justify-center items-start">
        {/* Card 1 - For KOL */}
        <div className="bg-indigo-50 p-6 rounded-xl w-full md:w-1/2 shadow-sm text-left">
          <span className="text-xs text-indigo-700 font-medium px-2 py-1 bg-indigo-100 rounded-full">For KOL</span>
          <h3 className="text-lg md:text-xl font-bold mt-3 mb-2">Buat Rate Card KOL Semudah Itu</h3>
          <p className="text-gray-600 text-sm mb-4">
            Nentuin harga rate card emang bikin pusing, apalagi kita lagi FYP. Rasanya kalo gak dinaikin rate cardnya bisa rugi dong. Jadi, tunggu apa lagi?
          </p>
          <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Buat Rate Cardmu Sekarang →</a>

          <div className="mt-6 flex justify-end">
            <img src={dummyImage} alt="KOL Woman" className="max-h-48 rounded-lg" />
          </div>
        </div>

        {/* Card 2 - For Brands */}
        <div className="bg-green-50 p-6 rounded-xl w-full md:w-1/2 shadow-sm text-left">
          <span className="text-xs text-green-700 font-medium px-2 py-1 bg-green-100 rounded-full">For Brands</span>
          <h3 className="text-lg md:text-xl font-bold mt-3 mb-2">Yuk Cek Rate Card KOL Kamu di Sini</h3>
          <p className="text-gray-600 text-sm mb-4">
            Rahasia biar kamu gak bayar KOL kemahalan dengan cara cek rate card KOL in bulk di KOL.ID
          </p>
          <a href="#" className="text-green-600 text-sm font-medium hover:underline">Cek Rate Cardnya di Sini →</a>

          <div className="mt-6 flex justify-end">
            <img src={dummyImage} alt="KOL Man" className="max-h-48 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolSection;
