const NotFound = () => {
	return (
		<div className="flex dark:bg-[#252525] justify-center items-center h-[70vh]">
			<div className="flex gap-2 h-[30px]">
				<div className="font-semibold text-[17px]">404</div>
				<div className="w-[2px] h-[30px] bg-[#D0CDCD]" />
				<div>This page could not be found.</div>
			</div>
		</div>
	);
};

export default NotFound;
