import Image from 'next/image';
import React from 'react';

import type Item from '@/Types/Item';
import { hexToRgb } from '@/utils/colors';
import { rgbDataURL } from '@/utils/rgbToDataUrl';

type ICardProps = {
  item: Item;
};

const Card = ({ item }: ICardProps) => {
  const color = hexToRgb(
    (item.bg_colors && item.bg_colors[0]) ||
      (item.item && item.item.bg_colors[0]) ||
      '#0f172a'
  );
  const dataUrl = rgbDataURL(color.r, color.g, color.b);
  return (
    <div className="relative scale-95 overflow-hidden  text-white transition-transform hover:scale-100">
      <Image
        alt={item.song || item.title || item.name}
        layout="intrinsic"
        width={300}
        blurDataURL={dataUrl}
        placeholder="blur"
        height={300}
        className="rounded-md opacity-80 transition-opacity hover:opacity-100"
        src={item.photo}
      />
      <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-gray-400">
        {item.artist}
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {item.song || item.title || item.name}
      </div>
      <div
        className="absolute top-1 right-1 rounded bg-white p-1 uppercase text-black"
        style={{ fontSize: '9px' }}
      >
        {item.type}
      </div>
    </div>
  );
};

export default Card;
