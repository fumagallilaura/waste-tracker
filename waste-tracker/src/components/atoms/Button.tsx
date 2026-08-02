import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50";
  
  const variants = {
    primary: "bg-verde-esmeralda text-branco-puro hover:bg-verde-esmeralda/90",
    secondary: "bg-azul-marinho text-branco-puro hover:bg-azul-marinho/90",
    danger: "bg-vermelho-alerta text-branco-puro hover:bg-vermelho-alerta/90",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};