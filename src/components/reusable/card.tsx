type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`rounded-md shadow-sm ${className}`}>{children}</div>;
};
