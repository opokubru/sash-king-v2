import { Link } from 'react-router-dom';
// import { Accordion, AccordionItem } from '@nextui-org/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { socials } from '@/utils/data/social';

const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-primary-white relative h-full">
      <div className="container py-10 md:py-16 lg:grid grid-cols-[0.4fr,1fr,0.4fr] gap-x-5">
        <div className="space-y-3 flex flex-col items-center lg:items-start">
          <div className="flex items-center gap-1">
            {/* <img
              src="/icons/augwell_logo_white.png"
              alt="logo-white"
              className="w-[8.3rem]"
            /> */}
            {/* <LogoComponent /> */}
            <p className="font-bold text-inherit uppercase">Sash King</p>
          </div>
          <p className="text-sm">Custom Designed Sashes</p>
          <div className="flex items-center gap-x-3">
            {socials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                className="hover:opacity-80"
              >
                <Icon icon={item.icon} fontSize={30} />
              </a>
            ))}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2">
          {FOOTER_ITEMS.map((item, index) => (
            <div key={index}>
              <h1 className="text-primary-white mb-2 text-[17px] font-medium">
                {item.header}
              </h1>
              <div className="h-[0.2rem] w-[15%] mb-2 bg-gray-200/20 rounded-full" />
              <div className="flex gap-y-1 flex-col">
                {item.links.map((itx, idx) => (
                  <Link className="hover:opacity-80" key={idx} to={itx.href}>
                    {itx.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* mobile */}
        <div className="lg:hidden block mt-5">
          {/* <Accordion
            itemClasses={{
              base: 'py-0 w-full',
              title: 'font-normal text-medium text-primary-white',
              trigger:
                ' py-0 data-[hover=true]:bg-default-100  rounded-lg h-10 flex items-center',
              indicator: 'text-medium',
              content: 'text-small  text-white',
            }}
            isCompact
          >
            {FOOTER_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                aria-label="Accordion 1"
                title={item.header}
              >
                <div className="flex gap-y-1 flex-col">
                  {item.links.map((itx, idx) => (
                    <Link className="hover:opacity-80" key={idx} to={itx.href}>
                      {itx.title}
                    </Link>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion> */}
          <div className="flex gap-y-1 flex-col ml-2">
            <Link className="hover:opacity-80" to="/about">
              About Us
            </Link>
          </div>
          <div className="flex gap-y-1 flex-col ml-2">
            <Link className="hover:opacity-80" to="/terms-of-service">
              Terms of Service
            </Link>
          </div>
          <div className="flex gap-y-1 flex-col ml-2">
            <Link className="hover:opacity-80" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black/40" />
      <div className="py-3 text-center text-xs">
        Sash King © {new Date().getFullYear()}. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

const FOOTER_ITEMS = [
  {
    header: 'Help',
    links: [
      // {
      //   title: 'Privacy Policy',
      //   href: '/privacy-policy',
      // },
      // {
      //   title: 'Terms of Service',
      //   href: '/terms-of-service',
      // },
      {
        title: 'Contact Us',
        href: '/contact',
      },
    ],
  },
  {
    header: 'Link',
    links: [
      {
        title: 'About Us',
        href: '/about',
      },
    ],
  },
];
