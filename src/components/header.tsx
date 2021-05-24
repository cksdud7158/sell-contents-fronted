import React from "react";
import menuBar from "../images/header/menuIcon.svg";

interface IHeaderProps {
  temp: string;
}

export const HeaderComponet: React.FC<IHeaderProps> = ({ temp }) => (
  <header className="w-full h-14 bg-blue-200">
    {/* <menuBar></menuBar> */}
  </header>
);
