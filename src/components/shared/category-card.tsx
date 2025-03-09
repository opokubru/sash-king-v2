import { Icon } from "@iconify/react/dist/iconify.js";

interface CategoryCardProps {
  icon: string;
  title: string;
}

const CategoryCard = ({ icon, title }: CategoryCardProps) => {
  return (
    <div className="flex flex-col border-2 border-white rounded-3xl justify-center items-center w-full h-full px-5 py-2 gap-2 hover:scale-105 transition-all">
      <div className="flex items-center justify-center h-[4rem]">
        <Icon icon={icon} fontSize={50} className="text-[1A1A1A]" />
      </div>
      <p className="text-center w-full text-secondary-black text-xs font-normal">
        {title}
      </p>
    </div>
  );
};

export default CategoryCard;
