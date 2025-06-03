export default function SocialMediaModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Connect Social Media</h3>
        <div className="space-y-3">
          <button className="w-full bg-gray-100 p-2 rounded hover:bg-gray-200">Connect TikTok</button>
          <button className="w-full bg-gray-100 p-2 rounded hover:bg-gray-200">Connect Instagram</button>
          <button className="w-full bg-gray-100 p-2 rounded hover:bg-gray-200">Connect YouTube</button>
        </div>
        <button onClick={onClose} className="mt-4 text-sm text-blue-500">Close</button>
      </div>
    </div>
  );
}
