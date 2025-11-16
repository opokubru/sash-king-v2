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
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { CustomButton } from './shared_customs';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { LogoComponent } from '../logo-componanent';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { Input } from '@nextui-org/react';

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

        <NavbarMenu className="bg-white py-8">
          {menuItems.map((item, index) => {
            const isActive =
              matchPath(
                { path: item.link, end: item.link === '/' },
                location.pathname,
              ) !== null;

            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full flex items-center gap-4 py-5 ${
                    isActive ? 'text-[#D4AF37]' : 'ext-gray-600'
                  }`}
                  to={item.link}
                >
                  <div className="relative">
                    <Icon
                      icon={item.icon}
                      className={`text-2xl ${
                        isActive ? 'text-[#D4AF37]' : 'text-gray-600'
                      }`}
                      style={{ strokeWidth: 1.5 }}
                    />
                    {item.title === 'Checkout' && (
                      <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xl font-normal ${
                      isActive ? 'text-[#D4AF37]' : 'ext-gray-600'
                    }`}
                  >
                    {item.title}
                  </span>
                </NavLink>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      </Navbar>
    </>
  );
}

const menuItems = [
  {
    link: '/',
    title: 'Home',
    icon: 'mdi:home-outline',
  },
  {
    link: '/about',
    title: 'About Us',
    icon: 'mdi:information-outline',
  },
  {
    link: '/templated-sash',
    title: 'Design With Templates',
    icon: 'mdi:shopping-outline',
  },

  {
    link: '/design-your-own',
    title: 'Design From Scratch',
    icon: 'mdi:palette-outline',
  },
  {
    link: '/faq',
    title: 'FAQ',
    icon: 'mdi:frequently-asked-questions',
  },
  {
    link: '/contact',
    title: 'Contact Us',
    icon: 'mdi:phone-outline',
  },
];

// const mobileMenuItems = [
//   {
//     link: '/',
//     title: 'Home',
//     icon: 'mdi:home-outline',
//   },
//   {
//     link: '/templated-sash',
//     title: 'Loom Store',
//     icon: 'mdi:shopping-outline',
//   },
//   {
//     link: '/checkout',
//     title: 'Checkout',
//     icon: 'mdi:cart-outline',
//   },
//   {
//     link: '/design-your-own',
//     title: 'Customize',
//     icon: 'mdi:palette-outline',
//   },
//   {
//     link: '/about',
//     title: 'About',
//     icon: 'mdi:information-outline',
//   },
//   {
//     link: '/contact',
//     title: 'Contact Us',
//     icon: 'mdi:phone-outline',
//   },
//   {
//     link: '/contact',
//     title: 'Become a Partner',
//     icon: 'mdi:wallet-outline',
//   },
// ];
