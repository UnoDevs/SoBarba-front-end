import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  ariaLabel: string;
  variant?: "ghost" | "filled";
  size?: "icon" | "small" | "large";
  children: ReactNode;  // Adicionando children do tipo ReactNode
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
