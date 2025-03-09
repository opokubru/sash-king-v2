type HeaderTextProps = {
  title: string;
};

export const HeaderText = ({ title }: HeaderTextProps) => {
  return (
    <h1 className="font-medium text-2xl md:text-4xl text-primary-text capitalize">
      {title}
    </h1>
  );
};
