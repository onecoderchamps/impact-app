import React, { useState } from 'react';

const categories = {
  Instagram: ['Post', 'Story', 'Reels', 'Carousel'],
  TikTok: ['Video', 'Content Owning','Exclusivity for 1 Months'],
  YouTube: ['Host-Read Ad', 'Product Review', 'Product Placement','License'],
  Appearance: ['Spokeperson', 'Brand Ambassador','Attendance','Photoshoot','Videoshoot','Store Visit','Livestream'],
};

const RateCardEditor = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('Instagram');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState('IDR');

  const handleInputChange = (platform, type, value) => {
    setRates(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [type]: value,
      },
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full ">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="IDR">IDR</option>
          <option value="USD">USD</option>
        </select>
        <p className="text-sm text-gray-600 mt-4">
          Add your rate to your public rate card. Please fill rate card numbers in your connected account. Rate below is excluding tax.
        </p>
      </div>

      <div className="flex space-x-4 border-b mb-4 overflow-x-auto">
        {Object.keys(categories).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 -mb-px text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-6">
        {categories[activeTab].map((type) => (
          <div key={type} className="flex items-center justify-between mb-3">
            <label className="text-gray-700">{type}</label>
            <input
              type="number"
              className="border rounded px-3 py-1 w-40"
              value={rates[activeTab]?.[type] || ''}
              onChange={(e) => handleInputChange(activeTab, type, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            if (onSave) onSave({ currency, rates });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RateCardEditor;
