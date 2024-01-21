"use client";
import { useState } from "react";
import EditCardModal from "@/components/Modals/EditModalForCard";
import ConfirmationModal from "../Modals/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  id: string;
  title: string;
  description: string;
  onEdit: (newTitle: string, newDescription: string) => void;
  onDelete: (id: string) => void;
  onChangePosition: (direction: "up" | "down", id: string) => void;
  draggable: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  isFirst: boolean;
  isLast: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  onEdit,
  onDelete,
  draggable,
  onDragStart,
  onChangePosition,
  isFirst,
  isLast,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    onDelete(id);
    setIsConfirmModalOpen(false);
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow mb-4 break-words cursor-pointer"
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-black">{title}</h3>
        <div>
          {!isFirst && (
            <span
              className="p-2 bg-gray-300 rounded cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => onChangePosition("up", id)}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          )}
          {!isLast && (
            <span
              className="p-2 ml-4 bg-gray-300 rounded cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => onChangePosition("down", id)}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600">{description}</p>
      <div className="flex space-x-2 mt-2 justify-end">
        <span
          className="p-2 bg-green-500 rounded-lg text-white mr-2 cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleEditClick}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <span
          className="p-2 bg-red-500 rounded-lg text-white mr-2 cursor-pointer hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleDeleteClick}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
      <EditCardModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSave={(newTitle, newDescription) => {
          onEdit(newTitle, newDescription);
        }}
        currentTitle={title}
        currentDescription={description}
      />
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this card?"
      />
    </div>
  );
};

export default Card;
