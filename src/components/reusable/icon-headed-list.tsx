import { Icon } from "@iconify/react/dist/iconify.js";

interface IconHeadedListProps {
  icon: string;
  title: string;
  description?: string;
}

export const IconHeadedList = ({
  icon,
  title,
  description
}: IconHeadedListProps) => {
  return (
    <div className="flex flex-col items-center  p-4">
      <div className="flex items-center justify-center mb-4">
        <Icon
          icon={icon}
          fontSize={40}
          className="text-primary w-10 h-10"
          style={{ strokeWidth: 1 }}
        />
      </div>
      <p className="text-[#1A1A1A] font-medium text-lg mb-2 lg:w-3/4 leading-5 text-center">
        {title}
      </p>
      <p className="text-[#737373] text-sm text-pretty text-center">
        {description}
      </p>
    </div>
  );
};
