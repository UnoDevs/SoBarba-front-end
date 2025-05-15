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
  );
};

export default IconButton;

