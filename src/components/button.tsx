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
}) => (
  <button
    className={`w-full max-w-xl text-lg font-medium focus:outline-none text-white py-3 transition-colors  ${
      canClick
        ? "bg-blue-300 hover:bg-blue-500"
        : "bg-gray-400 pointer-events-none "
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
