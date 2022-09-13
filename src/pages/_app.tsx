import '../styles/global.css';

import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';

import { RouterTransition } from '@/components/RouterTransition';
import { SearchWrapper } from '@/context/search';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={{
        colorScheme: 'dark',
      }}
    >
      <RouterTransition />
      <SearchWrapper>
        <Component {...pageProps} />
      </SearchWrapper>
    </MantineProvider>
  );
};

export default MyApp;
