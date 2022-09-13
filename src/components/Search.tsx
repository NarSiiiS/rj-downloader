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
    <div className="relative w-full">
      <input
        type="text"
        value={term}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
        placeholder="Search everything ..."
        onChange={(event) => {
          setTerm(event.target.value);
        }}
      />
      {term.length > 0 && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setTerm('')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 hover:text-gray-900"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Search;
