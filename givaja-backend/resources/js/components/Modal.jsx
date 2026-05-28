export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          style={{ color: 'var(--gray-500)' }}
          className="absolute top-3 right-3 hover:opacity-80 text-2xl font-bold w-8 h-8 flex items-center justify-center"
        >
          ✗
        </button>

        {title && <h2 style={{ color: 'var(--text-dark)' }} className="text-2xl font-bold mb-4 pr-8">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
