import React from "react";

interface ButtonProps {
  label?: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    disabled:opacity-70 disabled:cursor-not-allowed
    rounded-full font-semibold hover:opacity-80 transition border-2 

    ${fullWidth ? "w-full text-white" : "w-fit"}
    ${
      secondary
        ? "btn btn-outline border-secondary"
        : "text-white border-secondary"
    }
    ${large ? "text-xl py-3 px-5" : "textarea-md  py-2 px-4"}
    ${outline ? "bg-transparent border-secondary text-white" : ""}
    ${outline ? "" : ""}
    ${outline ? "" : ""}
    `}
    >
      Post
    </button>
  );
};

export default Button;
