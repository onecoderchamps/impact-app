import React, { useState, useEffect } from 'react';
import { getData, putData } from '../../../../api/service';
import { Trash2 } from 'lucide-react';

const baseCategories = {
  Instagram: ['Post', 'Story', 'Reels', 'Carousel'],
  TikTok: ['Video', 'Content Owning', 'Exclusivity for 1 Months'],
  YouTube: ['Host-Read Ad', 'Product Review', 'Product Placement', 'License'],
  Appearance: ['Spokeperson', 'Brand Ambassador', 'Attendance', 'Photoshoot', 'Videoshoot', 'Store Visit', 'Livestream'],
};

// Format number to 100.000 (string)
const formatNumber = (num) =>
  new Intl.NumberFormat('id-ID').format(num || 0);

// Remove formatting to get pure number
const unformatNumber = (value) =>
  Number(String(value).replace(/\D/g, ''));

const RateCardEditor = () => {
  const [activeTab, setActiveTab] = useState('Instagram');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState('IDR');
  const [loading, setLoading] = useState(true);
  const [appearanceTypes, setAppearanceTypes] = useState([]);
  const [newAppearance, setNewAppearance] = useState('');

  useEffect(() => {
    const fetchRateCard = async () => {
      try {
        const data = await getData('RateCard');
        setCurrency(data.data.currency || 'IDR');
        setRates(data.data.rates || {});

        const appearanceData = data.data.rates?.Appearance || {};
        setAppearanceTypes(Object.keys(appearanceData).length > 0
          ? Object.keys(appearanceData)
          : baseCategories.Appearance);
      } catch (error) {
        console.error('Failed to fetch rate card:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRateCard();
  }, []);

  const handleInputChange = (platform, type, value) => {
    const rawValue = unformatNumber(value);
    setRates((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [type]: rawValue,
      },
    }));
  };

  const handleAddAppearance = () => {
    const trimmed = newAppearance.trim();
    if (!trimmed || appearanceTypes.includes(trimmed)) return;
    setAppearanceTypes((prev) => [...prev, trimmed]);
    setRates((prev) => ({
      ...prev,
      Appearance: {
        ...prev.Appearance,
        [trimmed]: 0,
      },
    }));
    setNewAppearance('');
  };

  const handleDeleteAppearance = (type) => {
    setAppearanceTypes((prev) => prev.filter((item) => item !== type));
    setRates((prev) => {
      const updated = { ...prev.Appearance };
      delete updated[type];
      return {
        ...prev,
        Appearance: updated,
      };
    });
  };

  const updateData = async () => {
    const payload = {
      currency,
      rates,
    };

    try {
      await putData('RateCard', payload);
      alert('Rate card saved successfully!');
    } catch (error) {
      alert('Failed to save rate card.');
    }
  };

  const renderInputFields = () => {
    const types =
      activeTab === 'Appearance' ? appearanceTypes : baseCategories[activeTab];

    return types.map((type) => (
      <div key={type} className="flex items-center justify-between mb-3 gap-2">
        <label className="text-gray-700 flex-1">{type}</label>
        <input
          type="text"
          inputMode="numeric"
          className="border rounded px-3 py-1 w-40 text-right"
          value={formatNumber(rates[activeTab]?.[type])}
          onChange={(e) => handleInputChange(activeTab, type, e.target.value)}
        />
        {activeTab === 'Appearance' && (
          <button
            onClick={() => handleDeleteAppearance(type)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    ));
  };

  if (loading) {
    return <div className="text-center py-6">Loading rate card...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full border">
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
        {Object.keys(baseCategories).map((tab) => (
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

      <div className="mb-6">{renderInputFields()}</div>

      {activeTab === 'Appearance' && (
        <div className="mb-6 flex items-center gap-2">
          <input
            type="text"
            className="border rounded px-3 py-1 w-full"
            placeholder="Add new appearance type"
            value={newAppearance}
            onChange={(e) => setNewAppearance(e.target.value)}
          />
          <button
            onClick={handleAddAppearance}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={updateData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RateCardEditor;
