import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center border-t border-slate-700 py-4">
      <p className="text-white">
        Made with <span className="text-red-500">❤</span> by{' '}
        <a
          className="cursor-pointer text-red-500"
          href="https://github.com/NarSiiiS"
          target="_blank"
          rel="noreferrer"
        >
          NarSiiiS
        </a>
      </p>
    </footer>
  );
};

export default Footer;
