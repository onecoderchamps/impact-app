export default function SyncStatusModal({ status, onClose, isFinished }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-lg font-bold mb-4">Synchronization Status</h2>
        <pre className="text-sm text-gray-800 whitespace-pre-wrap">{status}</pre>

        {isFinished && (
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
