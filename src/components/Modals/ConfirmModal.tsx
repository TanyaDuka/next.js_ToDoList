import React, { useEffect, useRef } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg cursor-pointer focus:outline-none"
        >
          &times;
        </button>
        <p>{message}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-grey-700"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
