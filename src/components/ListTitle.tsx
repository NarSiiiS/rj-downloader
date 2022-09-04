import React from 'react';

interface IListTitleProps {
  title: string;
}

function ListTitle({ title }: IListTitleProps) {
  return (
    <div className="mt-4 py-3">
      <h2 className="text-2xl font-medium text-white">{title}</h2>
    </div>
  );
}

export default ListTitle;
