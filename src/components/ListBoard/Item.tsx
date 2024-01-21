import Link from "next/link";
import s from "./ListBoard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ListItemProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ id, title, onDelete, onEdit }) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow mb-2 cursor-pointer">
      <Link href={`/${id}`} className={s.link}>
        <p className="font-medium">{title}</p>
      </Link>
      <button
        onClick={onEdit}
        className="p-2 bg-green-500 rounded-lg text-white mr-2 cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 bg-red-500 rounded-lg text-white mr-2 cursor-pointer hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ListItem;
