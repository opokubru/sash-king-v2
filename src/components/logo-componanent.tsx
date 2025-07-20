export const LogoComponent = () => {
  const logo = './icons/logo_1_no_bg.png';
  return (
    <div className="transition-all">
      {/* <p className="font-bold text-sm uppercase text-yellow-500">Sneakz</p> */}
      <img className="md:w-[100%] w-[50%]" src={logo} />
    </div>
  );
};
