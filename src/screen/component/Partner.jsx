import React from 'react';

const PartnerBrands = () => {
  const dummyLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s';

  const brands = [
    { name: 'Garnier', logo: dummyLogo },
    { name: 'Gojek', logo: dummyLogo },
    { name: 'Innisfree', logo: dummyLogo },
    { name: 'Kopi Kenangan', logo: dummyLogo },
    { name: 'Kredivo', logo: dummyLogo },
    { name: 'Nivea', logo: dummyLogo },
    { name: 'Shopee', logo: dummyLogo },
    { name: 'Tiket.com', logo: dummyLogo },
  ];

  return (
    <div className="bg-blue-600 py-10">
      <h2 className="text-center text-white text-xl font-medium mb-8">
        Brand yang Telah Bekerjasama
      </h2>
      <div className="flex flex-wrap justify-center gap-10 px-6">
        {brands.map((brand) => (
          <div key={brand.name} className="w-32 h-16 flex items-center justify-center bg-white rounded shadow-md">
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
