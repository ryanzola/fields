import { createPortal } from 'react-dom';

function ShareModal({ isOpen, onClose, postUrl }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Share this post</h2>
        <p className="mb-4">Share this post with your friends!</p>
        <div className="space-y-2">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
            Share on Facebook
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
            Share on Twitter
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="block text-blue-700 hover:underline">
            Share on LinkedIn
          </a>
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default ShareModal;
