/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ICustomProps {
	options: {
		header: string;
		desc: string[];
	}[];
}

const CustomFAQs = (props: ICustomProps) => {
	const [activeIndex, setActiveIndex] = useState<any>([]);

	const handleToggle = (option: string) => {
		setActiveIndex((prev: any) => {
			if (prev?.includes(option)) {
				return prev.filter((exisitingItem: any) => exisitingItem !== option);
			} else {
				return [...prev, option];
			}
		});
	};

	return (
		<div>
			<hr className="border-[0.5px] border-[rgba(146,146,146,0.5)]" />
			{props.options.map((a, index) => {
				const active = activeIndex.includes(a.header);

				return (
					<div
						key={index}
						className={`${
							active ? 'bg-secondary/20' : 'bg-transparent'
						} w-full `}>
						<div
							onClick={() => {
								handleToggle(a.header);
							}}
							className={`flex justify-between ${
								active
									? 'bg-secondary text-white'
									: 'bg-transparent hover:bg-gray-50/5 py-3'
							} py-2 md:px-5 px-1 hover:cursor-pointer w-full`}>
							<p className="text-[17px]">{a.header}</p>
							<button>
								<Icon
									icon={`${active ? 'ic:sharp-minus' : 'ic:baseline-plus'}`}
									fontSize={23}
									className="duration-300 transition-all "
								/>
							</button>
						</div>
						<AnimatePresence>
							{active && (
								<motion.div className="py-3 text-[15px]  md:px-5 px-1 font-light overflow-hidden">
									{a.desc.map((b, index) => (
										<motion.div
											initial={{ height: 0 }}
											animate={{ height: 'auto' }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											key={index}
											className="transition-transform duration-300">
											{b}
										</motion.div>
									))}
								</motion.div>
							)}
						</AnimatePresence>
						<hr className="border-[0.5px] border-[rgba(146,146,146,0.5)]" />
					</div>
				);
			})}
		</div>
	);
};

export default CustomFAQs;
