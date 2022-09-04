import React from 'react';

const Search = () => {
  return (
    <input
      type="text"
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
      placeholder="Search everything ..."
    />
  );
};

export default Search;
