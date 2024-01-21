"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import ListItem from "./Item";
import { IBoard } from "@/types/apiBoard";
import Modal from "@/components/Modals/AddBoardModal";
import ConfirmationModal from "@/components/Modals/ConfirmModal";
import EditModal from "@/components/Modals/EditModal";
import {
  useDeleteBoardMutation,
  useFetchBoardsQuery,
  useSearchBoardsQuery,
  useUpdateBoardTitleMutation,
  useCreateBoardMutation,
} from "@/redux/slice/boardSlice";

const ListBoard: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);

  const { data: boards, isLoading, error } = useFetchBoardsQuery();
  const { data: searchResults, isFetching: isSearchLoading } =
    useSearchBoardsQuery({ searchText }, { skip: !searchText });
  const displayedBoards = searchText ? searchResults : boards;

  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoardTitle] = useUpdateBoardTitleMutation();
  const [createBoard] = useCreateBoardMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBoard({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete the board:", error);
    }
  };

  const handleEdit = async (newTitle: string) => {
    if (currentBoard) {
      try {
        await updateBoardTitle({
          id: currentBoard.hashedId,
          newName: newTitle,
        }).unwrap();
      } catch (error) {
        console.error("Failed to update the board title:", error);
      }
    }
  };

  const saveNewTitle = (newTitle: string) => {
    handleEdit(newTitle);
    setIsEditModalOpen(false);
  };

  const confirmDeletion = async () => {
    if (boardToDelete) {
      await handleDelete(boardToDelete);
      setIsConfirmationModalOpen(false);
      setBoardToDelete(null);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleCreateBoard = async (name: string) => {
    try {
      await createBoard({ name }).unwrap();
    } catch (error) {
      console.error("Failed to create the board:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header onSearch={handleSearch} />

      {isLoading || isSearchLoading ? <p>Loading...</p> : null}
      {error ? (
        <p>
          Download error: {"status" in error ? error.status : "Unknown error"}
        </p>
      ) : null}

      {displayedBoards?.data ? (
        <div>
          {[...displayedBoards.data].reverse().map((board) => (
            <ListItem
              key={board.hashedId}
              id={board.hashedId}
              title={board.name}
              onDelete={() => {
                setBoardToDelete(board.hashedId);
                setIsConfirmationModalOpen(true);
              }}
              onEdit={() => {
                setCurrentBoard(board);
                setIsEditModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Create new board
        </button>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          items={displayedBoards?.data}
          onSave={(name) => {
            handleCreateBoard(name);
            setIsModalOpen(false);
          }}
        />
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={confirmDeletion}
          message="Are you sure you want to delete this board?"
        />
      )}

      {isEditModalOpen && currentBoard && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={saveNewTitle}
          currentTitle={currentBoard.name}
        />
      )}
    </div>
  );
};

export default ListBoard;
