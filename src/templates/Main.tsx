import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from './Main.module.css';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased">
    {props.meta}

    <Header />
    <div className={`${styles.height} p-4`}>{props.children}</div>
    <Footer />
  </div>
);

export { Main };
