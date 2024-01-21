import { useState } from "react";
import Card from "@/components/Card/Card";
import { IBoard, ICard } from "@/types/apiBoard";
import AddCardModal from "@/components/Modals/AddCardModal";
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useUpdateCardPositionMutation,
} from "@/redux/slice/cardSlice";

interface ColumnProps {
  mainTitle: string;
  tasks: ICard[];
  boardId: string;
  refetch: () => void;
}

const Column: React.FC<ColumnProps> = ({
  mainTitle,
  tasks,
  boardId,
  refetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCard] = useCreateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useUpdateCardMutation();
  const [updateCardPosition] = useUpdateCardPositionMutation();

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveCard = async (newTitle: string, newDescription: string) => {
    try {
      await createCard({
        boardId,
        title: newTitle,
        description: newDescription,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("There was an error saving the card:", error);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await deleteCard({ boardId, cardId: id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting the card:", error);
    }
  };

  const handleEditStatusCard = async (
    cardId: string,
    title: string,
    description: string,
    newStatus: string
  ) => {
    try {
      await updateCard({
        boardId,
        cardId,
        title,
        description,
        newStatus,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting the card:", error);
    }
  };

  const handleDirectionClick = async (direction: string, cardId: string) => {
    console.log(direction, cardId);
    try {
      await updateCardPosition({ boardId, direction, cardId }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting the card:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData("text"));
    const { id, title, description } = dragData;

    handleEditStatusCard(id, title, description, mainTitle);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="column-class w-1/3 bg-white rounded-lg p-4 shadow"
    >
      <h2 className="text-xl font-bold mb-4 text-center">{mainTitle}</h2>

      {tasks.map((task, index) => (
        <Card
          key={index}
          id={task._id.toString()}
          title={task.title}
          description={task.description}
          onEdit={(newTitle, newDescription) => {
            handleEditStatusCard(
              task._id.toString(),
              newTitle,
              newDescription,
              mainTitle
            );
          }}
          onDelete={() => handleDeleteCard(task._id.toString())}
          onChangePosition={(direction, cardId) =>
            handleDirectionClick(direction, cardId)
          }
          draggable={true}
          onDragStart={(e) => {
            const dragData = JSON.stringify({
              id: task._id,
              title: task.title,
              description: task.description,
            });
            e.dataTransfer.setData("text", dragData);
          }}
          isFirst={index === 0}
          isLast={index === tasks.length - 1}
        />
      ))}

      {mainTitle === "ToDo" && (
        <button
          className="mt-4 p-2 w-full bg-blue-200 text-white-600 rounded-lg cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleAddClick}
        >
          +
        </button>
      )}
      <AddCardModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveCard}
      />
    </div>
  );
};

export default Column;
