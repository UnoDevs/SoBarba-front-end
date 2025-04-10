import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
  onClick: () => void;
  ariaLabel: string;
  variant?: "ghost" | "filled";
  size?: "icon" | "small" | "large";
  children: ReactNode;  // Adicionando children do tipo ReactNode
  className?: string; // <-- Adicione essa linha
}

const Button: React.FC<ButtonProps> = ({ onClick, ariaLabel, variant = "filled", size = "small", children }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn ${variant} ${size}`}
    >
      {children}
    </button>
  );
};

export default Button;
