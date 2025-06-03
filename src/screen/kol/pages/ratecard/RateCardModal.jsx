import React, { useState } from 'react';

const categories = {
  Instagram: ['Post', 'Story', 'Reels', 'Carousel'],
  TikTok: ['Video', 'Content Owning','Exclusivity for 1 Months'],
  YouTube: ['Host-Read Ad', 'Product Review', 'Product Placement','License'],
  Appearance: ['Spokeperson', 'Brand Ambassador','Attendance','Photoshoot','Videoshoot','Store Visit','Livestream'],
};

const RateCardModal = ({ onClose }) => {
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Rate Card</h2>

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
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">Add your rate to your public rate card. Please fill rate card numbers in your connected account. Rate below is excluding tax</label>
        </div>

        <div className="flex space-x-4 border-b mb-4">
          {Object.keys(categories).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 -mb-px text-sm font-medium border-b-2 transition ${
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
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log({ currency, rates });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateCardModal;
