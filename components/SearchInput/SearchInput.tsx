import * as React from 'react';

export interface ISearchInputProps {
  searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput(props: ISearchInputProps) {
  return (
    <div>
      <input
        type="search"
        placeholder="Start typing..."
        className='border-2 p-4 rounded-lg bg-gray-100 text-lg w-full mt-10'
        onChange={props.searchChange}
      />
    </div>
  );
}
