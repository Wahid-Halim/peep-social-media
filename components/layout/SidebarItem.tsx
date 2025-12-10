import React from "react";
import { IconType } from "react-icons";
import { BsHouseFill } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div
        className="relative 
        rounded-full h-14 w-14  flex items-center justify-center p-4 hover:bg-slate-400 hover:bg-opacity-10
        cursor-pointer lg:hidden
        "
      >
        <Icon size={28} color="white" />
      </div>
    </div>
  );
};

export default SidebarItem;
