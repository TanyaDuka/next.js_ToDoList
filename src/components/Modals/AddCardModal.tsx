import React, { useState } from "react";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const validateForm = () => {
    let valid = true;
    let errors = { title: "", description: "" };

    if (title.trim() === "") {
      errors.title = "The name cannot be empty";
      valid = false;
    }

    if (description.trim() === "") {
      errors.description = "The description cannot be empty";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSave = () => {
    console.log(title, description);

    if (validateForm()) {
      onSave(title, description);
      onClose();
      setTitle("");
      setDescription("");
      setErrors({ title: "", description: "" });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            New Card
          </h3>
          <div className="mt-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 border mb-2 ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Task name"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Task description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
