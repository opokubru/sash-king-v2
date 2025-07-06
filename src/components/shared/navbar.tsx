import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CustomButton } from './shared_customs';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { LogoComponent } from '../logo-componanent';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { items } = useSelector((state: RootState) => state.cart);

  //   <header className="flex justify-between items-center mb-16">
  //   <div className="text-2xl font-bold">TrendZone</div>
  //   <nav className="hidden md:flex items-center gap-8">
  //     <a href="#" className="text-gray-600 hover:text-black">
  //       Home
  //     </a>
  //     <a href="#" className="text-gray-600 hover:text-black">
  //       New Arrival
  //     </a>
  //     <a href="#" className="text-gray-600 hover:text-black">
  //       Shop
  //     </a>
  //     <a href="#" className="text-gray-600 hover:text-black">
  //       Contact
  //     </a>
  //     <a href="#" className="text-gray-600 hover:text-black">
  //       About Us
  //     </a>
  //   </nav>
  //   <div className="flex items-center gap-4">
  //     <Icon icon="uil:search" className="text-2xl text-gray-600" />
  //     <Icon icon="uil:shopping-bag" className="text-2xl text-gray-600" />
  //     <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium">
  //       Sign In
  //     </button>
  //   </div>
  // </header>

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        {...{
          ariaLabel: 'Sneakz Navbar',
        }}
        maxWidth="2xl"
        className="bg-white w-full"
      >
        <NavbarContent className="lg:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>

        <NavbarContent className="lg:hidden pr-3" justify="center">
          <NavbarBrand as={Link} to="/" className="flex gap-x-3">
            {/* <img
              src="/icons/augwell_logo.png"
              className="w-[6.3rem]"
              alt="logo"
            /> */}
            <LogoComponent />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden lg:flex gap-4  justify-between w-full "
          justify="center"
        >
          <NavbarBrand as={Link} to="/" className="flex gap-x-3 ">
            <LogoComponent />
          </NavbarBrand>
          <div className="flex w-[87%] gap-x-5 justify-center items-center">
            {menuItems.map((item, index) => (
              <NavbarItem key={`${item}-${index}`}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `w-full text-sm text-gray-600 ${
                      isActive
                        ? 'text-black '
                        : 'text-gray-600 hover:text-black'
                    }`
                  }
                >
                  {item.title}
                  {/* {item.title === 'Checkout' && (
                    <span className="bg-yellow-300 rounded-full p-2 py-1 text-xs">
                      {items.length}
                    </span>
                  )} */}
                </NavLink>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden lg:flex">
          <NavbarItem className="gap-4 hidden lg:flex items-center">
            <Icon icon="uil:search" className="text-2xl text-gray-600" />

            <button onClick={() => navigate('/checkout')} className="relative">
              <Icon
                icon="uil:shopping-bag"
                className="text-2xl text-gray-600"
              />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                {items.length}
              </span>
            </button>

            <CustomButton
              onClick={() => navigate('/contact')}
              className="bg-yellow-400 text-white"
            >
              Contact Us
            </CustomButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-white">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-sm text-[#1A1A1A] hover:border-b-2 border-yellow-400 ${
                    isActive
                      ? 'text-black border-b-3 border-yellow-400'
                      : 'text-[#1A1A1A]'
                  }`
                }
                to={item.link}
              >
                {item.title}
                <span>{item.title === 'Checkout' && items?.length}</span>
              </NavLink>
            </NavbarMenuItem>
          ))}
          <div className="flex md:gap-x-4 flex-col gap-4">
            <CustomButton
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="bg-yellow-400 text-white"
            >
              Contact Us
            </CustomButton>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
}

const menuItems = [
  {
    link: '/about',
    title: 'About Us',
  },
  {
    link: 'categories',
    title: 'Categories',
  },
  // {
  //   link: '/checkout',
  //   title: 'Checkout',
  // },
];
