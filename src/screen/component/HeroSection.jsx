import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-[#F7F8FC] py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Kiri - Text */}
        <div className="max-w-xl">
          <span className="text-[#5A5FEF] bg-[#E8EAFE] px-4 py-1 rounded-full text-sm font-semibold">
            Kamu KOL?
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-[#2B2C34] leading-tight">
            Buat Rate Card, <br />
            <span className="relative text-[#5A5FEF] inline-block">
              Make It Easy With AI
              <span className="absolute left-0 -bottom-1 w-full h-2 bg-yellow-300 opacity-80 -z-10 rounded-full"></span>
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-base leading-relaxed">
            Nentuin harga rate card emang bikin pusing. Riset KOL.ID menemukan
            250.000+ KOL pasang rate terlalu murah dan 100.000+ KOL pasang rate
            terlalu mahal. So, nunggu apa lagi?
          </p>

          <button className="mt-8 px-6 py-3 flex items-center gap-2 text-white bg-[#5A5FEF] hover:bg-[#4447dd] text-base rounded-xl">
            Buat Rate Card Sekarang!
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Kanan - Gambar */}
        <div className="max-w-xl w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
            alt="Hero Visual"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
