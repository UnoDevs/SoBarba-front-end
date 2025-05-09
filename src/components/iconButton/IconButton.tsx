<<<<<<< HEAD
import Button from "@/components/Button"; 
import { Pencil, Trash } from "lucide-react"; 


interface IconButtonProps {
  onClick: () => void;
  icon: "edit" | "delete";
  ariaLabel: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, ariaLabel }) => {
  const Icon = icon === "edit" ? Pencil : Trash;

  return (
    <Button onClick={onClick} ariaLabel={ariaLabel} variant="ghost" size="icon">
      <Icon className="h-5 w-5" />
    </Button>
=======
import styles from "./IconButton.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

interface IconButtonProps {
  onClick: () => void;
  // icon: "edit" | "delete";
  icon: React.ReactNode;
  ariaLabel: string;
}

const IconButton = ({ onClick, icon, ariaLabel }: IconButtonProps) => {
  const iconClass =
    icon === "edit"
      ? `${styles.iconButton} ${styles.editButton}`
      : `${styles.iconButton} ${styles.deleteButton}`;

  return (
    <button onClick={onClick} aria-label={ariaLabel} className={iconClass}>
      {icon === "edit" ? <FaEdit color="#007bff" /> : <FaTrash color="#dc3545" />}
    </button>
>>>>>>> origin/feature/ajustes-interface-cliente-funcionario
  );
};

export default IconButton;
<<<<<<< HEAD

=======
>>>>>>> origin/feature/ajustes-interface-cliente-funcionario
