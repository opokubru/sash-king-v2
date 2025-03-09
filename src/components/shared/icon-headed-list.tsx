import { Icon } from "@iconify/react/dist/iconify.js";

interface IconHeadedListProps {
  icon: string;
  title: string;
  description?: string;
}

const IconHeadedList = ({ icon, title, description }: IconHeadedListProps) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="flex items-center justify-center mb-4">
        <Icon
          icon={icon}
          fontSize={40}
          className="text-[#619B7D]"
          style={{ strokeWidth: 1 }}
        />
      </div>
      <p className="text-[#1A1A1A] font-medium text-lg mb-2">{title}</p>
      <p className="text-[#737373] text-sm">{description}</p>
    </div>
  );
};

export default IconHeadedList;
