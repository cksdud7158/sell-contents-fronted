import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  const click = (e: any) => {
    if (!canClick) {
      e.preventDefault();
    }
  };
  return (
    <button
      onClick={click}
      className={`w-full max-w-xl text-lg font-medium focus:outline-none text-white py-3 transition-colors  ${
        canClick
          ? "bg-blue-300 hover:bg-blue-500"
          : "bg-gray-400  cursor-not-allowed"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
