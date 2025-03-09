import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="p-5 shadow-sm bg-white hover:text-white hover:bg-primary group transition-all duration-700 rounded-md flex flex-col gap-4">
      <Icon icon={icon} fontSize={30} />
      <div className="flex flex-col gap-2">
        <h3 className="text-sm md:text-lg">{title}</h3>
        <p className="text-xs md:text-sm w-4/5">{description}</p>
      </div>
      {/* <CustomButton className="w-1/3 rounded-md bg-primary text-white group-hover:bg-white group-hover:text-primary-text transition-all duration-300">
        click here
      </CustomButton> */}
    </div>
  );
};
