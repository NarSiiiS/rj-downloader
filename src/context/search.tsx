import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type SearchContextType = {
  term: string;
  setTerm: (term: string) => void;
  data: object;
  setData: (data: object) => void;
};

type Props = {
  children: ReactNode;
};

const SearchContextDefaultValues: SearchContextType = {
  term: '',
  setTerm: () => {},
  data: {},
  setData: () => {},
};

const SearchContext = createContext<SearchContextType>(
  SearchContextDefaultValues
);

export function SearchWrapper({ children }: Props) {
  const [termData, setTerm] = useState<string>('');
  const [searchData, setSearchData] = useState<object>({});

  const searchState = {
    term: termData,
    setTerm,
    data: searchData,
    setData: setSearchData,
  };

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  return useContext(SearchContext);
}
