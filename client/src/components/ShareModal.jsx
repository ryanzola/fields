import { createPortal } from 'react-dom';
import useEscape from '../hooks/useEscape';

import facebook from '../assets/share-facebook.svg'
import x from '../assets/share-x.svg';
import linkedIn from '../assets/share-linkedin.svg';
import shareLink from '../assets/share-link.svg';

function ShareModal({ isOpen, onClose, postUrl }) {


  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        alert('Link copied to clipboard!: ' + postUrl);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        alert('Failed to copy link. Please try again.');
      });
  };

  const handleOpenPopup = (e) => {
    const url = e.currentTarget.dataset.url;
    if (!url) return;

    const w = 600;
    const h = 400;
    const left = (window.innerWidth - w) / 2;
    const top = (window.innerHeight - h) / 2;

    window.open(
      url,
      '_blank',
      `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };

  useEscape(onClose);

  return createPortal(
    isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-50 z-50" onClick={onClose}>
      <div className="relative bg-white p-6 rounded shadow-lg max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-bold mb-4 text-center">Share post</h2>
        <div className="grid grid-cols-4 items-center">
          <button 
            data-url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            onClick={handleOpenPopup}>
            <img src={facebook} alt="facebook" className="h-12 w-12 mx-auto" />
          </button>
          <button data-url={`https://x.com/intent/post?url=${encodeURIComponent(postUrl)}`} onClick={handleOpenPopup}>
            <img src={x} alt="Share on X" className="h-12 w-12 mx-auto" />
          </button>
          <button
            data-url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            onClick={handleOpenPopup}>
            <img src={linkedIn} alt="Share on LinkedIn" className="h-12 w-12 mx-auto" />
          </button>
          <button onClick={handleCopyLink} className="block w-full text-left">
            <img src={shareLink} alt="Share Link" className="h-12 w-12 mx-auto" />
          </button>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-gray-300">
          &times;
        </button>
      </div>
    </div>),
    document.body
  );
}

export default ShareModal;
