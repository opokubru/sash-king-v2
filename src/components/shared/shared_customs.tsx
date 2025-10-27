import { Button, ButtonProps, cn } from '@nextui-org/react';

interface ICustomButton extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  selector?: string;
  to?: string;
  variant_type?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'ghost'
    | 'link'
    | 'faded'
    | 'flat'
    | 'shadow'
    | 'outline'
    | 'dashed'
    | 'none';
}
export const CustomButton = ({
  children,
  className,
  onPress,
  onPressStart,
  onPressEnd,
  isDisabled,
  isLoading,
  variant_type,
}: ICustomButton) => {
  const buttonClass = cn(
    'bg-[#F9FFF6] rounded-lg capitalize text-[#316449]',
    className,
    variant_type === 'primary' && 'bg-primary text-white',
    variant_type === 'secondary' && 'border border-primary text-primary',
    variant_type === 'tertiary' && 'bg-tertiary text-white',
    variant_type === 'ghost' && 'bg-transparent text-primary',
    variant_type === 'link' && 'text-primary underline',
    variant_type === 'faded' && 'bg-faded text-primary',
    variant_type === 'flat' && 'bg-flat text-primary',
  );
  return (
    <Button
      className={cn(
        `bg-[#F9FFF6] rounded-lg capitalize text-[#316449] ${buttonClass}`,
        className,
      )}
      onPress={onPress}
      onPressStart={onPressStart}
      onPressEnd={onPressEnd}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};
