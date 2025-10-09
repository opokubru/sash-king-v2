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
// import { Input } from '@nextui-org/react';

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { items } = useSelector((state: RootState) => state.cart);

  // const [showSearch, setShowSearch] = useState(false);
  // const [query, setQuery] = useState('');

  // const handleSearchSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (query.trim()) {
  //     navigate(`/search?q=${encodeURIComponent(query)}`);
  //     setShowSearch(false);
  //     setQuery('');
  //     setIsMenuOpen(false); // Close mobile menu if open
  //   }
  // };

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        {...{
          ariaLabel: 'Sash King Navbar',
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
                </NavLink>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden lg:flex">
          <NavbarItem className="gap-4 hidden lg:flex items-center">
            {/* <p>
              {!showSearch ? (
                <Icon
                  icon="uil:search"
                  className="text-2xl text-gray-600 cursor-pointer"
                  onClick={() => setShowSearch(true)}
                />
              ) : (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 w-full"
                >
                  <Input
                    autoFocus
                    radius="lg"
                    size="sm"
                    variant="underlined"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-[10rem]"
                    endContent={
                      <button type="submit">
                        <Icon
                          icon="uil:search"
                          className="text-xl text-gray-600"
                        />
                      </button>
                    }
                  />
                  <Icon
                    icon="mdi:close"
                    className="text-lg text-gray-600 cursor-pointer"
                    onClick={() => {
                      setShowSearch(false);
                      setQuery('');
                    }}
                  />
                </form>
              )}
            </p> */}
            <button onClick={() => navigate('/checkout')} className="relative">
              <Icon
                icon="uil:shopping-bag"
                className="text-2xl text-gray-600"
              />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                {items.length}
              </span>
            </button>

            <CustomButton
              onClick={() => navigate('/contact')}
              className="bg-primary text-white"
            >
              Contact Us
            </CustomButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          justify="end"
          className="flex lg:hidden items-center gap-3 px-2"
        >
          {/* {!showSearch ? (
            <Icon
              icon="uil:search"
              className="text-2xl text-gray-600 cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ) : (
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 w-full"
            >
              <Input
                autoFocus
                radius="lg"
                size="sm"
                variant="underlined"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-[10rem]"
                endContent={
                  <button type="submit">
                    <Icon icon="uil:search" className="text-xl text-gray-600" />
                  </button>
                }
              />
              <Icon
                icon="mdi:close"
                className="text-lg text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowSearch(false);
                  setQuery('');
                }}
              />
            </form>
          )} */}
          <button onClick={() => navigate('/checkout')} className="relative">
            <Icon icon="uil:shopping-bag" className="text-2xl text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
              {items.length}
            </span>
          </button>
        </NavbarContent>

        <NavbarMenu className="bg-white">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-sm text-[#1A1A1A] hover:border-b-2 border-primary ${
                    isActive
                      ? 'text-black border-b-3 border-primary'
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
              className="bg-primary text-white"
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
  // {
  //   link: 'categories',
  //   title: 'Categories',
  // },
  // {
  //   link: '/checkout',
  //   title: 'Checkout',
  // },
];
