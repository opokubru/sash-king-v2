import { Button, ButtonProps, cn } from '@nextui-org/react';

interface ICustomButton extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  selector?: string;
  to?: string;
  variant?:
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
  variant,
}: ICustomButton) => {
  const buttonClass = cn(
    'bg-[#F9FFF6] rounded-lg capitalize text-[#316449]',
    className,
    variant === 'primary' && 'bg-primary text-white',
    variant === 'secondary' && 'border border-primary text-primary',
    variant === 'tertiary' && 'bg-tertiary text-white',
    variant === 'ghost' && 'bg-transparent text-primary',
    variant === 'link' && 'text-primary underline',
    variant === 'faded' && 'bg-faded text-primary',
    variant === 'flat' && 'bg-flat text-primary',
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
