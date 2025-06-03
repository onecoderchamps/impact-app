import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import HeaderBar from './component/Header';
import KolFooter from './component/Footer';

function HomeScreen() {
    const [index, setIndex] = useState(0);
    const words = ['Brand', 'Agensi'];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-white" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            <HeaderBar />
            <section className="py-10 px-6 flex flex-col md:flex-row items-center max-w-7xl mx-auto">
                <div className="text-section mb-8 md:mb-0 md:mr-10 w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-black text-black leading-snug">
                        Operasional Influencer <br /> untuk <br />
                        <span className="relative inline-block text-blue-600">
                            <span key={index} className="block transition-all duration-700 ease-in-out transform translate-y-2">
                                {words[index]}
                            </span>
                        </span>
                    </h1>
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto md:mx-0">
                        Slice adalah platform influencer yang menyederhanakan <br />
                        <span className="text-blue-600 font-medium">
                            pembayaran, pajak, kontrak, dan pelaporan
                        </span> untuk pemasaran influencer.
                    </p>
                    <div className="mt-6">
                        <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg inline-block">
                            Mulai Sekarang
                        </a>
                    </div>
                    <div className="mt-4">
                        <a href="#" className="text-blue-600 font-medium underline">
                            Kamu seorang kreator konten? Klik di sini ↗
                        </a>
                    </div>
                </div>
                <div className="image-section w-full md:w-1/2 flex justify-center">
                    <img src="/img1.png" alt="Ilustrasi" style={{ width: 500, height: 'auto' }} />
                </div>
            </section>

            <section className="w-full bg-gray-50 py-10 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center mb-8">
                    <p className="text-xl font-semibold text-gray-900">
                        Kami telah bekerja sama dengan brand global, agensi ternama, startup teknologi, dan banyak lagi.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Fade kiri-kanan */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-50 via-transparent to-gray-50 z-10 pointer-events-none" />

                    {/* Wrapper konten marquee */}
                    <div className="overflow-hidden w-full py-4">
                        <div className="flex animate-marquee whitespace-nowrap">
                            {[...Array(2)].map((_, i) => (
                                // Semua image langsung dalam flex utama
                                <React.Fragment key={i}>
                                    <img src="/logokrona.png" alt="Ion Water" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="Koinworks" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logokrona.png" alt="Virallo" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="1" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logokrona.png" alt="2" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="3" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logokrona.png" alt="4" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="5" width={120} height={40} className="object-contain mx-8" />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>


                </div>

            </section>



            <section className="relative py-24 px-6 md:px-16 overflow-hidden bg-gradient-to-br from-[#EEF4FF] to-[#D6E6FF]">
                <div className="absolute w-[500px] h-[500px] bg-[#7AB6FF] opacity-30 rounded-full blur-[150px] top-[-100px] left-[-100px] -z-10" />
                <div className="absolute w-[400px] h-[400px] bg-[#A2CFFF] opacity-40 rounded-full blur-[120px] bottom-[-100px] right-[-100px] -z-10" />

                <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
                    <div className="text-section mb-8 md:mb-0 md:mr-10 w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-xl md:text-4xl font-black text-black leading-snug">
                            Bayar Kreator Secara Massal
                        </h1>
                        <p className="text-sm text-gray-600 mt-4 max-w-xl mx-auto md:mx-0">
                            Membayar kreator konten memakan waktu. Kamu harus melacak kontrak, dokumen pajak, dan menghitung pajak sebelum mengirim satu per satu. Slice menyederhanakan semua proses ini dengan pembayaran massal.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="text-blue-600 font-black inline-flex items-center gap-1">
                                Coba Sekarang <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="image-section w-full md:w-1/2 flex justify-center">
                        <img src="/img2.png" alt="Ilustrasi" width={500} height={500} className="object-contain max-w-full h-auto" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto pt-16">
                    <div className="image-section w-full md:w-1/2 flex justify-center pr-5">
                        <img src="/img3.png" alt="Ilustrasi" width={500} height={500} className="object-contain max-w-full h-auto" />
                    </div>
                    <div className="text-section mb-8 md:mb-0 md:mr-10 w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-xl md:text-4xl font-black text-black leading-snug">
                            Hitung Kewajiban Pajak
                        </h1>
                        <p className="text-sm text-gray-600 mt-4 max-w-xl mx-auto md:mx-0">
                            Melacak berapa banyak yang telah kamu bayar ke setiap kreator dan berapa tarif pajaknya akan membuat tim keuangan kewalahan. Slice secara otomatis menghitung kewajiban pajak untuk setiap pembayaran dan menyimpan catatan untuk semua pihak.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="text-blue-600 font-black inline-flex items-center gap-1">
                                Pelajari Lebih Lanjut <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto pt-20">
                    <div className="text-section mb-8 md:mb-0 md:mr-10 w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-xl md:text-4xl font-black text-black leading-snug">
                            Buat Laporan Terverifikasi Secara Instan
                        </h1>
                        <p className="text-sm text-gray-600 mt-4 max-w-xl mx-auto md:mx-0">
                            Laporan Slice memungkinkan kamu membuat laporan Instagram, TikTok, dan YouTube dalam satu laporan gabungan. Data laporan dapat dibuat dari API atau link influencer. Cocok saat kamu bekerja dengan makro & mikro influencer.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="text-blue-600 font-black inline-flex items-center gap-1">
                                Mulai Buat Laporan <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="image-section w-full md:w-1/2 flex justify-center">
                        <img src="/img4.png" alt="Ilustrasi" width={500} height={500} className="object-contain max-w-full h-auto" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto pt-20">
                    <div className="image-section w-full md:w-1/2 flex justify-center pr-5">
                        <img src="/img5.png" alt="Ilustrasi" width={500} height={500} className="object-contain max-w-full h-auto" />
                    </div>
                    <div className="text-section mb-8 md:mb-0 md:mr-10 w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-xl md:text-4xl font-black text-black leading-snug">
                            Kelola Hubungan dengan Kreator
                        </h1>
                        <p className="text-sm text-gray-600 mt-4 max-w-xl mx-auto md:mx-0">
                            Bangun hubungan dengan tiap kreator. Slice CRM melacak performa sebelumnya, harga, KYC, dan info pajak tiap kreator. Tambahkan catatan agar semua tim sepaham.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="text-blue-600 font-black inline-flex items-center gap-1">
                                Daftar Sekarang <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gray-50 py-10 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center mb-8">
                    <p className="text-xl font-semibold text-gray-900">
                        Kami telah bekerja sama dengan brand global, agensi ternama, startup teknologi, dan banyak lagi.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Fade kiri-kanan */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-50 via-transparent to-gray-50 z-10 pointer-events-none" />

                    {/* Wrapper konten marquee */}
                    <div className="overflow-hidden w-full py-4">
                        <div className="flex animate-marquee whitespace-nowrap">
                            {[...Array(2)].map((_, i) => (
                                // Semua image langsung dalam flex utama
                                <React.Fragment key={i}>
                                    <img src="/logokrona.png" alt="Ion Water" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="Koinworks" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logokrona.png" alt="Virallo" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="1" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logokrona.png" alt="2" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="3" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logokrona.png" alt="4" width={120} height={40} className="object-contain mx-8" />
                                    <img src="/logo2.png" alt="5" width={120} height={40} className="object-contain mx-8" />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col md:flex-row items-center max-w-7xl mx-auto bg-blue-900">
                <div className="image-section w-full md:w-1/2 flex justify-center">
                    <img src="/img6.png" alt="Ilustrasi" width={900} height={500} className="object-contain max-w-full h-auto" />
                </div>
                <div className="text-section mb-8 md:mb-0 md:mr-10 w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-sm md:text-5xl text-white leading-snug pl-5">
                        Hemat waktu dengan menyederhanakan pembayaran influencer manual.
                    </h1>
                    <p className="text-white mt-4 max-w-xl mx-auto md:mx-0 pl-5">
                        Kirim dan lacak pembayaran influencer dengan mudah.
                    </p>
                    <div className="mt-6 pl-5">
                        <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg inline-block">
                            Mulai Sekarang
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <KolFooter />
            </section>
        </main>
    );
}

export default HomeScreen;