import { Burger, Drawer, NavLink } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Search from '@/components/Search';

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();
  const menuItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Podcasts',
      path: '/podcasts/popular',
      active: '/podcasts/[activeTab]',
    },
    {
      name: 'Collection',
      path: '/collection',
    },
    {
      name: 'Github',
      path: 'https://github.com/NarSiiiS/rjdownloader',
    },
  ];
  const { width } = useViewportSize();

  const desktopNav = menuItems.map((menu) => (
    <Link prefetch={false} key={menu.name} href={menu.path}>
      <a
        className={`px-3 font-medium text-gray-300 hover:text-red-400 ${
          router.pathname === (menu.active || menu.path) ? 'text-red-400' : ''
        }`}
      >
        {menu.name}
      </a>
    </Link>
  ));

  const mobileNav = menuItems.map((menu) => (
    <Link prefetch={false} key={menu.name} href={menu.path} passHref>
      <NavLink
        color="red"
        component="a"
        label={menu.name}
        active={router.pathname === (menu.active || menu.path)}
      />
    </Link>
  ));

  return (
    <nav
      className="fixed z-40 w-full border-b border-slate-700 bg-slate-800 py-4 pl-4 shadow"
      style={{ paddingRight: 'calc(1rem + var(--removed-scroll-width, 0px))' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex w-1/5">
          {width > 1200 ? (
            desktopNav
          ) : (
            <Burger
              opened={menuOpened}
              onClick={() => setMenuOpened((o) => !o)}
            />
          )}
        </div>
        <div className="w-3/5 md:w-2/5">
          <Search />
        </div>
        <div className="flex w-1/5 justify-end">
          <Link prefetch={false} href="/">
            <img
              className="h-9"
              src="/assets/img/logo.svg"
              alt="RadioJavanDownloader"
            />
          </Link>
        </div>
      </div>
      <Drawer
        opened={menuOpened}
        onClose={() => setMenuOpened(false)}
        padding="md"
        size="md"
        classNames={{ drawer: 'bg-slate-800' }}
      >
        {mobileNav}
      </Drawer>
    </nav>
  );
};

export default Header;
