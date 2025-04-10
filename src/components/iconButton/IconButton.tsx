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
  );
};

export default IconButton;
