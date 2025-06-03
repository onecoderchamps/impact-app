export default function BioModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit Bio</h3>
        <textarea rows={5} className="w-full p-2 border rounded" placeholder="Tell people about yourself..." />
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
}
