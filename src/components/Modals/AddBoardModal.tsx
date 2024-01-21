import { IBoard } from "@/types/apiBoard";
import React, { useState, MouseEvent } from "react";

interface ModalProps {
  onClose: () => void;
  onSave: (title: string) => void;
  items: IBoard[] | undefined;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave, items }) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    if (!title) {
      setError("Please enter a board name");
      return;
    }
    if (items?.some((item) => item.name === title)) {
      setError("A board with that name already exists");
      return;
    }
    setError("");
    onSave(title);
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={stopPropagation}
      >
        <div className="flex justify-end">
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            New board
          </h3>
          <div className="mt-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 border ${error ? "border-red-500" : ""}`}
              placeholder="Enter a name for the board"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
