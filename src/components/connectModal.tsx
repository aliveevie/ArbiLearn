import { useState } from 'react';

function ConnectWalletModal() {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-lg p-6 bg-white rounded-md shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-center text-2xl font-bold">
          Connect Wallet to Start Learning
        </h2>
      </div>
    </div>
  );
}

export default ConnectWalletModal;