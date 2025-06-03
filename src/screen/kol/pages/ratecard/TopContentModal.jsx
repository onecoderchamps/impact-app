import { useState } from 'react';

export default function TopContentModal({ onClose }) {
  const [entries, setEntries] = useState([{ url: "", views: "" }]);

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => setEntries([...entries, { url: "", views: "" }]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Top Performing Content</h3>
        {entries.map((entry, i) => (
          <div key={i} className="mb-3">
            <input
              type="text"
              placeholder="URL"
              className="w-full mb-1 p-2 border rounded"
              value={entry.url}
              onChange={(e) => updateEntry(i, "url", e.target.value)}
            />
            <input
              type="number"
              placeholder="Views"
              className="w-full p-2 border rounded"
              value={entry.views}
              onChange={(e) => updateEntry(i, "views", e.target.value)}
            />
          </div>
        ))}
        <button onClick={addEntry} className="text-blue-600 text-sm">+ Add Another</button>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
}
