import { useState, useEffect } from "react";

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTitle: string, newDescription: string) => void;
  currentTitle: string;
  currentDescription: string;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentTitle,
  currentDescription,
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newDescription, setNewDescription] = useState(currentDescription);
  const [error, setError] = useState("");

  useEffect(() => {
    setNewTitle(currentTitle);
    setNewDescription(currentDescription);
  }, [currentTitle, currentDescription]);

  const handleSave = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      setError("The name and description cannot be empty");
      return;
    }
    onSave(newTitle, newDescription);
    onClose();
  };

  const handleModalContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // This stops the click from reaching the overlay
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={handleModalContentClick}
      >
        <div className="flex justify-end">
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Редагувати картку
          </h3>
          <div className="mt-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={`w-full p-2 mb-4 border ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Введіть назву картки"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className={`w-full p-2 border ${error ? "border-red-500" : ""}`}
              placeholder="Введіть опис картки"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Зберегти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
