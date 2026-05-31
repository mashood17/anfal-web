export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm mx-4">
        <p className="text-white text-sm">{message}</p>
        <div className="flex gap-3 mt-5 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 
                       text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}