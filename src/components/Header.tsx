import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Search from '@/components/Search';

const Header = () => {
  const router = useRouter();
  const menuItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Podcasts',
      path: '/podcasts',
    },
    {
      name: 'Collection',
      path: '/collection',
    },
  ];

  return (
    <nav className="border-b border-slate-700 p-4 shadow">
      <div className="flex items-center justify-between">
        <div className="flex w-1/5">
          {menuItems.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              <a
                className={`px-3 font-medium text-gray-300 hover:text-red-400 ${
                  router.pathname === menu.path ? 'text-red-400' : ''
                }`}
              >
                {menu.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="w-2/5">
          <Search />
        </div>
        <div className="flex w-1/5 justify-end">
          <Link href="/">
            <img
              className="h-9"
              src="/assets/img/logo.svg"
              alt="RadioJavanDownloader"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
