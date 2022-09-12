import { Center, Loader } from '@mantine/core';
import React from 'react';

import List from '@/components/List';
import ListTitle from '@/components/ListTitle';
import type Item from '@/Types/Item';

type ISearchDataProps = {
  data: object;
  className: string;
};

const SearchData = ({ data, className = '' }: ISearchDataProps) => {
  const hasLength = Object.keys(data).length;

  if (!hasLength) {
    return (
      <div className={className}>
        <Center className="absolute top-0 left-0 h-full w-full">
          <Loader color="red" size="lg" />
        </Center>
      </div>
    );
  }

  const getSection = (key: string, items: Item[]) => {
    return (
      <div key={key}>
        <ListTitle key={`${key}_title`} title={key.toUpperCase()} />
        <List key={`${key}_list`} items={items} />
      </div>
    );
  };

  return (
    <div className={className}>
      {Object.entries(data)
        .filter(([_, val]) => val.length > 0)
        .map(([key, val]) => getSection(key, val))}
    </div>
  );
};

export default SearchData;
