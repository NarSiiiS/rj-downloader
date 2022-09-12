import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { useSearchContext } from '@/context/search';
import type Item from '@/Types/Item';
import { fetcher } from '@/utils/fetcher';

const Search = () => {
  const { term, setTerm, setData } = useSearchContext();
  const [debounced] = useDebouncedValue(term, 300);

  useEffect(() => {
    const searchWithTerm = async () => {
      const response = await fetcher(`/search?query=${debounced}`);
      const data = {
        mp3: response.mp3s,
        albums: response.albums,
        podcasts: response.podcasts,
        playlists: response.playlists.map(
          (playlist: { playlist: Item[] }) => playlist.playlist
        ),
        videos: response.videos,
        lyrics: response.lyrics,
      };
      setData(data);
    };

    if (debounced.length) {
      searchWithTerm().catch((e) => console.log(e));
    } else {
      setData({});
    }
  }, [debounced]);

  return (
    <input
      type="text"
      value={term}
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
      placeholder="Search everything ..."
      onChange={(event) => {
        setTerm(event.target.value);
      }}
    />
  );
};

export default Search;
