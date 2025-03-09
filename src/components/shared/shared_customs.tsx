import { Button, ButtonProps, cn } from '@nextui-org/react';

interface ICustomButton extends ButtonProps {
	children: React.ReactNode;
	className?: string;
	selector?: string;
	to?: string;
}
export const CustomButton = ({
	children,
	className,
	...rest
}: ICustomButton) => {
	return (
		<Button
			className={cn(
				'bg-[#F9FFF6] rounded-full capitalize text-[#316449]',
				className,
			)}
			{...rest}>
			{children}
		</Button>
	);
};
