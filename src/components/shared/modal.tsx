import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { FC } from 'react';

interface CustomModalProps {
	onClose?: () => void;
	isOpen: boolean;
	onOpenChange: () => void;
	header?: React.ReactNode;
	body: React.ReactNode;
	footer?: React.ReactNode;
	size?:
		| 'sm'
		| 'lg'
		| 'md'
		| 'xs'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| 'full';
	radius?: 'sm' | 'lg' | 'md' | 'none';
	scrollBehavior?: 'outside' | 'inside' | 'normal';
	placement?:
		| 'auto'
		| 'center'
		| 'top'
		| 'top-center'
		| 'bottom'
		| 'bottom-center';
	isDismissable?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({
	isOpen,
	onOpenChange,
	header,
	body,
	footer,
	size,
	scrollBehavior,
	placement = 'center',
	radius = 'md',
	isDismissable = true,
	onClose,
}) => {
	return (
		<>
			<Modal
				size={size ? size : 'lg'}
				backdrop="opaque"
				isOpen={isOpen}
				isDismissable={isDismissable}
				onOpenChange={onOpenChange}
				scrollBehavior={scrollBehavior}
				onClose={onClose}
				placement={placement}
				radius={radius}
				classNames={{
					body: 'p-0',
					base: 'border-[#252525]',
					header: 'py-1.5',
					closeButton: 'active:bg-white/10 text-[18px]',
				}}
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							transition: {
								duration: 0.3,
								ease: 'easeOut',
							},
						},
						exit: {
							y: -20,
							opacity: 0,
							transition: {
								duration: 0.2,
								ease: 'easeIn',
							},
						},
					},
				}}>
				<ModalContent>
					<>
						{header && (
							<ModalHeader className="flex flex-col gap-1">
								{header}
							</ModalHeader>
						)}
						<ModalBody>{body}</ModalBody>
						{footer && <ModalFooter>{footer}</ModalFooter>}
					</>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CustomModal;
