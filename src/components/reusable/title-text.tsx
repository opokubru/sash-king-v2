type TitleTextProps = {
  title: string;
};

export const TitleText = ({ title }: TitleTextProps) => {
  return (
    <h1 className="font-medium text-lg md:text-2xl text-primary-text capitalize">
      {title}
    </h1>
  );
};
