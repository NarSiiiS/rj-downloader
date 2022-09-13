import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchData from '@/components/SearchData';
import { useSearchContext } from '@/context/search';

import styles from './Main.module.css';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { data, term, setTerm, setData } = useSearchContext();
  const router = useRouter().asPath;
  useEffect(() => {
    setTerm('');
    setData({});
  }, [router]);

  return (
    <div className="w-full antialiased">
      {props.meta}

      <Header />
      {term.length ? (
        <SearchData className={`${styles.height} relative p-4`} data={data} />
      ) : (
        <div className={`${styles.height} p-4`}>{props.children}</div>
      )}
      <Footer />
    </div>
  );
};

export { Main };
