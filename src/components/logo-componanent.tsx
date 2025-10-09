export const LogoComponent = () => {
  // Try the PNG version first as it might be more reliable
  const logo = '/icons/sash-king.png';
  return (
    <div className="transition-all">
      {/* <p className="font-bold text-sm uppercase text-yellow-500">Sash King</p> */}
      <img
        className="  overflow-hidden object-contain md:w-[40%] md:h-[40%] w-[30%] h-[30%] "
        // width={'40%'}
        // height={'40%'}
        src={logo}
        alt="Sash King Logo"
        onError={(e) => {
          // Fallback to the original jpeg if PNG fails
          if (e.currentTarget.src.includes('icons/sash-king.png')) {
            e.currentTarget.src = '/icons/sash-king.png';
          } else {
            // Final fallback to placeholder
            e.currentTarget.src =
              'https://placehold.co/200x100/FFD700/000000?text=SASH+KING';
          }
        }}
      />
    </div>
  );
};
